import Post from "../../models/Posts.js";
import checkAuth from "../../util/check-auth.js";
import pkg from "apollo-server";
const { UserInputError, AuthenticationError } = pkg;
export default {
  Mutation: {
    async createComment(_, { postId, body }, context) {
      const user = checkAuth(context);
      if (body.trim() === "") {
        throw new UserInputError("Empty comment", {
          errors: { body: "Comment must have a body" },
        });
      }
      const post = await Post.findById(postId);
      if (post) {
        post.comments.unshift({
          body,
          username: user.username,
          createdAt: new Date().toISOString(),
        });
        await post.save();
        return post;
      } else throw new UserInputError("Post not found");
    },
    async deleteComment(_, { postId, commentId }, context) {
      const { username } = checkAuth(context);
      try {
        const post = await Post.findById(postId);
        if (post) {
          const commentIndex = post.comments.findIndex(
            (c) => c.id === commentId
          );
          if (post.comments[commentIndex].username === username) {
            post.comments.splice(commentIndex, 1);
            await post.save();
            return post;
          } else {
            throw new AuthenticationError("Action not allowed");
          }
        } else throw new UserInputError("post doesnt exist");
      } catch (error) {
        console.log(error);
      }
    },
  },
};

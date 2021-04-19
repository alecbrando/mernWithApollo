import Post from "../../models/Posts.js";

export default {
  Query: {
    getPosts: async () => {
      try {
        const posts = await Post.find();
        return posts;
      } catch (error) {
        console.error(error);
      }
    },
  },
};

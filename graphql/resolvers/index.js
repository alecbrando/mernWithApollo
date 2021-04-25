import postsResolvers from "./posts.js";
import usersResolvers from "./users.js";
import commentResolvers from "./comment.js";
export default {
  Query: {
    ...postsResolvers.Query,
  },
  Mutation: {
    ...usersResolvers.Mutation,
    ...postsResolvers.Mutation,
    ...commentResolvers.Mutation,
  },
};

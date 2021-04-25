import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pkg from "apollo-server";
const { UserInputError } = pkg;

import User from "../../models/User.js";
import config from "../../config.js";
const { SECRET_KEY } = config;
import {
  validateRegisterInput,
  validateLoginInput,
} from "../../util/validators.js";

const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      email: user.email,
      username: user.username,
    },
    SECRET_KEY,
    { expiresIn: "1h" }
  );
};

export default {
  Mutation: {
    async login(_, { username, password }) {
      const { errors, valid } = validateLoginInput(username, password);
      const user = await User.findOne({ username });
      if (!valid) {
        throw new UserInputError("Error in login in user", {
          errors: {
            ...errors,
          },
        });
      }
      if (!user) {
        errors.general = "User not found";
        throw new UserInputError("User not found", { errors });
      }
      const match = await bcrypt.compare(password, user.password);
      if (!match) {
        errors.general = "Wrong credentials";
        throw new UserInputError("Wrong credentials", { errors });
      }
      const token = generateToken(user);
      return { ...user._doc, id: user._id, token };
    },
    async register(
      parent,
      { registerInput: { username, email, password, confirmPassword } }
    ) {
      //TODO: Validate user data
      const validInfo = validateRegisterInput(
        username,
        email,
        password,
        confirmPassword
      );
      if (!validInfo.valid) {
        throw new UserInputError("Error in creating user", {
          errors: {
            ...validInfo.errors,
          },
        });
      }
      //Make sure uer doesn't already exist
      const user = await User.findOne({ username });
      const emailInUse = await User.findOne({ email });
      if (user) {
        throw new UserInputError("Username is already taken", {
          errors: {
            username: "This username is taken",
          },
        });
      } else if (emailInUse) {
        throw new UserInputError("Email is already taken", {
          errors: {
            email: "This email is taken",
          },
        });
      }
      //hash password and create an auth token
      password = await bcrypt.hash(password, 12);
      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });
      const res = await newUser.save();
      const token = generateToken(res);
      return { ...res._doc, id: res._id, token };
    },
  },
};

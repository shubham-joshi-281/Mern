import userModel from "../models/userModels.js";
import { hashPassword, comparePassword } from "../utils/authHelper.js";
import JWT from "jsonwebtoken";
class userController {
  // REGISTER USER
  static userRegister = async (req, res) => {
    try {
      const { name, email, password } = req.body;
      // All Fiels Required Validation
      if (!name) {
        res.status(401).json({
          success: false,
          message: "User Name Is Required",
        });
      }
      if (!email) {
        res.status(401).json({
          success: false,
          message: "User Email Is Required",
        });
      }
      if (!password) {
        res.status(401).json({
          success: false,
          message: "Password Is Mandatory And Should Greater Than 8 Chracters",
        });
      }

      // existing user Validtion
      const existingUser = await userModel.findOne({ email });
      if (existingUser) {
        res.status(200).json({
          success: false,
          message: "User Already Existing",
        });
      }
      // password hashing
      const hashedPassword = await hashPassword(password);
      // Create New User
      const user = await new userModel({
        name,
        email,
        password: hashedPassword,
      }).save();
      res.status(201).send({
        success: true,
        message: "User Created Successfully...",
        user,
      });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        success: false,
        message: "Something Went Wrong In Creating User !!!",
        error,
      });
    }
  };
  // ##############################################

  // Login User
  static userLogin = async (req, res, next) => {
    try {
      const { email, password } = req.body;
      if ((!email, !password)) {
        res.status(401).json({
          success: false,
          message: "please enter email or password",
        });
      }
      const user = await userModel.findOne({ email });
      if (!user) {
        res.status(401).json({
          success: false,
          message: "invalid email or password",
        });
      }

      const match = await comparePassword(password, user.password);
      if (!match) {
        res.status(200).json({
          success: false,
          message: "invalid email or password",
        });
      }

      const token = await JWT.sign({ _id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "5d",
      });
      res.status(200).send({
        success: true,
        message: "User Login Successfully...",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          password: user.password,
        },
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(401).json({
        success: false,
        message: "Something Went Wrong In Login User !!!",
        error,
      });
    }
  };
  // ##############################################
}

export default userController;

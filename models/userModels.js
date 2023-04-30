import mongooes from "mongoose";
const userSchema = new mongooes.Schema(
  {
    name: {
      type: String,
      required: [true, "User Name Is Require"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "User Email Is Require"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "User Password Is Require"],
    },
  },
  { timestamps: true }
);

const userModel = mongooes.model("User", userSchema);

export default userModel;

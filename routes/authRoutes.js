import express from "express";
import userController from "../controller/authController.js";

const router = express.Router();

// Register
router.get("/get", (req, res) => {
  res.status(200).send("all ok");
});
router.post("/register", userController.userRegister);
// Login
router.post("/login", userController.userLogin);
// // Logout
// router.post("/logout", logoutUser);

export default router;

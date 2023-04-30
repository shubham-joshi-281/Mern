import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_DB_URL);
    console.log(`DataBase Connected Successfully....`);
  } catch (error) {
    console.log(error);
  }
};
export default connectDB;

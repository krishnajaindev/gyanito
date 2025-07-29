import mongoose from "mongoose";
import chalk from "chalk";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      retryWrites: true,
      w: "majority",
      maxPoolSize: 10,
    });

    console.log(chalk.greenBright("✅ MongoDB connected successfully"));
  } catch (error) {
    console.log(chalk.redBright("❌ MongoDB connection error: "), error);
    process.exit(1);
  }
};

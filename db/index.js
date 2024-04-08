import mongoose from "mongoose";
import "dotenv/config";
console.log(process.env.API_KEY + "" )
mongoose.connect(process.env.API_KEY);
export default mongoose;

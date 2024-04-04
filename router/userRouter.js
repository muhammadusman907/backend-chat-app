import  express  from 'express';
import { getSingleUser, getUsers } from '../controller/usersController.js';
import { verifyTokan } from '../services/service.js';
const userRouter = express.Router() ;

userRouter.get("/users:id" ,verifyTokan, getUsers)
userRouter.get("/single_user:id" , getSingleUser)
export {userRouter}
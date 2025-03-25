import { Router } from "express";
import { submitEnquiryForm, keepAlive } from "../controllers/user.controllers.js";
const userRouter = Router()

userRouter.route('/heartbeat/:SEQ_NUM').get(keepAlive)
userRouter.route('/submit-form').post(submitEnquiryForm)


export default userRouter
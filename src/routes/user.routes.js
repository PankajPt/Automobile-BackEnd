import { Router } from "express";


const userRouter = Router()

userRouter.route('/heartbeat/:seqNum').get()
userRouter.route('/submit-form').post(submitForm)


export default userRouter
import dotenv from "dotenv"
dotenv.config()

import app from "./app.js"

app.listen(process.env.PORT || 5000, ()=>{
    console.log(`✅ Server is running on URI: http://${process.env.BACKEND_BASE_URI}:${process.env.PORT || 5000}/api/v1`)
})
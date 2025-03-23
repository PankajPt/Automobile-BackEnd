import dotenv from "dotenv"
import app from "./app"
dotenv.config()

app.listen(process.env.PORT || 5000, ()=>{
    console.log(`✅ Server is running on URI: ${process.env.BACKEND_BASE_URI}:${process.env.PORT || 5000}/api/v1`)
})
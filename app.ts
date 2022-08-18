import express from "express"
import router from "./Routes/mainRouter"
import logger from "./Logger/logger"
import dotenv from "dotenv"
import mongoose from "mongoose"
dotenv.config()
const app = express()

app.use(express.json())
app.use("/", router)
mongoose
	.connect(process.env.MONGO_URI!)
	.then(() => {
		app.listen(3000, () => logger.info(`Listening on ${"3000"}...`))
	})
	.catch((err) =>
		logger.error(typeof err.message === "string" ? err.message : err)
	)

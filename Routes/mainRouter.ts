import express, { NextFunction, Request, Response } from "express"
import { itemController } from "../Controllers/itemController"

const router = express.Router()

router.route("/getAll").get(itemController.getAll)

export default router

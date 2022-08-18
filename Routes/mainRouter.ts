import express, { NextFunction, Request, Response } from "express"
import { itemController } from "../Controllers/itemController"

const router = express.Router()

router.route("/getAll").get(itemController.getAll)
router.route("/addItem").post(itemController.addItem)
router.route("/deleteItem").delete(itemController.deleteItem)
router.route("/getItem").get(itemController.getItem)
router.route("/updateItem").patch(itemController.updateItem)
export default router

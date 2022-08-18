import { NextFunction, Request, Response } from "express"
import logger from "../Logger/logger"
import Item from "../Models/itemModel"

export module itemController {
	// made it module just to show how it works
	export const getItem = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const { itemId } = req.query
		try {
			if (!itemId) return res.status(400).send("Please provide Id of Item!")
			let foundItem = await Item.findById({ _id: itemId })
			return res.send(foundItem)
		} catch (err) {
			logger.error(err)
			return res.status(400).send("Database error")
		}
	}
	export const getAll = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		try {
			let items = await Item.find()
			return res.send(items)
		} catch (err) {
			logger.error(err)
			return res.status(400).send("DATABASE ERROR")
		}
	}
	export const addItem = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const { name, quantity } = req.body
		// quantity is optional, default value is set to 0
		try {
			if (!name) return res.status(400).send("Provide all needed data!")
			let addedItem = await Item.create({ name: name, quantity: quantity })
			return res.send({
				message: "Succesfully added an item!",
				item: addedItem,
			})
		} catch (err) {
			logger.error(err)
			return res.status(400).send("Database error")
		}
	}
	export const deleteItem = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const { itemId } = req.body
		if (!itemId) return res.status(400).send("What do you want to delete?")
		try {
			await Item.findByIdAndDelete({ _id: itemId })
			return res.send("Succesfully deleted an Item")
		} catch (err) {
			logger.error(err)
			return res.status(400).send("Database error")
		}
	}
	// this one looks messy, im gonna try to improve it a bit...
	export const updateItem = async (
		req: Request,
		res: Response,
		next: NextFunction
	) => {
		const { name, quantity, itemId } = req.body
		if (!itemId) return res.status(400).send("Provide Item's Id!")
		if (!name && !quantity)
			return res.status(400).send("Provide at least 1 prop!")
		try {
			let foundItem = await Item.findById({ _id: itemId })
			type newItem = {
				name?: string
				quantity?: number
			}
			let newItem: newItem = {}
			if (!name) {
				if (!parseInt(quantity, 10))
					return res.status(400).send("Quantity must be a number!")

				newItem.quantity = quantity
			} else if (!quantity) {
				newItem.name = name
			} else if (quantity && name) {
				newItem = { name: name, quantity: quantity }
			}
			await Item.updateOne({ _id: itemId }, newItem)
			return res.send("Succesfully updated item!")
		} catch (err) {
			logger.error(err)
			return res.status(400).send("database error")
		}
	}
}

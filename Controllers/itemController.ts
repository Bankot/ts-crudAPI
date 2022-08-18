import { NextFunction, Request, Response } from "express"
export module itemController {
	export const getItem = (req: Request, res: Response, next: NextFunction) => {}
	export const getAll = (req: Request, res: Response, next: NextFunction) => {
		console.log("hello get all!")
	}
	export const addItem = (req: Request, res: Response, next: NextFunction) => {}
	export const deleteItem = (
		req: Request,
		res: Response,
		next: NextFunction
	) => {}
	export const updateItem = (
		req: Request,
		res: Response,
		next: NextFunction
	) => {}
}

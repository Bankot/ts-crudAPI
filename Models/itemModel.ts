import { Schema, model } from "mongoose"

interface itemSchema {
	name: string
	quantity: number
}
const itemSchema = new Schema<itemSchema>({
	name: { type: String, required: [true, "This item needs a name!"] },
	quantity: { type: Number, default: 0 },
})
const Item = model<itemSchema>("Item", itemSchema)
export default Item

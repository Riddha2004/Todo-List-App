import { Schema, model, models } from "mongoose"

const ManagerSchema = new Schema({
   task: {type:String},
},{timestamps:true})

export const Manager = models?.Manager || model('Manager', ManagerSchema);
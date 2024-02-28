import mongoose from "mongoose"

const Schema = mongoose.Schema
const EmployeeSchema = new Schema({
    title:{type: String, required:true},
    name:{type: String, required:true},
    author:{type: String, required:true}

},{
    timestamps:true,
    collection: 'employee'
}

)

export default mongoose.model('employee', EmployeeSchema)
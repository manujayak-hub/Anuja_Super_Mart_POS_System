import mongoose from "mongoose";

const Schema = mongoose.Schema;
const EmployeeSchema = new Schema({
    empID: { type: String, required: true, unique: true },
    empName: { type: String, required: true },
    empRole: { type: String, required: true },
    empAddress: { type: String },
    empContactNum: { type: String },
    empJoinedDate: { type: String },
    empBasicSalary: { type: Number },
    empRemainingLeaves: { type: Number },
    empFinalSalary: { type: Number }
}, {
    timestamps: true,
    collection: 'employee'
});

export default mongoose.model('employee', EmployeeSchema);
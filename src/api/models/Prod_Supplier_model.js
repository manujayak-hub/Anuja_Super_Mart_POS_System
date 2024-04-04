import mongoose from "mongoose";

const Schema = mongoose.Schema
const ProdsupSchema = new Schema(
  {
    SupId: { type: String, required: true, unique: true }, 
    supname: { type: String, required: true },
    Contactno: { type: String, required: true },
    email: { type: String, required: true },
    contsappname: { type: String, required: true },
    supstatus: { type: String},
    note: { type: String },
  },
  {
    timestamps: true,
    collection: "prodsupplier"
  }
)

export default mongoose.model("prodsupplier", ProdsupSchema);
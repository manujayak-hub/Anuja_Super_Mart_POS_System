import mongoose from "mongoose";

const Schema = mongoose.Schema
const feedbackSchema = new Schema(
  {
    username : {
        type : String, 
        unique :true,
        trim: true,
    },
    email : {
        type : String ,
        required: true,
    },
    comment : {
        type : String,
        required: true,
    },
    reaction : {
        type : String ,
        required: true,
    },
    view : {
        type : String ,
    },
    category : {
        type : String ,
    },
    priority : {
        type : String ,
    },
  },
  {
    timestamps: true,
    collection: "feedback"
  }
)


export default mongoose.model("Feedback", feedbackSchema);
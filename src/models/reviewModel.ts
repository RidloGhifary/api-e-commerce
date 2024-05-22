import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
      trim: true,
      maxlength: [150, "Title cannot exceeds 200 characters"],
    },
    rating: {
      type: Number,
      required: [true, "Please give a rating"],
      min: 1,
      max: 5,
    },
    comment: {
      type: String,
      required: [true, "Please describe your experience"],
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
    product: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "Product",
    },
  },
  { timestamps: true }
);

const ReviewModel = mongoose.model("ReviewModel", reviewSchema);

export default ReviewModel;

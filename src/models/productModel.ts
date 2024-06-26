import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      trim: true,
      required: [true, "Please give a name for this product"],
      maxlength: [100, "Name cannot be over than 100 characters"],
    },
    price: {
      type: Number,
      required: [true, "Please give a price for this product"],
    },
    description: {
      type: String,
      trim: true,
      required: [true, "Please give a description for this product"],
      maxlength: [1000, "Description cannot be over than 1000 characters"],
    },
    image: {
      type: String,
      default: "/assets/default-product-img.jpeg",
    },
    category: {
      type: String,
      trim: true,
      required: [true, "Please provide a category"],
      enum: ["office", "kitchen", "bedroom"],
    },
    company: {
      type: String,
      trim: true,
      required: [true, "Please provide a company"],
      enum: {
        values: ["ikea", "liddy", "marcos"],
        message: "{VALUE} is not supported",
      },
    },
    colors: {
      type: [String],
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    freeShipping: {
      type: Boolean,
      default: false,
    },
    inventory: {
      type: Number,
      required: true,
    },
    averageRating: {
      type: Number,
      default: 0,
    },
    numOfReviews: {
      type: Number,
      default: 0,
    },
    user: {
      type: mongoose.Types.ObjectId,
      required: true,
      ref: "User",
    },
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
    id: false,
  }
);

productSchema.virtual("reviews", {
  ref: "ReviewModel",
  localField: "_id",
  foreignField: "product",
  justOne: false,
});

// productSchema.pre("remove", async function () {
//   await this.model("ReviewModel").deleteMany({ product: this._id });
// });

const ProductModel = mongoose.model("ProductModel", productSchema);
export default ProductModel;

import mongoose from "mongoose";

//new word used to create new object deom class/constructor
const productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      required: true,
    },

    price: {
      type: Number,
      required: true,
      min: 0,
    },

    stock: {
      type: Number,
      required: true,
      min: 0,
      default: 0,
    },

    category: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      required: true,
    },

    images: [
      {
        type: String,
      },
    ],

    rating: {
      type: Number,
      default: 0,
    },

    reviewsCount: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

//productSchema is only blueprint , and Product is actual model

const Product = mongoose.model(
  "Product",
  productSchema
);
//after model creation  below opration can be done
// Car.create()
// Car.find()
// Car.findById()
// Car.updateOne()
// Car.deleteOne()

// ex-create->> await Product.create({
    //             title: "iPhone 16",
    //             price: 80000
    //         });

export default Product;
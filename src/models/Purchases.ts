import mongoose, { Schema, Document, ObjectId } from "mongoose";
import User from "./User";
import Products from "./Products";

export interface IPurchases {
  _id: ObjectId | string | undefined;
  user: Schema.Types.ObjectId;
  product: Schema.Types.ObjectId;
  createdAt?: string;
  updatedAt?: string;
}

export interface IPurchasesSchema extends Document {
  _doc: { [x: string]: any; password: any };
  _id: ObjectId | string | undefined;
  user: Schema.Types.ObjectId;
  product: Schema.Types.ObjectId;
  createdAt?: string;
  updatedAt?: string;
}

const IPurchasesSchema: Schema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: User,
    },
    product: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: Products,
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

const Purchases =
  mongoose.models.Purchases || mongoose.model("Purchases", IPurchasesSchema);

export default Purchases;

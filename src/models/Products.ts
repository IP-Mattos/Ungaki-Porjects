import mongoose, { Schema, Document, ObjectId } from 'mongoose'

export interface IProducts {
  _id: ObjectId | string | undefined
  name: string
  category: string
  description: string // Corregido aquí
  price: number
  createdAt?: string
  updatedAt?: string
}

export interface IProductsSchema extends Document {
  _doc: { [x: string]: any; password: any }
  _id: ObjectId | string | undefined
  name: string
  category: string
  description: string // Corregido aquí
  price: number
  createdAt?: string
  updatedAt?: string
}

const ProductsSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true
    },
    category: {
      type: String,
      required: true
    },
    description: {
      type: String
    },
    price: {
      type: Number,
      required: true
    }
  },
  {
    versionKey: false,
    timestamps: true
  }
)

const Products = mongoose.models.Products || mongoose.model('Products', ProductsSchema)

export default Products

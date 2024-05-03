import mongoose from 'mongoose'

const MONGO_URL = 'mongodb+srv://demon:demon@cluster0.uwon7ln.mongodb.net/'

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URL)
    console.log('Conectado')
  } catch (error) {
    console.log(error)
  }
}

import mongoose from 'mongoose'

const MONGO_URL = 'mongodb+srv://guillermonicrosi:zach12345@cluster0.1aiue4q.mongodb.net/ungaki'

export const connectMongoDB = async () => {
  try {
    await mongoose.connect(MONGO_URL)

    console.log('Conectado')
  } catch (error) {
    console.log(error)
  }
}

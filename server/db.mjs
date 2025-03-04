import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
  email: { type: String, unique: true, required: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  userId: { type: String, unique: true, required: true, trim: true }
}, { timestamps: true });

const todoSchema = new Schema({
  userId : { type : mongoose.Types.ObjectId ,required : true , ref: 'User',index: true},
  title: { type: String, required: true, trim: true },
  done: { type: Boolean, default: false }
}, { timestamps: true })

export const userModel = mongoose.model('User', userSchema);
export const todoModel = mongoose.model('todo', todoSchema);

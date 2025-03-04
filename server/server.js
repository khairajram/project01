import express from 'express';
import mongoose from 'mongoose';
import cors from "cors";


import jwt from 'jsonwebtoken';
import { z } from 'zod';
import bcrypt from 'bcrypt';

import { userModel,todoModel } from './db.mjs';
import { auth,JWT_SECRET } from './auth.mjs';

const mongoUri = "mongodb+srv://khairaj:Shree%405335@cluster0.mhduv.mongodb.net/doto";

const app = express();

mongoose.connect(mongoUri)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

app.use(cors());
app.use(express.json());

app.post("/signup", async (req, res) => {
    const requestSchema = z.object({
      email: z.string().email().min(3).max(100),  
      password: z.string().min(8).max(100),
      userId: z.string().min(1).max(100)
    });

    const parsedData = requestSchema.safeParse(req.body);

    if(!parsedData.success){
      return res.status(400).json({ message: "Invalid credentials" ,errors: parsedData.error.errors });
    }

    const { email, password, userId } = parsedData.data;

    
  try {

    const existingUser = await userModel.findOne({ email: email });
    if (existingUser) {
        return res.status(400).json({ message: "Email already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({ 
       email : email,
       password : hashedPassword,
       userId : userId
    });

    res.status(201).json({ message: "You have signed up successfully."  });
  } catch (error) {
    console.error("Error in signup:", error.message);
    res.status(500).json({ message: "Error signing up. Please try again."  });
  }
});

app.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({
      email : email
    })

    if (!user) {
      return res.status(404).json({ message: "User does not exist in our db" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);

    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid password" });
    }

    if(isPasswordCorrect){
      const token = jwt.sign({ 
        id: user._id.toString() 
      }, JWT_SECRET, { 
        expiresIn: "1h" 
      });

      const todos = await todoModel.find({
        userId : user._id
      })

      res.setHeader("Authorization", `Bearer ${token}`);
      res.status(200).json({ 
        message: "Sign in successful",
        token : token,
        todos
        });
    
    }
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/todos",auth,async (req,res) => {
  const userId = req.userId;

  try{
      const todos = await todoModel.find({
        userId
      });

      res.status(200).json({
        todos
      });
  }catch(e){
    res.status(500).json({ error: "Something went wrong" });
  }
})

app.post("/addTodo",auth,async (req,res) =>{
  const { title } = req.body;

  if (!title) return res.status(400).json({ message: "Title is required" });

    try {
      const add = await todoModel.create({
        userId: req.userId,
        title,
        done: false
      });

      const todos = await todoModel.find({
        userId : req.userId
      });
  
      console.log("Todo added:", add);
      res.json({
        todos,
        message : "todo added"
      })
    } catch (error) {
      
      console.error("Error adding todo:", error);
      res.status(501).json({
        message : "Error adding todo"
      })
    }
})

app.put("/todoUpdate", auth, async function(req, res) {
  const { id } = req.body; 

  if (!id) {
    return res.status(400).json({ message: "Todo ID is required" });
  }

  try {
    const updatedTodo = await todoModel.findByIdAndUpdate(
      id,
      { $set: { done: true } },
      { new: true }
    );

    const todos = await todoModel.find({
      userId : req.userId
    });
    
    if (!updatedTodo) {
      return res.status(404).json({ 
        todos,
        message: "Todo not found" 
      });
    }
    
    res.json({ 
      todos,
      message: "Todo updated successfully", todo: updatedTodo
    });
  } catch (error) {
    console.error("Error updating todo:", error);
    res.status(500).json({ message: "Unable to update todo" });
  }
});

app.delete("/todoDelete/:id", auth, async function(req, res) {
  const { id } = req.params;
  if (!id) return res.status(400).json({ message: "Todo ID is required" });

  try {
    await todoModel.findByIdAndDelete(id);
    const todos = await todoModel.find({
      userId : req.userId
    });
    res.json({ 
      todos,
      message: "Todo deleted successfully" 
    });
  } catch (error) {
      res.status(500).json({ 
        message: "Error deleting todo",
        error
     });
  }
});

app.listen(3000, () => console.log("app is running"));
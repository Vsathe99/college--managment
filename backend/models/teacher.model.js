import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



const teacherSchema = new mongoose.Schema({
  name: { type: String, required: true },
  password: { type: String, required: true, select: false},
  email: { type: String, required: true, unique: true },
  subject: { type: String, required: true },
  department: { type: String, required: true },
  assignments: [
    {
      title: { type: String, required: true },
      description: { type: String },
      dueDate: { type: Date },
    }
  ]
}, { timestamps: true });

teacherSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

teacherSchema.methods.isValidPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

teacherSchema.methods.generateJWT = function(){
    return jwt.sign({email: this.email}, process.env.JWT_SECRET_KEY,{expiresIn: '24h'});
}

const teacherModel = mongoose.model('Teacher', teacherSchema);
export default teacherModel;

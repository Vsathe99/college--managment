import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const studentSchema = new mongoose.Schema({
  prnno: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  department: { type: String, required: true },
  year: { type: String, required: true },
  Mainattendance:{type: Number, default: 0},
  subAttendance: [
    {
      subjectName: { type: String, required: true },
      attendance: { type: Number, default: 0 }
    }
  ],
  subjects: [
    {
      subjectName: { type: String, required: true },
      
      assignments: [
        {
          title: { type: String, required: true },
          description: { type: String },
          dueDate: { type: Date },
          isCompleted: { type: Boolean, default: false },
          completedDate: { type: Date }
        }
      ]
    }
  ],
  feeStatus: { 
    type: String, 
    enum: ['Paid', 'Pending'], 
    default: 'Pending' 
}
}, { timestamps: true });


studentSchema.statics.hashPassword = async function(password){
    return await bcrypt.hash(password, 10);
}

studentSchema.methods.isValidPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

studentSchema.methods.generateJWT = function(){
    return jwt.sign({prnno: this.prnno}, process.env.JWT_SECRET_KEY,{expiresIn: '24h'});
}

const studentModel = mongoose.model('Student', studentSchema);
export default studentModel;



import { validationResult } from 'express-validator';
import studentModel from '../models/student.model.js';




export const studentRegister = async (req, res) => {
    try {
        const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const { prnno, password, name, department, year } = req.body;

    const isStudentExist = await studentModel.findOne({prnno});
    if(isStudentExist){
        throw new Error("User already exists");
    }
    const hashedPassword = await studentModel.hashPassword(password);

    const defaultSubjects = [
        {
          subjectName: 'Maths',
        },
        {
          subjectName: 'Physics',
        },
        {
          subjectName: 'Chemistry',
        }
      ];

      // ✅ Add Default Attendance
      const defaultAttendance = [
        { subjectName: 'Maths', attendance: 0 },
        { subjectName: 'Physics', attendance: 0 },
        { subjectName: 'Chemistry', attendance: 0 }
      ];

      // ✅ Create the student in database
      const student = new studentModel({
        prnno,
        password: hashedPassword,
        name,
        department,
        year,
        Mainattendance: 0, // Default Main Attendance
        subAttendance: defaultAttendance,
        subjects: defaultSubjects
      });
      student.save();
    res.status(201).json({student});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message});
        
    }
}

export const studentLogin = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const {prnno, password} = req.body;
        const student = await studentModel.findOne({prnno}).select('+password');

        if(!student){
            throw new Error("User not found");
        }

        const isValid = await student.isValidPassword(password);

        if(!isValid){
            throw new Error("Invalid password");
        }

        const token = student.generateJWT();
        delete student._doc.password;
        res.status(200).json({student, token});
    } catch (error) {
        res.status(400).json({error: error.message});
    }
}

export const allStudents = async (req, res) => {
    try {
        const students = await studentModel.find();
        res.status(200).json({students});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

export const mainAttendance = async (req, res) => {
    try {
        console.log(req.user);
        const student = await studentModel.findOne({prnno:req.user.prnno});

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        return res.status(200).json({
            mainAttendance: student.Mainattendance
        });

    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
}

export const subStudents = async (req, res) => {
    
    try {
        const { subjectName } = req.body;

        if (!subjectName) {
            return res.status(400).json({ message: 'Subject name is required' });
        }

        const students = await studentModel.find({ 
            'subjects.subjectName': subjectName 
        });

        res.status(200).json(students);
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error: error.message });
    }

}
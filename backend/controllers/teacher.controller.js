import { validationResult } from 'express-validator';
import teacherModel from '../models/teacher.model.js';
import studentModel from '../models/student.model.js';

export const teacherRegister = async (req, res) => {
    try {
        const errors = validationResult(req);
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()});
    }
    const { email, password, name, department, subject } = req.body;

    const isTeacherExist = await teacherModel.findOne({email});
    if(isTeacherExist){
        throw new Error("User already exists");
    }
    const hashedPassword = await teacherModel.hashPassword(password);

    const teacher = await teacherModel.create({     
        email,
        password: hashedPassword,
        name,
        department,
        subject,

    });
    teacher.save();

    res.status(201).json({teacher});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message});
        
    }
}

export const teacherLogin = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    try {
        const {email, password} = req.body;
        const teacher = await teacherModel.findOne({email}).select('+password');

        if(!teacher){
            throw new Error("User not found");
        }

        const isValid = await teacher.isValidPassword(password);

        if(!isValid){
            throw new Error("Invalid password");
        }

        const token = teacher.generateJWT();
        delete teacher._doc.password;
        res.status(200).json({teacher, token});
    } catch (error) {
        console.log(error);
        return res.status(500).json({message: error.message});
    }
}

export const addAttendance = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { subjectName,attendance,prnno } = req.body;

    try {
        // ✅ Find the student by PRN number
        const student = await studentModel.findOne({ prnno });

        if (!student) {
        return res.status(404).json({ message: 'Student not found' });
        }

        // ✅ Find the subject in subAttendance
        let subjectFound = false;
        student.subAttendance.forEach((subject) => {
        if (subject.subjectName === subjectName) {
            subject.attendance = attendance;
            subjectFound = true;
        }
        });

        if (!subjectFound) {
        return res.status(404).json({ message: 'Subject not found' });
        }

        // ✅ Recalculate Main Attendance
        const totalSubjects = student.subAttendance.length;
        const totalAttendance = student.subAttendance.reduce((sum, subject) => sum + subject.attendance, 0);
        const newMainAttendance = totalAttendance / totalSubjects;

        student.Mainattendance = Math.round(newMainAttendance);

        // ✅ Save the updated student data
        await student.save();

        res.status(200).json({
        message: 'Attendance updated successfully',
        student
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
}

export const addAssignment = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }

    const { subjectName,title,dueDate,subject } = req.body;

    console.log(subject)
  try {
    
    // Find all students having this subject
    const students = await studentModel.find({
        "subjects": {
            $elemMatch: {
                subjectName: { $regex: new RegExp(subjectName, 'i') }
            }
        }
    });
    

    if (students.length === 0) {
      return res.status(404).json({ message: 'No students found for this subject' });
    }

    for (const student of students) {
        // ✅ Find the subject index
        const subjectIndex = student.subjects.findIndex(sub => sub.subjectName === subject);
        console.log(subjectIndex)
        if (subjectIndex === -1) {
            return res.status(404).json({ message: 'Subject not found' });
        }
        // ✅ Push assignment to that subject
        student.subjects[subjectIndex].assignments.push({
            title,
            dueDate,
            isCompleted: false
        });

        // ✅ Save the student
        await student.save();
    }

    

    res.status(200).json({ message: 'Assignment added to all students successfully' });
  } catch (error) {
    res.status(500).json({error: error.message});
  }
}

export const updateAssignment = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    const { prnno, subjectName, assignmentId, isCompleted } = req.body;

  try {
    // Find the student by ID
    const student = await studentModel.findOne({prnno: prnno});

    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Find the subject in student's data
    const subject = student.subjects.find(sub => sub.subjectName === subjectName);
    console.log(subject)
    if (!subject) {
      return res.status(404).json({ message: 'Subject not found' });
    }

    // Find the assignment inside the subject
    const assignment = subject.assignments.find(asg => asg._id.toString() === assignmentId);
    console.log(assignment)

    if (!assignment) {
      return res.status(404).json({ message: 'Assignment not found' });
    }

    // Update the assignment status
    assignment.isCompleted = isCompleted;
    assignment.completedDate = isCompleted ? new Date() : null;

    // Save the updated student record
    await student.save();

    res.status(200).json({ message: 'Assignment status updated successfully', assignment });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}
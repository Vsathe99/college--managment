import jwt from 'jsonwebtoken';
import Student from '../models/student.model.js';

export const studentAuth = async (req, res, next) => {
    try {
        // ✅ Extract the token from the header (Bearer Token)
        const token = req.header('Authorization');

        if (!token) {
            return res.status(401).json({ message: 'No token, authorization denied' });
        }

        // ✅ Split the token from "Bearer <token>"
        const extractedToken = token.split(" ")[1];
        if (!extractedToken) {
            return res.status(401).json({ message: 'Token not valid' });
        }

        // ✅ Verify the JWT Token
        const decoded = jwt.verify(extractedToken, process.env.JWT_SECRET_KEY);

        // ✅ Find the student based on PRN Number
        const student = await Student.findOne({ prnno: decoded.prnno });

        if (!student) {
            return res.status(404).json({ message: 'Student not found' });
        }

        // ✅ Attach the student data to req.user (as a plain object)
        req.user = {
            id: student._id,
            prnno: student.prnno,
            name: student.name,
            department: student.department,
            year: student.year,
            mainAttendance: student.Mainattendance
        };

        // ✅ Call the next middleware
        next();
    } catch (error) {
        console.error(error);
        return res.status(401).json({ message: 'Token is not valid' });
    }
};



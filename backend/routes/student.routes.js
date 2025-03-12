import {Router} from 'express';
import * as studentController from '../controllers/student.controller.js';
import { body } from 'express-validator';
import * as auth from '../middleware/auth.js';


const router = Router();

router.post('/register', 
    body('prnno').isString().withMessage("Email is invalid"),
    body('password').isLength({min: 6}).withMessage("Password must be at least 6 characters long"),
    body('name').isString().withMessage("Name is invalid"),
    body('department').isString().withMessage("Department is invalid"),
    body('year').isString().withMessage("Year is invalid"),
    studentController.studentRegister
);

router.post('/login',
    body('prnno').isString().withMessage("Email is invalid"),
    body('password').isLength({min: 6}).withMessage("Password must be at least 6 characters long"),
    studentController.studentLogin
);

router.get('/allstudents', studentController.allStudents);

router.get('/mainattendance',auth.studentAuth, studentController.mainAttendance);

router.post('/subStudents',
    body('subjecName').isString().withMessage("Subject Name is invalid"),
    studentController.subStudents);


export default router;
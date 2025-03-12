import {Router} from 'express';
import { body } from 'express-validator';
import * as teacherController from '../controllers/teacher.controller.js';
import * as auth from '../middleware/auth.js';

const router = Router();

router.post('/register',
    body('email').isEmail().withMessage("Email is invalid"),
    body('password').isLength({min: 6}).withMessage("Password must be at least 6 characters long"),
    body('name').isString().withMessage("Name is invalid"),
    body('department').isString().withMessage("Department is invalid"),
    body('subject').isString().withMessage("Subject is invalid"),
    teacherController.teacherRegister
);

router.post('/login',
    body('email').isString().withMessage("Email is invalid"),
    body('password').isLength({min: 6}).withMessage("Password must be at least 6 characters long"),
    teacherController.teacherLogin
);

router.put('/attendance',
    body('prnno').isString().withMessage("PRN No is invalid"),
    body('attendance').isNumeric().withMessage("Attendance must be a number"),
    body('subjectName').isString().withMessage("Subject is invalid"),
    teacherController.addAttendance
)

router.put('/addassignment',
    body('subject').isString().withMessage("Subject is invalid"),
    body('title').isString().withMessage("Assignment is invalid"),
    body('dueDate').isISO8601().withMessage("Due date is invalid"),
    teacherController.addAssignment
)

router.put('/updateassignment',
    body('prnno').isString().withMessage("PRN No is invalid"),
    body('subjectName').isString().withMessage("Subject is invalid"),
    body('assignmentId').isString().withMessage("Assignment is invalid"),
    body('isCompleted').isBoolean().withMessage("isCompleted is invalid"),
    teacherController.updateAssignment
)






export default router;
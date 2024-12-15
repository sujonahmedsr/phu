import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { FacultyControllers } from './facultyController';
import { updateFacultyValidationSchema } from './facultyValidation';
import Auth from '../../middleware/authMid';
import { USER_ROLE } from '../users/userConstant';
// import { USER_ROLE } from '../users/userConstant';

const FacultyRoutes = express.Router();

FacultyRoutes.get('/:id', FacultyControllers.getSingleFaculty);

FacultyRoutes.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

FacultyRoutes.delete('/:id', FacultyControllers.deleteFaculty);

FacultyRoutes.get('/', 
  Auth(USER_ROLE.admin, USER_ROLE.faculty),
    FacultyControllers.getAllFaculties);

export default FacultyRoutes;
import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { FacultyControllers } from './facultyController';
import { updateFacultyValidationSchema } from './facultyValidation';

const FacultyRoutes = express.Router();

FacultyRoutes.get('/:id', FacultyControllers.getSingleFaculty);

FacultyRoutes.patch(
  '/:id',
  validateRequest(updateFacultyValidationSchema),
  FacultyControllers.updateFaculty,
);

FacultyRoutes.delete('/:id', FacultyControllers.deleteFaculty);

FacultyRoutes.get('/', FacultyControllers.getAllFaculties);

export default FacultyRoutes;
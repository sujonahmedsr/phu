import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { createSemesterRegistrationValidationSchema, updateSemesterRegistrationValidationSchema } from './semesterRegValidation';
import { SemesterRegistrationController } from './semesterRegController';

const semesterRegistrationRoutes = express.Router();

semesterRegistrationRoutes.post(
  '/create-semester-registration',
  validateRequest(
    createSemesterRegistrationValidationSchema
  ),
  SemesterRegistrationController.createSemesterRegistration,
);

semesterRegistrationRoutes.get(
  '/:id',
  SemesterRegistrationController.getSingleSemesterRegistration,
);

semesterRegistrationRoutes.patch(
  '/:id',
  validateRequest(
    updateSemesterRegistrationValidationSchema
  ),
  SemesterRegistrationController.updateSemesterRegistration,
);

semesterRegistrationRoutes.get(
  '/:id',
  SemesterRegistrationController.getSingleSemesterRegistration,
);

semesterRegistrationRoutes.delete(
  '/:id',
  SemesterRegistrationController.deleteSemesterRegistration,
);

semesterRegistrationRoutes.get('/', SemesterRegistrationController.getAllSemesterRegistrations);

export default semesterRegistrationRoutes;
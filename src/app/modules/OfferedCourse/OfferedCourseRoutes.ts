import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { OfferedCourseControllers } from './OfferedCourseController';
import { OfferedCourseValidations } from './OfferedCourseValidatoin';

const offeredCourseRoutes = express.Router();

offeredCourseRoutes.get('/', OfferedCourseControllers.getAllOfferedCourses);

offeredCourseRoutes.get('/:id', OfferedCourseControllers.getSingleOfferedCourses);

offeredCourseRoutes.post(
  '/create-offered-course',
  validateRequest(OfferedCourseValidations.createOfferedCourseValidationSchema),
  OfferedCourseControllers.createOfferedCourse,
);

offeredCourseRoutes.patch(
  '/:id',
  validateRequest(OfferedCourseValidations.updateOfferedCourseValidationSchema),
  OfferedCourseControllers.updateOfferedCourse,
);

offeredCourseRoutes.delete(
  '/:id',
  OfferedCourseControllers.deleteOfferedCourseFromDB,
);

export default offeredCourseRoutes;
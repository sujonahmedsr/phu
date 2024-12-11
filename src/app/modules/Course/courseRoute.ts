import express from 'express';
import { CourseControllers } from './courseController';
import { CourseValidations } from './courseValidaton';
import validateRequest from '../../middleware/validateRequest';

const CourseRoutes = express.Router();

CourseRoutes.post(
  '/create-course',
  validateRequest(CourseValidations.createCourseValidationSchema),
  CourseControllers.createCourse,
);

CourseRoutes.get('/:id', CourseControllers.getSingleCourse);

CourseRoutes.patch(
  '/:id',
  validateRequest(CourseValidations.updateCourseValidationSchema),
  CourseControllers.updateCourse,
);

CourseRoutes.delete('/:id', CourseControllers.deleteCourse);

CourseRoutes.put(
  '/:courseId/assign-faculties',
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.assignFacultiesWithCourse,
);

CourseRoutes.delete(
  '/:courseId/remove-faculties',
  validateRequest(CourseValidations.facultiesWithCourseValidationSchema),
  CourseControllers.removeFacultiesFromCourse,
);

CourseRoutes.get('/', CourseControllers.getAllCourses);

export default CourseRoutes;
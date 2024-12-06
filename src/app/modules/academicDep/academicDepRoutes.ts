import  { Router } from 'express';
import validateRequest from '../../middleware/validateRequest';
import { AcademicDepartmentValidation } from './academicDepValidation';
import { AcademicDepartmentControllers } from './academicDepController';

const AcademicDepartmentRoutes = Router();

AcademicDepartmentRoutes.post(
  '/create-academic-department',
  // validateRequest(
  //   AcademicDepartmentValidation.createAcademicDepartmentValidationSchema,
  // ),
  AcademicDepartmentControllers.createAcademicDepartmemt,
);

AcademicDepartmentRoutes.get(
  '/:departmentId',
  AcademicDepartmentControllers.getSingleAcademicDepartment,
);

AcademicDepartmentRoutes.patch(
  '/:departmentId',
  validateRequest(
    AcademicDepartmentValidation.updateAcademicDepartmentValidationSchema,
  ),
  AcademicDepartmentControllers.updateAcademicDeartment,
);

AcademicDepartmentRoutes.get('/', AcademicDepartmentControllers.getAllAcademicDepartments);

export default AcademicDepartmentRoutes;
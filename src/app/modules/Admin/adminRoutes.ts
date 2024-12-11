import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { updateAdminValidationSchema } from './adminValidation';
import { AdminControllers } from './adminController';

const AdminRoutes = express.Router();

AdminRoutes.get('/', AdminControllers.getAllAdmins);

AdminRoutes.get('/:id', AdminControllers.getSingleAdmin);

AdminRoutes.patch(
  '/:id',
  validateRequest(updateAdminValidationSchema),
  AdminControllers.updateAdmin,
);

AdminRoutes.delete('/:adminId', AdminControllers.deleteAdmin);

export default AdminRoutes;
import { Router } from "express";
import { studentControllers } from "./studentController";

const studenRoutes = Router()

studenRoutes.get('/', studentControllers.getAllStudents)
studenRoutes.get('/:studentId', studentControllers.getSingleStudents)


export default studenRoutes
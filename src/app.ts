import express, { Application, Request, Response } from 'express'
import cors from 'cors'
import userRouter from './app/modules/users/userRoutes'
import globalErrorHandler from './app/utils/globalErrorHandling'
import notFound from './app/utils/notFount'
import studenRoutes from './app/modules/students/studentRoutes'
import academicSemesterRoute from './app/modules/academicSemester/academicSemesterRoute'
import academicFacultyRoute from './app/modules/academicFaculty/academicFacultyRoutes'
import AcademicDepartmentRoutes from './app/modules/academicDep/academicDepRoutes'
import FacultyRoutes from './app/modules/Faculty/facultyRoutes'
import AdminRoutes from './app/modules/Admin/adminRoutes'
import CourseRoutes from './app/modules/Course/courseRoute'
import semesterRegistrationRoutes from './app/modules/semesterRegistration/semesterRegRoutes'
import offeredCourseRoutes from './app/modules/OfferedCourse/OfferedCourseRoutes'
import authRoutes from './app/modules/auth/authRoute'
import cookieParser from 'cookie-parser'
import { EnrolledCourseRoutes } from './app/modules/EnrolledCourse/enrolledCourse.route'
const app: Application = express()

// middlewares 
app.use(express.json())
app.use(cookieParser())
app.use(cors())

// create route 
app.use('/api/users', userRouter)
app.use('/api/students', studenRoutes)
app.use('/api/academicSemester', academicSemesterRoute)
app.use('/api/academicFaculty', academicFacultyRoute)
app.use('/api/academicDepartment', AcademicDepartmentRoutes)
app.use('/api/faculties', FacultyRoutes)
app.use('/api/admins', AdminRoutes)
app.use('/api/course', CourseRoutes)
app.use('/api/semesters', semesterRegistrationRoutes)
app.use('/api/offeredCourse', offeredCourseRoutes)
app.use('/api/auth', authRoutes)
app.use('/api/enrolled-courses', EnrolledCourseRoutes)


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})


// global error handler 
app.use(globalErrorHandler);

// Catch-all for unmatched routes
app.use(notFound);


export default app
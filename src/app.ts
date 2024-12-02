import express, { Application, Request, Response, NextFunction } from 'express'
import cors from 'cors'
import userRouter from './app/modules/users/userRoutes'
import globalErrorHandler from './app/utils/globalErrorHandling'
import notFound from './app/utils/notFount'
import studenRoutes from './app/modules/students/studentRoutes'
import academicSemesterRoute from './app/modules/academicSemester/academicSemesterRoute'
const app: Application = express()

// middlewares 
app.use(express.json())
app.use(cors())

// create route 
app.use('/api/users', userRouter)
app.use('/api/students', studenRoutes)
app.use('/api/academicSemester', academicSemesterRoute)


app.get('/', (req: Request, res: Response) => {
  res.send('Hello World!')
})


// global error handler 
app.use(globalErrorHandler);

// Catch-all for unmatched routes
app.use(notFound);




export default app
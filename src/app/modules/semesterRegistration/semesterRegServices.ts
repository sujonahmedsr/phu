import AppError from "../../utils/AppError";
import httpStatus from 'http-status-codes';
import { academicSemesterModel } from "../academicSemester/academicSemesterSchemaModel";
import { TSemesterRegistration } from "./semesterRegInterface"
import { SemesterRegistration } from "./semesterTegScehmaModel";
import QueryBuilder from "../../builder/QueryBuilder";
import { RegistrationStatus } from "./semesterRegConst";

const createSemesterRegistrationIntoDB = async (payload: TSemesterRegistration) => {

    const academicSemester = payload?.academicSemester;

    // check if upcoming or ongoin 
    const isThereAnyOngoinOrUpcomingSemester = await SemesterRegistration.findOne({
        $or: [
            // { status: 'UPCOMING' }, { status: 'ONGOING' }
            { status: RegistrationStatus.UPCOMING }, { status: RegistrationStatus.ONGOING }
        ]
    })


    if (isThereAnyOngoinOrUpcomingSemester) {
        throw new AppError(httpStatus.BAD_REQUEST, `This is already ${isThereAnyOngoinOrUpcomingSemester.status} register semester`)
    }

    //check if the semester exist 
    const isAcademicSemesterExits = await academicSemesterModel.findById(academicSemester)
    if (!isAcademicSemesterExits) {
        throw new AppError(httpStatus.NOT_FOUND, 'This academic Semester not found')
    }
    //check if the semester already registered 
    const isSemesterRegistrationExits = await SemesterRegistration.findOne({ academicSemester })
    if (isSemesterRegistrationExits) {
        throw new AppError(httpStatus.CONFLICT, 'This Semester is already registered !')
    }

    const result = await SemesterRegistration.create(payload)

    return result
}
const getAllSemesterRegistrationsFromDB = async (query: Record<string, unknown>) => {
    const semesterRegistrationQuery = new QueryBuilder(SemesterRegistration.find().populate('academicSemester'),
        query)
        .filter()
        .sort()
        .fields()
        .paginate()
    const result = await semesterRegistrationQuery.modelQuery
    return result
}
const getSingleSemesterRegistrationsFromDB = async (id: string) => {
    const result = await SemesterRegistration.findById(id);
    return result;
}
const updateSemesterRegistrationIntoDB = async (id: string,
    payload: Partial<TSemesterRegistration>,) => {

    const isSemesterRegistrationExits = await SemesterRegistration.findById(id)
    if (!isSemesterRegistrationExits) {
        throw new AppError(httpStatus.NOT_FOUND, 'This semester is not found !');
    }

    const requesteSemesteStatus = isSemesterRegistrationExits?.status
    const requestedStatus = payload?.status;

    if(requesteSemesteStatus === RegistrationStatus.ENDED){
        throw new AppError(httpStatus.BAD_REQUEST, `This semester is already ${requesteSemesteStatus}`);
    }

    if (
        requesteSemesteStatus === RegistrationStatus.UPCOMING &&
        requestedStatus === RegistrationStatus.ENDED
      ) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `You can not directly change status from ${requesteSemesteStatus} to ${requestedStatus}`,
        );
      }

      if (
        requesteSemesteStatus === RegistrationStatus.ONGOING &&
        requestedStatus === RegistrationStatus.UPCOMING
      ) {
        throw new AppError(
          httpStatus.BAD_REQUEST,
          `You can not directly change status from ${requesteSemesteStatus} to ${requestedStatus}`,
        );
      }

    

    const result = await SemesterRegistration.findByIdAndUpdate(id, payload, {new: true, runValidators: true})
    return result
}
const deleteSemesterRegistrationFromDB = async (id: string) => {

}
export const SemesterRegistrationService = {
    createSemesterRegistrationIntoDB,
    getAllSemesterRegistrationsFromDB,
    getSingleSemesterRegistrationsFromDB,
    updateSemesterRegistrationIntoDB,
    deleteSemesterRegistrationFromDB,
}
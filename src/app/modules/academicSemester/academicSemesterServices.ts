import AppError from "../../utils/AppError";
import { academicSemesterCodeName } from "./academicSemesterCnst";
import httpStatus from 'http-status-codes';
import { TAcademicSemester } from "./academicSemesterInterface";
import { academicSemesterModel } from "./academicSemesterSchemaModel";

const academicSemesterCreateIntoDb = async (payload: TAcademicSemester) => {

  // check semester code is valid or not 
  if (academicSemesterCodeName[payload.name] !== payload.code) {
    throw new Error('Invalid Semester Code')
  }

  const result = await academicSemesterModel.create(payload);
  return result
}

const getAllAcademicSemestersFromDB = async () => {
  const result = await academicSemesterModel.find();
  return result;
};

const getSingleAcademicSemesterFromDB = async (id: string) => {
  const result = await academicSemesterModel.findById(id);
  return result;
};

const updateAcademicSemesterIntoDB = async (
  id: string,
  payload: Partial<TAcademicSemester>,
) => {
  if (
    payload.name &&
    payload.code &&
    academicSemesterCodeName[payload.name] !== payload.code
  ) {
    throw new AppError(httpStatus.NOT_FOUND,'Invalid Semester Code');
  }

  const result = await academicSemesterModel.findOneAndUpdate({ _id: id }, payload, {
    new: true,
  });
  return result;
};

export const academicSemesterServices = {
  academicSemesterCreateIntoDb,
  getAllAcademicSemestersFromDB,
  getSingleAcademicSemesterFromDB,
  updateAcademicSemesterIntoDB
}
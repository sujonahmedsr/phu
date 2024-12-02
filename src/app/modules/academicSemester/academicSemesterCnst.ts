import { TAcademicSemesterCode, TAcademicSemesterName, TMonths } from "./academicSemesterInterface";

export const Months: TMonths[] = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  export const AcademicSemesterName: TAcademicSemesterName[] = [
    'Autumn',
    'Summar',
    'Fall',
  ];

  export const AcademicSemesterCode: TAcademicSemesterCode[] = ['01', '02', '03'];

  type TacademicSemesterCodeName = {
    [key: string]: string
}

export const academicSemesterCodeName: TacademicSemesterCodeName ={
    Autumn: '01',
    Summar: '02',
    Fall: '03',
}
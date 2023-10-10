declare module "User" {
  interface User {
    user: {
      id: string;
      name: string;
      email: string;
      registration: string;
      curriculumId: string;
      courseName: string;
      currentSemester: number;
      enrollmentSemester: number;
      enrollmentYear: number;
      lastname: string;
      studentId: string;
      university: {
        id: string;
        name: string;
        abv: string;
        city: string;
        state: string;
      };
      username: string;
      city: string;
      state: string;
    };
    token: string;
    isAdmin: boolean;
  }

  interface UserLogin {
    username: string;
    password: string;
  }

  interface AccountInfo {
    name: string;
    lastname: string;
    username: string;
    email: string;
    registration: string;
    password: string;
    passwordConfirmation: string;
  }

  interface GeneralInformation {
    state: string;
    city: string;
    currentSemester: number;
    enrollmentSemester: number;
    enrollmentYear: number;
    curriculumId: string;
  }

  interface ProfileEdit{
    name: string;
    lastname: string;
    username: string;
    email: string;
    city?: string;
    state?: string;
  }

  interface ProfileTO {
    name: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    registration: number;
    curriculumId: string;
    city: string;
    state: string;
    enrollmentSemester: number;
    enrollmentYear: number;
  }

  type Student = AccountInfo & GeneralInformation;
}

{
  "name": "string",
  "lastname": "string",
  "username": "string",
  "email": "string",
  "password": "string",
  "registration": "493450",
  "curriculumId": "string",
  "city": "string",
  "state": "string",
  "enrollmentSemester": 1,
  "enrollmentYear": 2023
}

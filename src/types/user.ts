declare module "User" {
  interface User {
    user: {
      id: string;
      name: string;
      email: string;
      registration: string;
      curriculumId: string;
      course: {
        id: string;
        name: string;
      };
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

  type Student = AccountInfo & GeneralInformation;
}

declare module "Auth" {
  interface StudentSignup {
    name: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    registration: 493450;
    curriculumId: string;
    city: string;
    state: string;
    enrollmentSemester: 1;
    enrollmentYear: 2023;
  }

  interface AdminSignup {
    name: string;
    lastname: string;
    username: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    city: string;
    state: string;
  }
}

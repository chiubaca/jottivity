export type UserRegistration = {
  email: string;
  name: string;
  password: string;
};

export type LoginCrendentials = {
  email: string;
  password: string;
};

export type SignupResponse = {
  data: {
    idToken: string;
  };
};

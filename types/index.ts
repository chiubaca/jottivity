
export type JUserRegistration = {
  email: string;
  name: string;
  password: string;
};

export type JLoginCrendentials = {
  email: string;
  password: string;
};

export type JSignupResponse = {
  data: {
    idToken: string;
  };
};

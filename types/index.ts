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

export type JUser = {
  tokens: {
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
  };
  email: string;
  emailVerified: boolean;
  lastLoginAt: string;
  createdAt: string;
  uid: string;
};

export type JJournal = {
  name: string;
  createdAt: Date;
  token: string;
  uid: string;
};

export declare namespace firebaseExt {
  export interface ProviderData {
    uid: string;
    displayName?: any;
    photoURL?: any;
    email: string;
    phoneNumber?: any;
    providerId: string;
  }

  export interface StsTokenManager {
    apiKey: string;
    refreshToken: string;
    accessToken: string;
    expirationTime: number;
  }

  export interface MultiFactor {
    enrolledFactors: any[];
  }

  export interface UserJSON {
    uid: string;
    displayName?: any;
    photoURL?: any;
    email: string;
    emailVerified: boolean;
    phoneNumber?: any;
    isAnonymous: boolean;
    tenantId?: any;
    providerData: ProviderData[];
    apiKey: string;
    appName: string;
    authDomain: string;
    stsTokenManager: StsTokenManager;
    redirectEventId?: any;
    lastLoginAt: string;
    createdAt: string;
    multiFactor: MultiFactor;
  }
}

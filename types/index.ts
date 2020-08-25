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
  tokens: JToken;
  email: string;
  emailVerified: boolean;
  lastLoginAt: string;
  createdAt: string;
  uid: string;
  username: string;
};

export type JToken = {
  refreshToken: string;
  accessToken: string;
  expirationTime: number;
};

export type JJournal = {
  name: string;
  createdAt: number;
  uid: string; // user id
  journalId: string | undefined; // document id of journal
};

export type JPost = {
  title: string;
  contents: string;
  createdAt: number;
  tags: unknown;
  journalId: string;
  uid: string;
  postId: string | undefined; // document id of post
  deleted: boolean | undefined;
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

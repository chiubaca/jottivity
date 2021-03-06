import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
import store from "vuex";
import { JLoginCrendentials, JUserRegistration, JUser } from "@/types";
import { $axios } from "~/utils/api";

@Module({
  name: "Auth",
  namespaced: true,
  stateFactory: true,
  preserveState: false,
  store: store as any
})
export default class Auth extends VuexModule {
  _user: undefined | JUser = undefined;

  @Mutation
  SET_USER(user: any) {
    this._user = user;
  }

  @Action({ rawError: true })
  async emailLogin(loginCreds: JLoginCrendentials) {
    try {
      const user = await $axios.$post("email-login", loginCreds);

      if (user.error) {
        return user;
      }
      this.context.commit("SET_USER", user);
      return user;
    } catch (err) {
      console.error("error logging in", err);
      return err;
    }
  }

  @Action({ rawError: true })
  async emailSignup(loginCreds: JUserRegistration) {
    try {
      const user = await $axios.$post("email-signup", loginCreds);

      if (user.error) {
        return user;
      }
      this.context.commit("SET_USER", user);
      return user;
    } catch (err) {
      console.error("Vuex ,error creating new user", err);
      return err;
    }
  }

  get isSignedIn() {
    return !!this._user;
  }

  get user() {
    return this._user;
  }
}

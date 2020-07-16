import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
import store from "vuex";
import { $axios } from "~/utils/api";
import { JLoginCrendentials, JUserRegistration, JUser } from "@/types";

@Module({
  namespaced: true,
  stateFactory: true,
  preserveState: false,
  store: store as any
})
export default class Auth extends VuexModule {
  user: undefined | JUser = undefined;

  @Mutation
  SET_USER(user: any) {
    this.user = user;
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
    return !!this.user;
  }
}

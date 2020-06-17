import { Module, VuexModule, Action, Mutation } from "vuex-module-decorators";
import store from "vuex";
import { $axios } from "~/utils/api";
import { JLoginCrendentials, JUserRegistration } from "@/types";

@Module({
  namespaced: true,
  stateFactory: true,
  preserveState: false,
  store: store as any
})
export default class Auth extends VuexModule {
  user: any = null;

  @Mutation
  SET_USER(user: any) {
    this.user = user;
  }

  @Action({ rawError: true })
  async emailLogin(loginCreds: JLoginCrendentials) {
    try {
      const resp = await $axios.$post("email-login", loginCreds);
      this.context.commit("SET_USER", resp);
      console.log("login resp", resp);
      return resp
    } catch (err) {
      console.error("error logging in", err);
    }

  }

  @Action({ rawError: true })
  async emailSignup(loginCreds: JUserRegistration) {
    const resp = await $axios.$post("email-signup", loginCreds);
    this.context.commit("SET_USER", resp.message);
    console.log("login resp", resp.message);
    return resp.message;
  }

  get isSignedIn() {
    return !!this.user;
  }
}

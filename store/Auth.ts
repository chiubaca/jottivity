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
      const user = await $axios.$post("email-login", loginCreds);

      if (user.error) {
        return user;
      }

      this.context.commit("SET_USER", user);

      return user;
    } catch (err) {
      console.error("error logging in", err);
      alert("There was a problem logging in");
    }
  }

  @Action({ rawError: true })
  async emailSignup(loginCreds: JUserRegistration) {
    try {
      const user = await $axios.$post("email-signup", loginCreds);

      if (user.error) {
        alert(user.error.message);
        return;
      }
      this.context.commit("SET_USER", user);
      alert("You have successfully signed up!");
    } catch (err) {
      console.error("Vuex ,error creating new user", err);
      alert(
        "There was a problem trying registering you. Please contact alexchiu11@gmail.com"
      );
    }
  }

  get isSignedIn() {
    return !!this.user;
  }
}

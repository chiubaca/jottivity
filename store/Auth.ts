import { Module, VuexModule, Action } from "vuex-module-decorators";
import store from "vuex";
import { $axios } from "~/utils/api";
import { JLoginCrendentials } from "@/types";

@Module({
  namespaced: true,
  stateFactory: true,
  preserveState: true,
  store: store as any
})
export default class Auth extends VuexModule {
  userData: any = null;

  @Action({ rawError: true })
  async login(loginCreds: JLoginCrendentials) {
    // await console.log("test...");

    const resp = await $axios.$post("login", loginCreds);
    console.log("login resp", resp);
  }

  get userSignedIn() {
    return !this.userData;
  }
}

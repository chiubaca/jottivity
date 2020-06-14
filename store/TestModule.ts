import { Module, VuexModule, Mutation, Action } from "vuex-module-decorators";
import store from "vuex";

@Module({
  namespaced: true,
  stateFactory: true,
  preserveState: true,
  store: store as any
})
export default class TestModule extends VuexModule {
  wheels = 2;
  text = "This is somehting randon TEXT!!!!";

  @Mutation
  incrWheels(extra: number): void {
    this.wheels += extra;
  }

  @Mutation
  updateText(text: string) {
    console.log("Mutation commited", text);
    this.text = text;
  }

  @Action
  updateTextAction(updatedText: string): void {
    console.log("Action dispatched");
    this.context.commit("updateText", updatedText);
  }

  get wheelNum() {
    return this.wheels;
  }

  get randomText() {
    return this.text;
  }
}

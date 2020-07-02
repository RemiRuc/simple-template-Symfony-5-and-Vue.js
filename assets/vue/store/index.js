import Vue from "vue";
import Vuex from "vuex";
import DummyModule from "./dummy";
import SecurityModule from "./security";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    dummy: DummyModule,
    security: SecurityModule
  }
});
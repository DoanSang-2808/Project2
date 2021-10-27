import Vuex from 'vuex';
const createStore = () => {
  return new Vuex.Store({
    state: {
      isLogin: "",
      rmbLogin: "",
      bgImg: true,
      fluid: false,
    },
    getters: {
      // Here we will create getter
      getIsLogin: state => {
        return state.isLogin;
      },
      getRmbLogin: state => {
        return state.rmbLogin;
      },
      getBgImg: state => {
        return state.bgImg;
      },
      getFluid: state => {
        return state.fluid;
      }
    },
    mutations: {
      // Here we will create commit
      changeIsLogin(state, newIsLogin) {
        state.isLogin = newIsLogin;
      },
      changeRmbLogin(state, newRmbLogin) {
        state.rmbLogin = newRmbLogin;
      },
      changeBgImg(state, newBgImg) {
        state.bgImg = newBgImg;
      },
      changeFluid(state, newFluid) {
        state.fluid = newFluid;
      },
    },
    actions: {
      // Here we will creta action
      handleChangeIsLogin(context, newIsLogin) {
        context.commit("changeIsLogin", newIsLogin);
      },
      handleChangeRmbLogin(context, newRmbLogin) {
        context.commit("changeRmbLogin", newRmbLogin);
      },
      handleChangeBgImg(context, newBgImg) {
        context.commit("changeBgImg", newBgImg);
      },
      handleChangeFluid( context, newFluid) {
        context.commit("changeFluid", newFluid);
      },
    },
  })
}

export default createStore;
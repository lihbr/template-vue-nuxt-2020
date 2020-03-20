export const state = () => ({
  loaded: false,
  inited: false
});

export const mutations = {
  isLoaded(state) {
    state.loaded = true;
  },
  isInited(state) {
    state.inited = true;
  }
};

export const actions = {
  nuxtServerInit({ dispatch }) {
    dispatch("load");
    this.$logger.info("Nuxt server init content loaded");
  },
  load({ state, commit, dispatch }) {
    if (state.loaded) return;

    // Load
    dispatch("content/load");

    commit("isLoaded");
  },
  init({ state, commit, dispatch }) {
    if (!state.loaded) dispatch("load");
    if (state.inited) return;

    // Init
    // dispatch("something");

    commit("isInited");
  },
  pageChanged({ state, dispatch }) {
    if (!state.inited) dispatch("init");

    // Page changed
    // dispatch("something");
  }
};

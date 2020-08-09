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

    // Actions performed when generating application
    // dispatch("something");

    // Load finished
    commit("isLoaded");
  },
  init({ state, commit, dispatch }) {
    if (!state.loaded) dispatch("load");
    if (state.inited) return;

    // Actions performed on application mount
    // dispatch("something");

    // Init finished
    commit("isInited");
  },
  pageChanged({ state, dispatch }) {
    if (!state.inited) dispatch("init");

    // Actions performed on page change
    // dispatch("something");
  }
};

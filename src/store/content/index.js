export const state = () => ({
  // TODO: Create default state with empty object / array for cmsGlobal keys
});

export const mutations = {
  set(state, { key, value }) {
    state[key] = value;
  }
};

export const actions = {
  load({ commit }) {
    const globalContent = process.env.GLOBAL_CONTENT;
    for (const key in globalContent) {
      commit("set", { key, value: globalContent[key] });
    }
  }
};

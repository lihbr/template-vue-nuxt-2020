export const state = () => ({
  // TODO: Create default state with empty object / array for cmsGlobal keys
});

export const mutations = {
  set(state, { key, value }) {
    state[key] = value;
  }
};

export const actions = {
  async load({ commit }) {
    const cmsGlobal = process.env.CMS_GLOBAL;
    for (const key in cmsGlobal) {
      commit("set", { key, value: cmsGlobal[key] });
    }
  }
};

export const state = () => ({
  // TODO: Create default state with empty object / array for CMS_CONTENT keys
});

export const mutations = {
  set(state, { key, value }) {
    state[key] = value;
  }
};

export const actions = {
  async load({ commit }) {
    const CMS_CONTENT = process.env.CMS_CONTENT;
    for (const key in process.env.CMS_CONTENT) {
      commit("set", { key, value: CMS_CONTENT[key] });
    }
  }
};

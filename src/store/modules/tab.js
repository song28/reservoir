const state = {
  // 入库修改数据
  editableTabs: [],
  editableTabsValue: ""
};
const mutations = {
  SET_TBS: (state, payload) => {
    state.editableTabs = payload;
  },
  SET_TBS_VALUE: (state, payload) => {
    state.editableTabsValue = payload;
  }
};
const actions = {
  setEditableTabs({ commit }, payload) {
    commit("SET_TBS", payload);
  },
  setEditableTabsValue({ commit }, payload) {
    commit("SET_TBS_VALUE", payload);
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
};

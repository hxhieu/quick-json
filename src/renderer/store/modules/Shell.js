import { SET_CWD } from '@/store/types';

const state = {
  cwd: null,
};

const mutations = {
  [SET_CWD]: (state, path) => {
    if (path) {
      state.cwd = path;
    }
  },
};

const actions = {};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
};

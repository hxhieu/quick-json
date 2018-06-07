import { SET_CWD, SET_PATH } from '@/store/types';

const state = {
  cwd: null,
  path: null,
};

const mutations = {
  [SET_CWD]: (state, path) => {
    if (path) {
      state.cwd = path;
    }
  },
  [SET_PATH]: (state, path) => {
    if (path) {
      state.path = path;
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

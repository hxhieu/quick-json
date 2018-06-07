<template>
  <div>
    <el-form label-width="90px">
      <el-form-item label="Working dir">
        <el-input readonly :value="cwd">
          <template slot="append">
            <el-button slot="append" icon="el-icon-more" @click="setWorkingDir"></el-button>
          </template>
        </el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { browseDir } from '@proc/proc';
import { mapMutations, mapState } from 'vuex';
import { SET_CWD } from '@/store';

export default {
  name: 'cwd-selector',
  data: () => ({}),
  methods: {
    ...mapMutations('Shell', {
      setCwd: 'SET_CWD',
    }),
    setWorkingDir() {
      browseDir().then(dir => {
        this.setCwd(dir);
      });
    },
  },
  computed: {
    ...mapState('Shell', ['cwd']),
  },
};
</script>

<style>
</style>

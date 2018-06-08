<template>
  <div class="dir-selector">
    <el-form label-width="90px">
      <el-form-item label="Working dir">
        <el-input readonly :value="cwd">
          <template slot="append">
            <el-button slot="append" @click="setWorkingDir">Set CWD</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="Current path">
        <el-input readonly :value="cwd"></el-input>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { browseDir } from '@proc/proc';
import { mapMutations, mapState } from 'vuex';
import { SET_CWD } from '@/store/types';

export default {
  name: 'dir-selector',
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

<style lang="scss">
.dir-selector {
  .el-form-item {
    margin: 0px;
  }
}
</style>

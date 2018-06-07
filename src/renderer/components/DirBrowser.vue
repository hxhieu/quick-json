<template>
  <div class="dir-browser" :style="{height: browserHeight}">
    <div v-if="!dirs || !dirs.length" class="empty">
      <label><i class="el-icon-info"></i>Nothing here</label>
    </div>
    <div v-else>
      <ul>
        <li v-for="dir in dirs" :key="dir">{{ dir }}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import { listDirs } from '@proc/file-system';

export default {
  name: 'dir-browser',
  props: {
    height: String,
  },
  data: () => ({
    dirs: [],
  }),
  computed: {
    ...mapState('Shell', ['cwd']),
    browserHeight() {
      this.dirs && this.dirs.length ? this.height : '100%';
    },
  },
  watch: {
    cwd(val) {
      listDirs(val).then(dirs => {
        this.dirs = dirs;
      });
    },
  },
};
</script>

<style lang="scss">
.dir-browser {
  padding: 10px;
  background: #fff;

  .empty {
    text-align: center;
    i {
      margin-right: 5px;
    }
  }
}
</style>

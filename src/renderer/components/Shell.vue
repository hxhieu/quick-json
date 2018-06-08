<template>
  <div id="shell">
    <dir-selector class="selector" />
    <router-view />
  </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex';
import DirSelector from '@/components/DirSelector';
import DirBrowser from '@/components/DirBrowser';
import { SET_CWD } from '@/store/types';

export default {
  name: 'shell',
  components: {
    [DirSelector.name]: DirSelector,
  },
  created() {
    // Reload current path
    if (this.$route.params.path && !this.cwd) {
      var currentPath = atob(this.$route.params.path);
      this.setCwd(currentPath);
    }
  },
  methods: {
    ...mapMutations('Shell', {
      setCwd: SET_CWD,
    }),
  },
  computed: {
    ...mapState('Shell', ['cwd']),
  },
  watch: {
    cwd(val) {
      this.$router.push(`/working/${btoa(val)}`);
    },
  },
};
</script>

<style lang="scss">
#shell {
  height: 100%;
  .selector {
    height: 65px;
    padding: 10px;
    background: #eee;
  }

  .bread-crumb {
    padding: 0px 20px 10px 20px;
  }
}
</style>

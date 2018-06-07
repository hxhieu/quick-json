<template>
  <div id="shell">
    <dir-selector class="selector" />
    <Split class="panes">
      <SplitArea :size="33">
        <router-view class="pane" />
      </SplitArea>
      <SplitArea :size="67">
        <div class="pane">
          panel right
        </div>
      </SplitArea>
    </Split>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import DirSelector from '@/components/DirSelector';
import DirBrowser from '@/components/DirBrowser';

export default {
  name: 'shell',
  components: {
    [DirSelector.name]: DirSelector,
    [DirBrowser.name]: DirBrowser,
  },
  computed:{
    ...mapState('Shell', ['cwd'])
  },
  watch:{
    cwd(val){
      this.$router.push(`/browse/${btoa(val)}`)
    }
  }
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
  .panes {
    height: calc(100% - 85px);

    .pane {
      padding: 10px;
      height: calc(100% - 20px);
      background: #fff;
    }
  }
}
</style>

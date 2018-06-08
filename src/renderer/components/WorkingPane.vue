<template>
  <div class="working-pane">
    <Split class="panes">
      <SplitArea :size="33" :min-size="300">
        <dir-browser :path="path" glob="*.json" />
      </SplitArea>
      <SplitArea :size="67" :min-size="500">
        <router-view />
      </SplitArea>
    </Split>
  </div>
</template>

<script>
import DirBrowser from '@/components/DirBrowser';

export default {
  name: 'working-pane',
  props: {
    path: String,
  },
  components: {
    [DirBrowser.name]: DirBrowser,
  },
};
</script>

<style lang="scss">
.working-pane {
  height: calc(100% - 85px);
  .panes {
    .pane {
      padding: 10px;
      height: calc(100% - 20px);
      background: #fff;
    }
  }
}
</style>

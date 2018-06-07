<template>
  <el-container>
    <el-header height="55px">
      <cwd-selector />
    </el-header>
    <el-container>
      <el-main>
        <dir-browser height="240px" />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import WorkingDirSelector from '@/components/WorkingDirSelector';
import DirBrowser from '@/components/DirBrowser';

export default {
  name: 'shell',
  components: {
    [WorkingDirSelector.name]: WorkingDirSelector,
    [DirBrowser.name]: DirBrowser,
  },
};
</script>

<style lang="scss">
.el-header,
.el-main {
  background: #f5f5f5;
  padding: 10px;
}

.el-main {
  margin: 10px 0 0 0;
}
</style>

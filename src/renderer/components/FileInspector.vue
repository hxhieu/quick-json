<template>
  <div class="file-inspector">
    <div class="tree-scroller">
      <el-tree :data="topLevelTree" :props="treeOpts" :load="loadNode" lazy @node-click="handleNodeClick"></el-tree>
    </div>
    <div class="prop-editor">
      {{ selectedValue }}
    </div>
  </div>
</template>

<script>
import { readTextFile } from '@proc/file-system';

const isObject = (obj, prop) => obj[prop] !== Object(obj[prop]);

export default {
  name: 'file-inspector',
  props: {
    path: String,
    name: String,
  },
  data: () => ({
    file: {},
    treeOpts: {
      name: 'label',
      isLeaf: 'leaf',
    },
    selectedValue: null,
  }),
  created() {
    this.loadFile = () => {
      if (!this.filePath) return;
      readTextFile(this.filePath).then(txt => {
        this.file = JSON.parse(txt);
      });
    };

    this.getValueFromExpression = exp => {
      var data = this.file;
      if (!exp || !exp.length) return data;
      for (var i = 0; i < exp.length; i++) {
        data = data[exp[i]];
      }
      return data;
    };

    // First load
    this.loadFile();
  },
  methods: {
    handleNodeClick(node) {
      if (!node.leaf) {
        return;
      }

      const data = this.getValueFromExpression(node.path);
      this.selectedValue = data[node.label];
    },
    loadNode(node, resolve) {
      if (node.level === 0) {
        return resolve([]);
      }

      let expressionTree = [];
      let currentNode = node;
      for (var i = node.level; i > 0; i--) {
        expressionTree.push(currentNode.label);
        currentNode = currentNode.parent;
      }
      expressionTree = expressionTree.reverse();

      var data = this.getValueFromExpression(expressionTree);

      return resolve(
        Object.keys(data).map(x => ({
          label: x,
          leaf: isObject(data, x),
          path: expressionTree,
        })),
      );
    },
  },
  computed: {
    filePath() {
      return this.path && this.name
        ? `${atob(this.path)}/${atob(this.name)}`
        : null;
    },
    topLevelTree() {
      const tree = [];
      Object.keys(this.file).forEach(x => {
        const node = {
          label: x,
          leaf: isObject(this.file, x),
          path: null,
        };
        tree.push(node);
      });

      return tree;
    },
  },
  watch: {
    filePath() {
      this.loadFile();
    },
  },
};
</script>

<style lang="scss">
.file-inspector {
  height: 100%;
  overflow: hidden;
  .prop-editor {
    background: #eee;
    height: 100px;
    padding: 10px;
  }
  .tree-scroller {
    height: calc(100% - 100px);
    overflow-y: scroll;
  }
}
</style>

<template>
  <div class="file-inspector">
    <div class="prop-editor">
      <el-input v-model="selectedNode.value"
        :disabled="!canEdit"
        @keyup.enter="saveCurrent">
      </el-input>
      <el-switch
        v-model="selectedIsString"
        active-text="String"
        :disabled="!canEdit">
      </el-switch>
      <el-button type="primary" plain @click="saveCurrent" :disabled="!canEdit">Save</el-button>
      <el-button type="default" plain @click="resetCurrent" :disabled="!canEdit">Reset</el-button>
    </div>
    <div class="tree-scroller">
      <el-tree
        lazy
        :node-key="`${path ? path.toString() : ''}.${name}`"
        :data="topLevelTree"
        :props="treeOpts"
        :load="loadNode"
        @node-click="handleNodeClick">
          <span class="custom-node" slot-scope="{ data }">
            <span>{{ data.label }}</span>
            <span class="custom-node-value" v-if="data.leaf">{{ data.value }}</span>
          </span>
        </el-tree>
    </div>
  </div>
</template>

<script>
import { readTextFile } from '@proc/file-system';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { faFileCode, faFolder, faClone, faCircle } from '@fortawesome/fontawesome-free-regular';

const isObject = (obj, prop) => obj[prop] !== Object(obj[prop]);

export default {
  name: 'file-inspector',
   components: {
    FontAwesomeIcon,
  },
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
    selectedNode: {
      value: null
    },
    selectedValue: null,
    selectedIsString: true,
    canEdit: false,
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
        this.canEdit = false;
        this.selectedValue = null;
        this.selectedNode = {};
        return;
      }
      this.canEdit = true;
      this.selectedValue = node.value;
      this.selectedNode = node;
    },
    resetCurrent(){
      this.selectedNode.value = this.selectedValue;
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
          value: data[x],
          path: expressionTree,
        })),
      );
    },
    saveCurrent(){
      this.$message({
          message: 'Congrats, this is a success message.',
          type: 'success'
        });
    }
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
          value: this.file[x],
          path: null,
        };
        tree.push(node);
      });

      return tree;
    },
    iconFile() {
      return faFileCode;
    },
    iconFolder() {
      return faFolder;
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
  .el-tree {
    .custom-node {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      .custom-node-value {
        font-weight: bold;
        padding: 0 20px;
      }
    }
  }
  .prop-editor {
    background: #eee;
    height: 32px;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 10px 10px 0;
    .el-button,
    .el-switch {
      margin-left: 10px;
    }
  }
  .tree-scroller {
    height: calc(100% - 42px);
    overflow-y: auto;
    overflow-x: hidden;
  }
}
</style>

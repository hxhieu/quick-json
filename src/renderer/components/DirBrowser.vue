<template>
  <div class="dir-browser">
    <div v-if="!dirs || !dirs.length" class="empty">
      <label><i class="el-icon-info"></i>Nothing here</label>
    </div>
    <div v-else>
      <ul>
        <li class="browser-item" v-for="dir in dirs" :key="dir.name" @click="goto(dir)">
          <font-awesome-icon :icon="getIcon(dir)" />
          {{ dir.name }}
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapMutations } from 'vuex';
import { SET_CWD } from '@/store/types';
import { listDirs } from '@proc/file-system';
import FontAwesomeIcon from '@fortawesome/vue-fontawesome';
import { faFileCode, faFolder } from '@fortawesome/fontawesome-free-regular';
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid';

export default {
  name: 'dir-browser',
  components: {
    FontAwesomeIcon,
  },
  props: {
    glob: String,
    path: String,
  },
  data: () => ({
    dirs: [],
  }),
  created() {
    this.loadDir = () => {
      listDirs(atob(this.path), this.glob || '*.json').then(dirs => {
        this.dirs = dirs;
        // Insert Go Back node
        this.dirs.splice(0, 0, { name: '[...]', type: 'back' });
      }).catch(err => {
        this.$message({
          message: `Error loading directory. ERROR: ${err}`,
          type: 'error'
        });
      });
    };

    //First load
    this.loadDir();
  },
  methods: {
    goto(dir) {
      var path = this.path;
      switch (dir.type) {
        case 'dir':
          // Decrypt current path
          path = atob(path);
          // Append selected path and encrypt
          path = btoa(`${path}/${dir.name}`);
          this.$router.push({
            name: 'working',
            params: {
              path,
            },
          });
          break;
        case 'file':
          const name = btoa(dir.name);
          this.$router.push({
            name: 'working/file',
            params: {
              path,
              name,
            },
          });
          break;
        case 'back':
          break;
      }
    },
    getIcon(dir) {
      return dir.type === 'dir'
        ? faFolder
        : dir.type === 'file'
          ? faFileCode
          : dir.type === 'back' ? faArrowLeft : '';
    },
  },
  computed: {
    ...mapMutations('Shell', {
      setCwd: SET_CWD,
    }),
  },
  watch: {
    path() {
      this.loadDir();
    },
  },
};
</script>

<style lang="scss">
.dir-browser {
  height: 100%;

  .empty {
    text-align: center;
    i {
      margin-right: 5px;
    }
  }

  ul {
    margin: 0;
    padding: 0;
    list-style: none;

    li {
      cursor: pointer;
      padding: 5px;

      &:hover {
        background: #f5f5f5;
      }
    }
  }
}
</style>

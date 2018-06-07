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
import FontAwesomeIcon from '@fortawesome/vue-fontawesome'
import { faFileCode, faFolder } from '@fortawesome/fontawesome-free-regular'
import { faArrowLeft } from '@fortawesome/fontawesome-free-solid'

export default {
  name: 'dir-browser',
  components: {
    FontAwesomeIcon
  },
  props: {
    glob: String,
    path: String,
  },
  data: () => ({
    dirs: [],
  }),
  methods:{
    goto(dir){
      if (dir.type === 'dir'){
        var path = atob(this.path);
        this.$router.push(`/browse/${btoa(`${path}/${dir.name}`)}`);
      }
    },
    getIcon(dir){
      return dir.type === 'dir' ? faFolder
        : dir.type === 'file' ? faFileCode
        : dir.type === 'back' ? faArrowLeft
        : ''
    }
  },
  computed: {
    ...mapMutations('Shell', {
      setCwd: SET_CWD
    }),
    iconFile(){
      return faFileCode;
    },
    iconFolder(){
      return faFolder;
    }
  },
  watch: {
    path(val) {
      listDirs(atob(val), this.glob || '*.json').then(dirs => {
        this.dirs = dirs;
        this.dirs.splice(0 ,0, { name: '[...]', type: 'back' });
      });
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
        background: #000;
        color: #fff;
      }
    }
  }
}
</style>

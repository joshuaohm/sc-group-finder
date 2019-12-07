<template>
  <div class="SCPostDisplayer-wrapper">
    <slot>
      <Tab
        v-for="(post, index) in this.$store.state.currentPosts"
        :content="computedTabs[index]"
        :key="index"
      ></Tab>
    </slot>
  </div>
</template>

<script>
import { RepositoryFactory } from './../repository/RepositoryFactory';

export default {
  components: {
    Tab: () => import('components/Tab'),
    TabInput: () => import('components/Tab-Input'),
    Row: () => import('components/Row'),
    Panel: () => import('components/Panel')
  },
  props: {
    content: Object
  },
  data() {
    return {
      computedTabs: new Array(),
      computedTab: new Object(),
      tab1data: {
        contentType: 'Tab',
        alignType: 'left',
        lightTheme: true,
        text: [
          { value: 'post.slotsAvailable', class: 'post-slotsAvailable' },
          { value: 'post.ship.name', class: 'post-item' },
          { value: 'post.creator', class: 'post-item' },
          { value: 'post.startLocation', class: 'post-item' },
          { value: 'post.targetLocation', class: 'post-item' },
          { value: 'post.description', class: 'post-item' }
        ],
        subPanel: {
          contentType: 'SubPanel',
          lightTheme: false,
          content: [
            {
              name: 'SCPsD-1',
              contentType: 'ShipCrewPositionsDisplayer',
              content: []
            }
          ]
        }
      }
    };
  },
  beforeMount() {
    if (!this.$store.state.currentPosts) {
      this.getCurrentPosts();
    } else {
      this.parsePosts();
    }
  },
  methods: {
    parsePosts() {
      for (var i = 0; i < this.$store.state.currentPosts.length; i++) {
        //trick to deep copy object.
        var tabCopy = JSON.parse(JSON.stringify(this.tab1data));
        this.createContent(tabCopy, this.$store.state.currentPosts[i]);
      }
    },
    createContent(template, post) {
      for (var val of template.text) {
        if (val.value === 'post') val.value = post;

        if (val.value.includes('post.ship.name')) val.value = val.value.replace(/post.ship.name/gi, post.ship.name);
        if (val.value.includes('post.ship.manufacturer'))
          val.value = val.value.replace(/post.ship.manufacturer/gi, post.ship.manufacturer);
        if (val.value.includes('post.slotsAvailable'))
          val.value = val.value.replace(/post.slotsAvailable/gi, post.slotsAvailable);
        if (val.value.includes('post.description'))
          val.value = val.value.replace(
            /post.description/gi,
            post.description.length > 20 ? post.description.substring(0, 20) + '...' : post.description
          );
        if (val.value.includes('post.creator')) {
          val.value = val.value.replace(/post.creator/gi, post.creator);
        }
        if (val.value.includes('post.startLocation')) {
          val.value = val.value.replace(/post.startLocation/gi, post.startLocation);
        }
        if (val.value.includes('post.targetLocation')) {
          val.value = val.value.replace(/post.targetLocation/gi, post.targetLocation);
        }
      }

      template.subPanel.content[0].content = post;

      this.computedTabs.push(template);
    },

    getCurrentPosts() {
      var successCallBack = retData => {
        this.$store.commit('POSTSLOADED', retData.data.data);
        this.parsePosts();
      };

      var errorCallBack = error => {
        console.log(error);
      };

      const ShipCrewPostsRepository = RepositoryFactory.get('scPosts');
      ShipCrewPostsRepository.get(this.$store.state.currentUser.token, successCallBack, errorCallBack);
    }
  }
};
</script>

<style lang="scss" scoped>
/deep/ .left {
  justify-content: flex-start;
}
/deep/ .post-slotsAvailable {
  width: 100px;
}

/deep/ .post-item {
  width: 200px;
  text-align: left;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>

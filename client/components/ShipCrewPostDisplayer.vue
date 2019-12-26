<!--
- Ship Crew Post Displayer
- Used to load SCPost info and display tabs/subpanels with their contents
- Iterates through data object and replaces 'post.' references with post data, like filling a template.
-
--->
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
        delayedReveal: true,

        text: [
          { value: 'post.slotsAvailable', class: 'post-slotsAvailable' },
          { value: 'post.ship.name', class: 'post-item ship-name', legend: 'Ship' },
          { value: 'post.creator.name', class: 'post-item creator', legend: 'Creator' },
          { value: 'post.startLocation.name', class: 'post-item startLocation', legend: 'Start Location' },
          { value: 'post.targetLocation.name', class: 'post-item targetLocation', legend: 'Target Location' },
          { value: 'post.description', class: 'post-item description', legend: 'Description' }
        ],
        subPanel: {
          contentType: 'SubPanel',
          lightTheme: false,
          content: [
            {
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
          val.value = val.value.replace(/post.creator.name/gi, post.creator.name);
        }
        if (val.value.includes('post.startLocation.name')) {
          if (post.startLocation === null) val.value = '';
          else val.value = val.value.replace(/post.startLocation.name/gi, post.startLocation.name);
        }
        if (val.value.includes('post.targetLocation.name')) {
          if (post.targetLocation === null) val.value = '';
          else val.value = val.value.replace(/post.targetLocation.name/gi, post.targetLocation.name);
        }
      }

      template.subPanel.content[0].content = post;
      template.subPanel.parentId = this.$attrs.id;
      template.parentId = this.$attrs.id;

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
@import '../assets/scss/_variables.scss';

/deep/ .tab {
  overflow-x: hidden;
  cursor: pointer;
  user-select: none;

  & legend {
    font-size: 0.5rem;
    color: $orange;
    pointer-events: none;
  }

  & fieldset {
    position: relative;
    margin-bottom: 4px;
    padding: 1px 4px;
    border-color: $ice-blue;
    width: 160px;
    box-sizing: border-box;
  }

  &.active {
    fieldset {
      border-color: $orange;
    }

    legend {
      color: white;
    }
  }
}
/deep/ .left {
  justify-content: flex-start;
}

/deep/ .text-row {
  display: flex;
  overflow-x: scroll;
  -ms-overflow-style: none;
  padding-left: 74px;
  -webkit-overflow-scrolling: touch;
  overscroll-behavior: contain;
  width: 100%;
  &::-webkit-scrollbar {
    display: none;
  }
}
/deep/ .post-slotsAvailable {
  top: 2px;
  left: 2px;
  width: 70px;
  text-align: left;
  position: absolute;
  border: 1px solid $ice-blue;
  background-color: $page-border;
  box-sizing: border-box;
  height: calc(100% - 4px);
  text-align: center;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  z-index: 10;
}

/deep/ .active .post-slotsAvailable {
  border-color: $orange;
}

/deep/ .post-item {
  display: inline-block;
  text-align: left;
  white-space: nowrap;
  font-family: 'Roboto Mono', monospace;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 160px;
}
</style>

<template>
  <q-layout view="hhr lpR ffr">
    <q-header elevated class="header bg-grey-10">
      <q-toolbar class="items-strech">
        <q-btn
          v-if="$q.screen.lt.md"
          flat
          @click="drawerLeft = !drawerLeft"
          round
          dense
          icon="menu"
          class="q-mr-md drawer-icon"
          :class="{ 'rotate-90-cw': drawerLeft }"
        />

        <router-link class="title" :to="baseLink">
          <div class="flex items-center justify-center">{{ $t('title') }}</div>
        </router-link>
        <div
          v-if="$q.screen.gt.sm"
          class="toolbar-link q-ml-xl q-gutter-md text-body2 flex items-center self-stretch no-wrap"
        >
          <router-link
            v-for="section in sections"
            v-bind:key="section.title"
            :to="section.link"
            :exact="section.link === baseLink"
          >{{ $t(section.title) }}</router-link>
        </div>

        <q-space />

        <div>Quasar v{{ $q.version }}</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawerLeft"
      :width="200"
      :breakpoint="500"
      overlay
      behavior="mobile"
      v-if="$q.screen.lt.md"
    >
      <q-scroll-area class="fit">
        <q-list v-for="(section, index) in sections" :key="index">
          <q-item
            clickable
            :to="section.link"
            :exact="section.link === baseLink"
            v-ripple
            @click="closeDrawer()"
          >
            <q-item-section avatar>
              <q-icon :name="section.icon" />
            </q-item-section>
            <q-item-section>{{ $t(section.title) }}</q-item-section>
          </q-item>

          <q-separator v-if="section.separator" />
        </q-list>
      </q-scroll-area>
    </q-drawer>
    <q-page-container>
      <router-view />
    </q-page-container>

    <q-footer
      padding
      elevated
      class="bg-grey-10 text-white q-px-sm flex items-center justify-between"
    >
      <div class="text-h6">Copyright © {{ year }} Aarón Hernández Pérez</div>
      <LanguageSelector />
    </q-footer>
  </q-layout>
</template>

<script lang="ts">
import Vue from 'vue';
import { defaultLanguage } from 'boot/i18n';
import LanguageSelector from 'components/LanguageSelector.vue';

export default Vue.extend({
  name: 'MainLayout',

  components: { LanguageSelector },
  data() {
    return {
      drawerLeft: false,
      year: new Date().getFullYear(),
    };
  },
  computed: {
    baseLink: function () {
      return `/${
        this.$i18n.locale === defaultLanguage ? '' : this.$i18n.locale
      }`;
    },
    sections: function () {
      return [
        {
          title: 'Play',
          caption: 'Test your skill',
          icon: 'school',
          // @ts-ignore
          link: this.baseLink,
        },
        {
          title: 'About',
          caption: 'About invoker',
          icon: 'car',
          link: `/${this.$i18n.locale}/about`,
        },
      ];
    },
  },
  methods: {
    closeDrawer() {
      this.drawerLeft = false;
    },
  },
});
</script>

<style lang="scss" scoped>
// .header {
//   background: $dark;
// }
.q-drawer-container {
  .q-item {
    .q-item__section--main {
      color: white;
    }
    &.q-router-link--active {
      background-color: #424242;
    }
  }
}

.title {
  font-size: 2em;
  text-decoration: none;
  color: white;
}

.toolbar-link {
  font-size: 1.5em;
  height: auto;
  overflow: hidden;
  a {
    color: white;
    text-decoration: none;
    display: flex;
    align-items: center;
    height: 100%;
    &:hover {
      opacity: 0.7;
    }

    &.router-link-active {
      color: $primary;
      font-weight: bold;
    }
  }
}

.rotate-90-cw {
  transform: rotate(90deg);
}
.drawer-icon {
  transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
}
</style>

<style lang="scss">
// Non scoped scss
aside.q-drawer {
  margin-top: 50px;
}
</style>

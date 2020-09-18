<template>
  <div class="tab">
    <ul class="tab__header">
      <li
        class="tab__item "
        v-for="(tab, i) in tabs"
        :key="tab.title"
        :class="{ active: selectedIndex === i }"
      >
        <button @click="selectTab(i)">{{ tab.title }}</button>
      </li>
    </ul>
    <div class="tab_content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedIndex: 0,
      tabs: [],
    };
  },
  props: {
    tabList: Array,
  },
  methods: {
    selectTab(i) {
      this.selectedIndex = i;

      // loop over all the tabs
      this.tabs.forEach((tab, index) => {
        tab.isActive = index === i;
      });
    },
  },
  mounted() {
    this.selectTab(0);
  },
  computed: {},
  created() {
    this.tabs = this.$children;
  },
};
</script>

<style scoped>
.tab {
  height: 100%;
}
.tab__header {
  display: flex;
  align-items: center;
  justify-content: center;
}
.tab__item {
  margin: 0 10px;
  font-weight: 600;
  font-size: 1.05rem;
}
.tab_content {
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}
.tab__item.active {
  color: var(--primary-color);
}
</style>

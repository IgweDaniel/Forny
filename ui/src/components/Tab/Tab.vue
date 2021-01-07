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
      tabs: []
    };
  },
  props: {
    tabList: Array
  },
  methods: {
    selectTab(i) {
      this.selectedIndex = i;

      // loop over all the tabs
      this.tabs.forEach((tab, index) => {
        tab.isActive = index === i;
      });
    }
  },
  mounted() {
    this.selectTab(0);
  },
  computed: {},
  created() {
    this.tabs = this.$children;
  }
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
  margin: 0 auto;
  /* border: 1px solid var(--primary-color); */
  width: 250px;
}
.tab__item {
  margin: 0 7px;
  font-weight: 600;
  font-size: 0.95rem;
  text-align: center;
  /* flex: 1; */
  padding: 5px 0;
  text-transform: uppercase;
  /* background: var(--primary-light-color); */
}
.tab_content {
  width: 100%;
  height: 100%;
  /* overflow: hidden; */
}
.tab__item.active {
  color: var(--primary-color);

  /* color: #fff; */
  /* background: var(--primary-color);
  background: #ccc;
  color: #fff; */
}
</style>

<template>
  <div class="tab">
    <ul class="tab__header">
      <li
        class="tab__item "
        v-for="(tab, i) in tabs"
        :key="i"
        :class="{ active: selectedIndex === i }"
        @click="selectTab(i)"
      >
        <!-- <button @click="selectTab(i)">{{ tab.title }}</button> -->

        <component :is="tab.icon" width="22px" height="22px"></component>
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
    console.log(this.tabs);
    this.selectTab(1);
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
  width: 100%;
}
.tab__header {
  position: relative;
  display: flex;
  align-items: center;
  /* justify-content: center; */
  /* margin: 0 auto; */
  /* border: 1px solid var(--primary-color); */
  width: fit-content;
  /* background: #eee; */
  background: var(--primary-light-color);

  border-bottom: none !important;
}
.tab__header::after {
  position: absolute;
  content: "";
  height: 5px;
  /* background: #fff; */
  z-index: 2;
  width: 100%;
  bottom: -5px;
}

.tab__item {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  /* margin: 0 7px; */
  font-weight: 600;
  font-size: 0.95rem;
  text-align: center;
  /* flex: 1; */
  height: 55px;
  width: 100px;
  cursor: pointer;
  text-transform: uppercase;
  background: #fff;
}
.tab_content {
  padding: 40px;
  width: 100%;
  height: 100%;
  background: #fff;
}

.tab__item.active {
  background: var(--primary-color);
  border-right: 1px solid;
  border-left: 1px solid;
  background: #fff;
  background: var(--primary-color);
}
.tab__item.active svg {
  fill: #fff;
}
.tab__item.active:after {
  position: absolute;
  content: "";
  height: 5px;
  background: #fff;
  z-index: 2;
  width: 100%;
  bottom: -5px;
}

.tab__item:last-child {
  border-top-right-radius: 5px;
}

.tab__item:first-child {
  border-top-left-radius: 5px;
}
.tab_content {
  border-top-right-radius: 5px;
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
}
</style>

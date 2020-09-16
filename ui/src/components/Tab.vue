<template>
  <div>
    tab
  </div>
</template>

<script>
export default {
  props: {
    tabList: Array,
  },

  computed: {},
  mounted() {
    // console.log(this.$slots.default[1]);
    // console.log(this.tabList[0].component);
  },
};
</script>

<style scoped>
.tab__header {
  display: flex;
  align-items: center;
  justify-content: center;
}
.tab__item {
  margin: 0 10px;
  font-weight: 600;
  font-size: 1.1rem;
}
.tab_content {
}
.tab__item.active {
  color: var(--primary-color);
}
</style>

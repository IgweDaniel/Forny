<template>
  <div v-show="isActive" class="tabItem">
    <slot v-show="isActive"></slot>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: "Tab"
    }
  },
  data() {
    return {
      isActive: false
    };
  }
};
</script>

<style scoped>
.tabItem {
  height: 100%;
  width: 100%;
}
</style>

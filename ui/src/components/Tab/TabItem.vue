<template>
  <div v-show="isActive" class="tabItem">
    <slot v-show="isActive"></slot>
  </div>
</template>

<script>
export default {
  props: {
    icon: {
      type: Object
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

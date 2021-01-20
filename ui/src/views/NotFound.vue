<template>
  <div class="page">
    <h2>
      Oops...
    </h2>
    <h4>Seems you tried to acess a page that doosen't exist</h4>
    <button class="link" @click="handleBack">Go Back</button>
  </div>
</template>

<script>
export default {
  methods: {
    handleBack() {
      this.$router.go(-1);
    }
  }
};
</script>

<style scoped>
.page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.link {
  color: var(--primary-color);
}
</style>

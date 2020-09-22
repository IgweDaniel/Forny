<template>
  <div>
    Loading
  </div>
</template>

<script>
// import axios from "axios";
export default {
  async mounted() {
    const code = this.$route.query.code;

    try {
      // Send code to server
      this.$router.replace("/");
      console.log(code);
    } catch (error) {
      console.log(error);
    }

    // console.log("Hello");
  }
};
</script>

<style></style>

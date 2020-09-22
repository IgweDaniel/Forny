<template>
  <div class="loginGoogle">
    <div v-if="error">
      <h3>
        An error occured, redirecting you back to
        <router-link to="/login">/login</router-link>
      </h3>
    </div>
    <Spinner v-if="!error" />
  </div>
</template>

<script>
import axios from "axios";
import { Spinner } from "@/components";
export default {
  data() {
    return { error: false };
  },
  components: { Spinner },
  async mounted() {
    const code = this.$route.query.code;
    try {
      const { data } = await axios.post("/api/auth/google/", {
        code
      });
      console.log(data);
      const token = data.data.acces_token;
      localStorage.setItem("token", token);
      this.$router.replace("/");
    } catch (error) {
      this.error = true;
      console.log(error);
    }
  }
};
</script>

<style scoped>
.loginGoogle {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>

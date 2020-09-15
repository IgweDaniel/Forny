<template>
  <nav class="nav">
    <div class="logo">
      <h3>Logo</h3>
    </div>

    <ul class="nav__links">
      <li class="nav__link">
        <router-link to="/"> Forms</router-link>
      </li>
      <li class="nav__link">
        <router-link to="/account"> Account</router-link>
      </li>
      <li class="nav__link">
        <button @click="handleLogout">Logout</button>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  methods: {
    handleLogout() {
      this.$router.push({ name: "Login" });
    },
  },
};
</script>

<style scoped>
.nav {
  display: flex;
  align-items: center;
  height: 70px;
  padding: 0 50px;
  /* background: var(--secondary-color); */
  /* color: #fff; */
}
.logo {
  width: 200px;
}
.nav__links {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}
.nav__link {
  margin: 0 0px 0 10px;
}
</style>

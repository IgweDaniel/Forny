<template>
  <nav class="nav">
    <div class="logo">
      <router-link :to="{ name: 'Forms' }"> <h3>Logo</h3></router-link>
    </div>

    <div class="nav__content" ref="navContent">
      <button class="menuButton" @click="toggleSideBar">
        <i class="fas fa-user-circle"></i>
      </button>

      <ul class="nav__links" ref="sideBar">
        <button class="closemenuButton" @click="toggleSideBar">
          <i class="fas fa-times"></i>
        </button>
        <li class="nav__link">
          <router-link to="/" exact active-class="link-active">
            Forms</router-link
          >
        </li>
        <li class="nav__link">
          <router-link to="/account" active-class="link-active">
            Account</router-link
          >
        </li>
        <li class="nav__link">
          <button @click="handleLogout">Logout</button>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
import { TimelineLite } from "gsap";
import { mapActions } from "vuex";
export default {
  data() {
    return { showSideBar: false, tl: new TimelineLite() };
  },
  methods: {
    ...mapActions(["logout"]),
    handleLogout() {
      localStorage.removeItem("token");
      this.logout();
      this.$router.push({ name: "Login" });
    },
    toggleSideBar() {
      this.showSideBar = !this.showSideBar;
    },
    handleNavBlur(e) {
      if (!this.$refs.navContent) return;
      if (this.$refs.navContent.contains(e.target)) return;
      this.showSideBar = false;
    }
  },
  mounted() {
    document.body.addEventListener("click", this.handleNavBlur.bind(this));
  },

  watch: {
    showSideBar() {
      if (this.showSideBar) {
        this.tl.to(this.$refs.sideBar, {
          right: 0,
          duration: 0.5,
          ease: "power2.out"
        });
      } else {
        this.tl.reverse().then(() => (this.tl = new TimelineLite()));
      }
    }
  }
};
</script>

<style scoped>
.nav {
  display: flex;
  align-items: center;
  height: 70px;
  padding: 0 50px;
}
.logo {
  width: 200px;
}
.nav__link {
  font-weight: 600;
  /* flex: 1; */
}

.nav__content {
  display: flex;
  flex: 1;
  justify-content: flex-end;
}
.link-active {
  color: var(--primary-color);
}
@media (max-width: 768px) {
  .nav__links {
    display: flex;
    flex-direction: column;
    background: #fff;
    position: fixed;
    right: -400px;
    top: 0;
    width: 60%;
    max-width: 300px;
    padding: 20px;
    z-index: 400;
    /* color: #fff; */
    box-shadow: 3px 4px 30px -28px rgba(0, 0, 0, 0.75);
  }
  .nav__link {
    margin: 10px 0;
    font-weight: 600;
    display: block;
    font-size: 1.1rem;
  }
  .closemenuButton {
    position: absolute;
    top: 10px;
    right: 10px;
    font-size: 1.05rem;
  }

  .menuButton {
    font-size: 1.4rem;
    color: var(--primary-color);
    display: block;
  }
}

@media (min-width: 769px) {
  .menuButton,
  .closemenuButton {
    display: none;
  }
  .nav__links {
    flex: 1;
    display: flex;
    justify-content: flex-end;
    flex-direction: row;
    background: transparent;
    position: unset;
    padding: 0;
    width: unset;
    color: inherit;
  }
  .nav__link {
    margin: 0 0px 0 10px;
  }
}
</style>

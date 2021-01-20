<template>
  <div id="app">
    <Notifications />
    <Header v-if="showHeader" />
    <!-- <Header /> -->
    <Spinner v-if="loadingUser" />
    <router-view v-else />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Header, Spinner, Notifications } from "@/components";

import * as api from "@/api";

export default {
  components: {
    Header,
    Spinner,
    Notifications
  },
  data() {
    return {
      loadingUser: true
    };
  },
  computed: {
    ...mapState(["notifications", "user", "token"]),
    showHeader() {
      return !this.$route.meta.hideHeader;
    }
  },
  methods: {
    ...mapActions(["notify", "setUser"]),
    updateBrowserDimensions() {
      let vh = window.innerHeight;
      let vw = window.innerWidth;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
      document.documentElement.style.setProperty("--vw", `${vw}px`);
    },
    async getUser() {
      const { data, error } = await api.getMe();
      if (error) {
        if (this.$route.meta.protected) {
          this.$router.push({ name: "Login" });
        } else {
          this.loadingUser = false;
        }
      } else {
        this.setUser(data).then(() => {
          this.loadingUser = false;
        });
      }
    }
  },
  async mounted() {
    this.updateBrowserDimensions();
    window.addEventListener("resize", this.updateBrowserDimensions);
    if (this.token != null && this.user == null) {
      await this.getUser();
    } else {
      this.loadingUser = false;
    }
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.updateBrowserDimensions);
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

:root {
  --primary-color: #094d92;
  --primary-light-color: #eff1f3;
  --primary-light-color: #eff1f3;

  --warn-color: #cc444b;
  --success-color: #689689;

  --button-hover-color: #0b5cad;
  --button-active-color: #094786;

  --secondary-color: #17183b;
  --muted-color: rgb(176, 176, 176);

  font-size: 15px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
#app {
  height: 100%;
}
body {
  font-family: "Rubik", sans-serif;
  background: var(--primary-light-color);
}
.page {
  /* margin-top: 100px; */
  height: 100%;
}

.list-enter-active,
.list-leave-active,
.list-move {
  transition: all 0.3s ease-in-out;
}
.list-enter {
  /* opacity: 0; */
  transform: translateY(-200px);
}

.list-enter-to {
  transform: translateY(0);
}
.list-leave {
  opacity: 1;
}
.list-leave-to {
  opacity: 0;
}

button {
  box-shadow: none;
  background: transparent;
  border: none;
  color: inherit;
  font-family: "Rubik", sans-serif;
  font-size: inherit;
  font-weight: inherit;
  /* outline: none; */
  cursor: pointer;
  outline: none;
  text-transform: inherit;
}
.button {
  background: var(--primary-color);
  color: #fff;
  font-weight: 600;
  text-transform: capitalize;
  font-size: 0.9375rem;
  /* border: 2px solid var(--primary-color);
  color: var(--primary-color);
  background: var(--primary-light-color); */
  border-radius: 5px;
  box-shadow: 0 2px 2px 0 rgba(67, 154, 134, 0.1);
}
.button a {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
.button-outline {
  background: var(--primary-light-color);
  border: 2px solid var(--primary-color);
  color: var(--secondary-color);
}
.button-loading {
  position: relative;
  text-indent: 9999px;
}

.button-loading:after {
  content: "";
  height: 1.3rem;
  width: 1.3rem;
  background-image: url("./assets/loading/48x48.gif");
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.button:disabled {
  background: #cccc;
  cursor: not-allowed;
}
.button:disabled:hover {
  background: #cccc;
}
.button:disabled:active {
  background: #cccc;
}
.button:hover {
  background: var(--button-hover-color);
}
.button:active {
  background: var(--button-active-color);
}
a {
  text-decoration: none;
  color: inherit;
}

li {
  list-style: none;
}
.container {
  width: 80%;
  margin: 0 auto;
}

@media (min-width: 768px) {
  :root {
    font-size: 16px;
  }
}
</style>

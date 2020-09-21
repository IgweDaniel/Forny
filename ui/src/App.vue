<template>
  <div id="app">
    <div class="notification-container">
      <transition-group name="list">
        <Notification
          v-for="notification in notifications"
          :key="notification.id"
          :id="notification.id"
          :message="notification.message"
          :type="notification.type"
        />
      </transition-group>
    </div>
    <router-view />
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { Notification } from "@/components";
export default {
  components: {
    Notification
  },
  computed: {
    ...mapState(["notifications"])
  },
  methods: {
    ...mapActions(["notify"])
  }
};
</script>

<style>
@import url("https://fonts.googleapis.com/css2?family=Rubik:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");

:root {
  --primary-color: #439a86;
  --primary-light-color: rgba(67, 154, 134, 0.11);

  --warn-color: #cc444b;

  --button-hover-color: #4baa94;
  --button-active-color: #3e8e7b;

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
  height: 100%;
}

.notification-container {
  max-height: 100vh;
  overflow-y: auto;
  position: fixed;
  top: 0;
  right: 10px;
  z-index: 400;
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
}
.button {
  background: var(--primary-color);
  color: #fff;
  font-weight: 600;
  text-transform: capitalize;
  font-size: 0.9375rem;
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

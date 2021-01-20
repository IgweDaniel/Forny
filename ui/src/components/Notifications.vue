<template>
  <div class="notification-container">
    <transition-group name="list">
      <div
        v-for="notification in notifications"
        class="notification"
        :class="notification.type"
        @click="unotify(notification.id)"
        :key="notification.id"
      >
        <p>{{ notification.message }}</p>
      </div>
    </transition-group>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
export default {
  computed: {
    ...mapState(["notifications", "user", "token"])
  },
  methods: {
    ...mapActions(["unotify"])
  }
};
</script>

<style scoped>
.notification-container {
  max-height: 100vh;
  overflow-y: auto;
  position: fixed;
  top: 0;
  right: 10px;
  z-index: 400;
}
.notification {
  min-height: 40px;
  padding: 20px;
  margin: 20px 0;
  margin-left: auto;
  background: #fff;
  color: #fff;
  position: relative;
  width: fit-content;
  max-width: 300px;
  background: var(--secondary-color);
  font-weight: 600;
  /* box-shadow: 3px 4px 50px -24px rgba(0, 0, 0, 0.75); */
  box-shadow: 3px 4px 30px -28px rgba(0, 0, 0, 0.75);
}
.notification__closebutton {
  position: absolute;
  top: 5px;
  right: 10px;
}

.notification.success {
  background: var(--success-color);
}

.notification.error {
  background: var(--warn-color);
}
</style>

<template>
  <div class="notification" :class="type">
    <button @click="unotify(id)" class="notification__closebutton">
      <i class="fas fa-window-close"></i>
    </button>
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    message: String,
    type: String,
    id: String,
  },
  methods: {
    ...mapActions(["unotify"]),
  },
  mounted() {
    setTimeout(() => {
      this.unotify(this.id);
    }, 6000);
  },
};
//
</script>

<style scoped>
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
  top: 0px;
  right: 2px;
}

.notification.success {
  background: var(--primary-color);
}

.notification.danger {
  background: var(--warn-color);
}
</style>

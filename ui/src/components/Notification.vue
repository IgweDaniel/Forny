<template>
  <div class="notification" :class="type" @click="unotify(id)">
    <!-- <button @click="unotify(id)" class="notification__closebutton">
      
      <i class="fas fa-times"></i>
    </button> -->
    <p>{{ message }}</p>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    message: String,
    type: String,
    id: String
  },
  methods: {
    ...mapActions(["unotify"])
  },
  mounted() {
    setTimeout(() => {
      this.unotify(this.id);
    }, 5000);
  }
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

<template>
  <div class="updateProfile">
    <span class="label">
      Change email
    </span>
    <p class="desc">
      This is the email used to authenticate your account. changing it renders
      the previous invalid for authenticatation
    </p>

    <div class="inputLabel">
      Account Email
    </div>
    <CustomInput :icon="false" v-model="newEmail" />

    <button class="button " @click="updateEmail">
      update
    </button>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import CustomInput from "./CustomInput";
export default {
  data() {
    return {
      newEmail: this.user ? this.user.email : ""
    };
  },
  props: {
    user: Object
  },
  components: {
    CustomInput
  },

  methods: {
    ...mapActions(["notify"]),

    updateEmail() {
      console.log(`Account email has been updated to ${this.newEmail}`);
      this.notify({
        message: `Account email has been updated to ${this.newEmail}`,
        type: "success"
      });
    }
  }
};
</script>

<style scoped>
.updateProfile {
  /* height: 100px; */
  width: 300px;
  padding: 20px;
  width: calc(var(--vw) * 0.8);
  max-width: 500px;
}

.label {
  font-weight: 600;
  margin: 10px 0;
  display: block;
}
.desc {
  margin: 10px 0;
}
.inputLabel {
  margin: 5px 0;
}

.button {
  height: 38px;
  width: 100%;

  margin: 10px 0;
}
</style>

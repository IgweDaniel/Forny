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
    <CustomInput :icon="false" :value="newEmail" @input="setEmail" />

    <button class="button " @click="updateEmail">
      update
    </button>
  </div>
</template>

<script>
import CustomInput from "./CustomInput";
export default {
  data() {
    return {
      newEmail: "igwedanielchi@cmail.com",
    };
  },
  methods: {
    setEmail(email) {
      this.newEmail = email;
    },
    updateEmail() {
      console.log(`Account email has been updated to ${this.newEmail}`);
    },
  },
  components: {
    CustomInput,
  },
};
</script>

<style scoped>
.updateProfile {
  /* height: 100px; */
  width: 300px;
  padding: 20px;
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
  text-transform: uppercase;

  font-weight: 500;
  font-size: 0.85rem;
  margin: 10px 0;
}
@media (min-width: 768px) {
  .updateProfile {
    width: 400px;
  }
}
</style>

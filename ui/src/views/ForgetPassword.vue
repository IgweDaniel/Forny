<template>
  <div class="forgotPassword">
    <form
      class="authform authform-forgotPassword"
      @submit.prevent="handleSubmit"
    >
      <h4 class="authform__title">
        Request Password Reset
      </h4>
      <div class="authform__subtitle">
        Enter your registered email, we'll send you a link to reset your
        password
      </div>
      <div class="authform__block">
        <CustomInput
          :value="email"
          @input="handleInput"
          placeholder="Email Address"
          :icon="false"
        >
          <i class="fas fa-envelope"></i>
        </CustomInput>
      </div>
      <button class=" authform_button   button">
        send
      </button>
    </form>
  </div>
</template>

<script>
import { CustomInput } from "@/components";
export default {
  data() {
    return { email: "" };
  },
  components: {
    CustomInput
  },
  methods: {
    handleInput(val) {
      this.email = val;
    },
    handleSubmit() {
      console.log("submited", this.email);
    }
  }
};
</script>

<style scoped>
.authform-forgotPassword .button {
  width: 150px;
}

@media (min-width: 768px) {
  .authform-forgotPassword {
    max-width: 500px;
  }
}
</style>

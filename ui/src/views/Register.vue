<template>
  <div class="register">
    <form class="authform">
      <h4 class="authform__title">
        Create an account
      </h4>
      <div class="authform__subtitle">
        Setup a new account in a minute.
      </div>
      <div class="authform__block">
        <CustomInput placeholder="Full Name">
          <i class="fas fa-user"></i>
        </CustomInput>
      </div>
      <div class="authform__block">
        <CustomInput placeholder="Email Address">
          <i class="fas fa-envelope"></i>
        </CustomInput>
      </div>
      <div class="authform__block">
        <CustomInput placeholder="Password">
          <i class="fas fa-lock"></i>
        </CustomInput>
      </div>

      <button class="authform_button button">
        Register
      </button>

      <div class="altLogin">
        <p class="altLogin__title">or login with</p>
        <ul class="altLogin__links">
          <li class="altLogin__link">
            <a href="" class="google-button">google</a>
          </li>
        </ul>
      </div>

      <div class="signupLink">
        Already have an account?
        <span class="emph">
          <router-link to="/login">Login here</router-link>
        </span>
      </div>
    </form>
  </div>
</template>

<script>
import { CustomInput } from "@/components";
export default {
  components: {
    CustomInput,
  },
};
</script>

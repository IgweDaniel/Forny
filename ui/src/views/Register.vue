<template>
  <div class="register">
    <form class="authform" @submit.prevent="createUser">
      <h4 class="authform__title">
        Create an account
      </h4>
      <div class="authform__subtitle">
        Setup a new account in a minute.
      </div>
      <div class="authform__block">
        <CustomInput
          placeholder="Full Name"
          :value="name"
          @input="val => handleUpdate(val, 'name')"
        >
          <i class="fas fa-user"></i>
        </CustomInput>
      </div>
      <div class="authform__block">
        <CustomInput
          placeholder="Email Address"
          :value="email"
          @input="val => handleUpdate(val, 'email')"
        >
          <i class="fas fa-envelope"></i>
        </CustomInput>
      </div>
      <div class="authform__block">
        <CustomInput
          placeholder="Password"
          :value="password"
          @input="val => handleUpdate(val, 'password')"
        >
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
import * as api from "@/api";
import { mapActions } from "vuex";
export default {
  components: {
    CustomInput
  },
  data() {
    return {
      name: "testuser",
      email: "testuser@test.com",
      password: "mytits",
      loading: false
    };
  },
  methods: {
    ...mapActions(["notify", "login"]),
    handleUpdate(val, prop) {
      this[prop] = val;
    },
    async createUser() {
      const { name, email, password } = this,
        { data, error } = await api.registerUser(name, email, password);
      if (error) {
        console.log(error.response.status);
        if (error.response.status == 409) {
          this.notify({
            type: "error",
            message: `This email already exists for an account`
          });
        } else {
          this.notify({
            type: "error",
            message: `Account creation failed`
          });
        }
        return;
      }
      const { access_token, user } = data;
      localStorage.setItem("token", access_token);
      this.login({ user, access_token }).then(() => {
        this.$router.push({ name: "Forms" });
      });
    }
  }
};
</script>

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
        <CustomInput placeholder="Full Name" v-model="name">
          <UserIcon />
        </CustomInput>
      </div>
      <div class="authform__block">
        <CustomInput placeholder="Email Address" v-model="email">
          <EnvelopeIcon />
        </CustomInput>
      </div>
      <div class="authform__block">
        <CustomInput placeholder="Password" v-model="password">
          <LockIcon />
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
import EnvelopeIcon from "@/assets/envelope.svg";
import LockIcon from "@/assets/lock.svg";
import UserIcon from "@/assets/user.svg";
import { mapActions } from "vuex";
export default {
  components: {
    CustomInput,
    EnvelopeIcon,
    LockIcon,
    UserIcon
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

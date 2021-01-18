<template>
  <div class="login ">
    <form class="authform">
      <h4 class="authform__title">
        Login into account
      </h4>
      <div class="authform__subtitle">
        Use your credentials to access your account.
      </div>
      <div class="authform__block">
        <CustomInput
          placeholder="Email Address"
          :value="email"
          @input="val => handleUpdate(val, 'email')"
        >
          <EnvelopeIcon />
        </CustomInput>
      </div>
      <div class="authform__block">
        <CustomInput
          placeholder="Password"
          :value="password"
          @input="val => handleUpdate(val, 'password')"
        >
          <LockIcon />
        </CustomInput>
      </div>
      <div class="authform__block lostPassword">
        <router-link to="/forget-password">forget password?</router-link>
      </div>

      <button class="authform_button button" @click.prevent="handleLogin">
        Login
      </button>

      <div class="altLogin">
        <p class="altLogin__title">or login with</p>
        <ul class="altLogin__links">
          <li class="altLogin__link">
            <GoogleButton />
          </li>
        </ul>
      </div>

      <div class="signupLink">
        Don't have an account?
        <span class="emph">
          <router-link to="/register"> Register here</router-link>
        </span>
      </div>
    </form>
  </div>
</template>

<script>
import { CustomInput, GoogleButton } from "@/components";
import * as api from "@/api";
import EnvelopeIcon from "@/assets/envelope.svg";
import LockIcon from "@/assets/lock.svg";
import { mapActions } from "vuex";
export default {
  data() {
    return {
      email: "testuser@test.com",
      password: "mytits",
      loading: false
    };
  },
  components: {
    CustomInput,
    GoogleButton,
    EnvelopeIcon,
    LockIcon
  },

  methods: {
    ...mapActions(["notify", "login"]),
    handleUpdate(val, prop) {
      this[prop] = val;
    },
    async handleLogin() {
      const { email, password } = this,
        redirect = this.$route.query.redirect;
      const { data, error } = await api.loginUser(email, password);
      // Check the error and ensure is auth error

      if (error) {
        console.log(error);
        if (error.status == 401)
          this.notify({
            type: "error",
            message: "Email and password Combination does not exist"
          });
        return;
      }

      const { access_token, user } = data;
      localStorage.setItem("token", access_token);

      this.login({ user, access_token }).then(() => {
        if (redirect) {
          return this.$router.push(redirect);
        }
        this.$router.push({ name: "Forms" });
      });
    }
  }
};
</script>

<style>
.login,
.reset,
.forgotPassword,
.register {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}
.authform {
  max-width: 360px;
  width: 80%;
}
.authform__title {
  font-size: 1.5rem;
}

.authform__subtitle {
  margin: 10px 0 20px;
}

.authform__block {
  margin-bottom: 15px;
  width: 100%;
}
.authform_button {
  width: 100%;
  height: 2.5rem;
}
.lostPassword {
  color: var(--primary-color);
  text-transform: capitalize;
  display: flex;
  justify-content: flex-end;
  text-transform: lowercase;
}
.altLogin {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  margin-top: 30px;
}
.altLogin__title {
  color: var(--muted-color);
  font-size: 0.9375rem;
}

.altLogin__links {
  margin-top: 5px;
}
.altLogin__link {
  text-transform: capitalize;
  font-weight: 600;
}

.signupLink {
  text-align: center;
  margin-top: 40px;
  color: var(--muted-color);
}
.signupLink .emph {
  color: var(--primary-color);
}
</style>

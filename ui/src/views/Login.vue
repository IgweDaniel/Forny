<template>
  <div class="login ">
    <form class="form">
      <h4 class="form__title">
        Login into account
      </h4>
      <div class="form__subtitle">
        Use your credentials to access your account.
      </div>
      <div class="form__block">
        <CustomInput placeholder="Email Address">
          <i class="fas fa-envelope"></i>
        </CustomInput>
      </div>
      <div class="form__block">
        <CustomInput placeholder="Password">
          <i class="fas fa-lock"></i>
        </CustomInput>
      </div>
      <div class="form__block lostPassword">
        forgot password?
      </div>

      <button class="form_button button" @click="handleLogin">
        Login
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
        Don't have an account?
        <span class="emph">
          <router-link to="/register"> Register here</router-link>
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
  methods: {
    handleLogin(e) {
      e.preventDefault();
      this.$router.push({ name: "Home" });
    },
  },
};
</script>

<style>
.login,
.register {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
}
.form {
  max-width: 360px;
  width: 80%;
}
.form__title {
  font-size: 1.5rem;
}

.form__subtitle {
  margin: 10px 0 20px;
}

.form__block {
  margin-bottom: 15px;
  width: 100%;
}
.form_button {
  width: 100%;
  height: 2.5rem;
}
.lostPassword {
  color: var(--primary-color);
  text-transform: capitalize;
  display: flex;
  justify-content: flex-end;
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

<template>
  <div class="page">
    <Header />
    <div class="home  container">
      <h2 class="title">
        My Forms
      </h2>

      <button class="new-form">
        <span class="icon">
          <i class="fas fa-plus"></i>
        </span>
        <span class="text">New form</span>
      </button>
      <div class="formList">
        <div class="form" v-for="form in forms" :key="form.id">
          <router-link
            :to="{ name: 'Form', params: { id: form.id } }"
            class="form__content"
          >
            <div class="form_display">
              <EggIcon />
            </div>

            <div class="form__info">
              <h4>
                {{ form.name }}
              </h4>
              <p>{{ form.submissions_count }} submissions</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Header } from "@/components";
import { forms } from "@/data.js";

import EggIcon from "@/assets/egg.svg";
export default {
  data: () => {
    return {
      forms,
    };
  },
  components: {
    Header,
    EggIcon,
  },
};
</script>

<style scoped>
.home {
  position: relative;
  --marginVertical: 40px;
  margin-top: var(--marginVertical);
  margin-bottom: var(--marginVertical);
}
.formList {
  margin: 40px 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, 190px);
  grid-auto-rows: 210px;
  /* padding: 50px 40px; */
  column-gap: 30px;
  /* background: #fff; */
}

.form {
  border-radius: 4px;
}
.form {
  background: #fff;
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 2px 0 rgba(67, 154, 134, 0.1);
  /* background: var(--primary-color);
  color: #fff; */
  cursor: pointer;
  transition: all 0.2s linear;
}

.form:hover {
  box-shadow: 0 13px 19px 0 rgba(191, 198, 204, 0.44);
}
.form:hover svg {
  fill: var(--primary-color);
}
.form__content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.form_display {
  height: 60%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border-bottom: 1px solid rgba(67, 154, 134, 0.2); */
}

.form_display svg {
  fill: rgba(67, 154, 134, 0.15);
  transition: all 0.2s linear;
}
.form__info {
  height: 40%;
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

.new-form {
  position: absolute;
  right: 0;
  height: 30px;
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 1px solid var(--primary-color); */
  background: #fff;
  /* color: #fff; */
  /* background: var(--primary-color); */
}
.new-form .icon {
  font-size: 0.6rem;
  margin-right: 5px;
}
.new-form .text {
}
</style>

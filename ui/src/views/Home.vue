<template>
  <div class="page">
    <Header />
    <div class="home  container">
      <h2 class="title">
        My Forms
      </h2>
      <div class="formList">
        <div class="add-form">
          <img src="@/assets/add.png" alt="" />
        </div>

        <div class="form" v-for="form in forms" :key="form.id">
          <router-link :to="{ name: 'Form', params: { id: form.id } }">
            <h4>
              {{ form.name }}
            </h4>
            <p>count: {{ form.submissions_count }}</p>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Header } from "@/components";
import { forms } from "@/data.js";
export default {
  data: () => {
    return {
      forms,
    };
  },
  components: {
    Header,
  },
};
</script>

<style scoped>
.page {
  height: 100vh;
  overflow: hidden;
  background: rgba(67, 154, 134, 0.1);
}
.home {
  --marginVertical: 20px;
  margin-top: var(--marginVertical);
  margin-bottom: var(--marginVertical);
}
.formList {
  margin: 40px 0;
  display: grid;
  grid-template-columns: repeat(auto-fit, 190px);
  grid-auto-rows: 210px;
  padding: 50px 40px;
  column-gap: 30px;
  background: #fff;
}
.add-form,
.form {
  border-radius: 4px;
}
.form {
  background: #fff;
  width: 100%;
  height: 100%;
  background: #e2f3e2;
  background: var(--primary-color);
  color: #fff;
  cursor: pointer;
}
.form a {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.add-form {
  border: 1px dashed #ccc;
  display: flex;
  align-items: center;
  justify-content: center;
}
.add-form img {
  height: 60px;
  width: 60px;
}
</style>

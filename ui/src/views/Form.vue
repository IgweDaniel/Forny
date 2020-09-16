<template>
  <div class="page">
    <Header />
    <h1 class="title">
      {{ form.name }}
    </h1>

    <div class="form container">
      <div class="tab">
        <ul class="tab__header">
          <li class="tab__item active"><button>Submissions</button></li>
          <li class="tab__item"><button>Settings</button></li>
        </ul>

        <div class="tab_content">
          <FormSubms />
          <FormSettings v-if="1 == 2" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Header, FormSubms, FormSettings } from "@/components";
import { forms } from "@/data.js";
export default {
  data: () => ({
    tabList: [{ name: "Submissions", component: 1 }],
  }),
  components: {
    Header,
    FormSubms,
    FormSettings,
  },
  computed: {
    form() {
      const formId = this.$route.params.id,
        form = forms.find((form) => form.id == formId);
      return form;
    },
  },
};
</script>

<style scoped>
.page .title {
  margin: 40px auto;
  display: flex;
  align-items: center;
  justify-content: center;
}

.form {
  height: 400px;
  background: #fff;
  width: 80%;
  --marginVertical: 40px;
  margin-top: var(--marginVertical);
  margin-bottom: var(--marginVertical);
  padding: 20px 40px;
}
.tab__header {
  display: flex;
  align-items: center;
  justify-content: center;
}
.tab__item {
  margin: 0 10px;
  font-weight: 600;
  font-size: 1.1rem;
}

.tab__item.active {
  color: var(--primary-color);
}
</style>

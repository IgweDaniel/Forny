<template>
  <div class="page">
    <Header />
    <h1 class="title">
      {{ form.name }}
    </h1>

    <div class="form container">
      <Tab>
        <TabItem title="Submissions">
          <FormData :subs="form.subs" />
        </TabItem>
        <TabItem title="Settings">
          <FormSettings :form="form" />
        </TabItem>
      </Tab>
    </div>
  </div>
</template>

<script>
import { Header, FormData, FormSettings, Tab, TabItem } from "@/components";
import { forms } from "@/data.js";
export default {
  data: () => ({
    tabList: [{ name: "Submissions", component: 1 }],
  }),
  components: {
    Header,
    FormData,
    FormSettings,
    TabItem,
    Tab,
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

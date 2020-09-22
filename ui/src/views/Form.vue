<template>
  <div class="page">
    <!-- <Header /> -->
    <h1 class="title">
      {{ form.name }}
    </h1>
    <p class="endpoint">
      <span class="emph"> Endpoint:</span>

      <input
        type="text"
        ref="endpointUrl"
        class="endpoint__url"
        :value="form_url"
        readonly
        :spellcheck="false"
      />

      <button class="endpoint__copybutton" @click="copyUrl">
        <i class="far fa-clone"></i>
      </button>
    </p>
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
import { FormData, FormSettings, Tab, TabItem } from "@/components";
import { forms } from "@/data.js";
import { mapActions } from "vuex";
export default {
  data: () => ({
    tabList: [{ name: "Submissions", component: 1 }]
  }),
  components: {
    FormData,
    FormSettings,
    TabItem,
    Tab
  },
  computed: {
    form_url() {
      return `http://forny.com/${this.$route.params.id}`;
    },
    form() {
      const formId = this.$route.params.id,
        form = forms.find(form => form.id == formId);
      return form;
    }
  },
  methods: {
    ...mapActions(["notify"]),
    copyUrl() {
      const url = this.$refs.endpointUrl;
      url.select();
      url.setSelectionRange(0, url.value.length);
      document.execCommand("copy");
      this.notify({
        message: "Endpoint copied to clipboard",
        type: "success"
      });
    }
  }
};
</script>

<style scoped>
.page .title {
  margin: 40px auto 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.endpoint {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fff;
  width: fit-content;
  max-width: 400px;
  width: 80%;
  margin: 0 auto;
  padding: 0 20px;
  height: 40px;
}
.endpoint .emph {
  color: var(--primary-color);
  margin-right: 5px;
  font-weight: bold;
  flex: 1;
}
.endpoint__copybutton {
  flex: 1;
  display: flex;
  justify-content: flex-end;
}

.endpoint__url {
  flex: 2;
  font-family: Rubik;
  outline: none;
  border: none;
  font-size: 1rem;
}

.form {
  min-height: 400px;
  background: #fff;
  width: 90%;

  --marginVertical: 40px;
  margin-top: var(--marginVertical);
  margin-bottom: var(--marginVertical);
  padding: 20px;
  /* transition: all 0.5s ease-in-out; */
  /* overflow-y: ; */
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

@media (min-width: 768px) {
  .form {
    padding: 20px 40px;
  }
}
</style>

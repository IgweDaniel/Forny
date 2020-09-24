<template>
  <Spinner v-if="status == 'loading'" />
  <div v-else-if="status == 'error'" class="formError">
    <h1>error loading Form</h1>
    <button class="button">Refresh PAGE</button>
  </div>
  <div class="page" v-else>
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
          <FormData :keys="form.tableKeys" :formId="form.id" />
        </TabItem>
        <TabItem title="Settings">
          <FormSettings :form="form" @formUpdate="handleUpdate" />
        </TabItem>
      </Tab>
    </div>
  </div>
</template>

<script>
import { FormData, FormSettings, Tab, TabItem, Spinner } from "@/components";
import * as api from "@/apiFunctions";
import { mapActions } from "vuex";

export default {
  data: () => ({
    form: null,
    status: "loading"
  }),
  components: {
    FormData,
    FormSettings,
    TabItem,
    Tab,
    Spinner
  },
  computed: {
    form_url() {
      return `http://forny.com/${this.$route.params.id}`;
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
    },
    handleUpdate(data) {
      this.form = data;
    }
  },
  async mounted() {
    const { data, error } = await api.getForm(this.$route.params.id);
    if (error) {
      this.status = "error";
      return;
    }
    this.form = data;
    this.status = "done";
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
  width: 90%;
  margin: 0 auto;
  padding: 0 20px;
  height: 40px;
  font-size: 0.98rem;
}
.endpoint .emph {
  color: var(--primary-color);
  margin-right: 5px;
  font-weight: bold;
  width: fit-content;
}
.endpoint__copybutton {
  width: fit-content;
  display: flex;
  justify-content: flex-end;
}

.endpoint__url {
  flex: 1;
  font-family: Rubik;
  outline: none;
  border: none;

  margin-right: 5px;
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

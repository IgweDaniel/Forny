<template>
  <Spinner v-if="status == 'loading'" />
  <div v-else-if="status == 'error'" class="formError">
    <h1>error loading Form</h1>
    <button class="button" @click="handleRefresh">Refresh PAGE</button>
  </div>
  <div class="page" v-else>
    <div class="container">
      <div class="form__meta">
        <h1 class="title">
          {{ form.name }}
        </h1>
      </div>

      <div class="form container">
        <Tab>
          <TabItem :icon="entryIcon">
            <Entries :keys="form.tableKeys" :formId="form.id" />
          </TabItem>
          <TabItem :icon="settingsIcon">
            <FormSettings :form="form" @formUpdate="handleUpdate" />
          </TabItem>
        </Tab>
      </div>
    </div>
  </div>
</template>
<script>
// v-bind="$attrs"
import { Entries, FormSettings, Tab, TabItem, Spinner } from "@/components";
import * as api from "@/api";
import { mapActions } from "vuex";
import EntryIcon from "@/assets/entry.svg";
import SettingsIcon from "@/assets/settings.svg";

export default {
  data: () => ({
    form: null,
    status: "loading",
    entryIcon: EntryIcon,
    settingsIcon: SettingsIcon
  }),
  components: {
    Entries,
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
    handleRefresh() {
      window.location.reload();
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
.form__meta {
  margin: 20px auto 10px;
  display: flex;
  align-items: center;
  height: 40px;
}

.page .title {
}

.form {
  min-height: 308px;
  width: 100%;
  --marginVertical: 40px;
  margin-top: var(--marginVertical);
  margin-bottom: var(--marginVertical);
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
}
</style>

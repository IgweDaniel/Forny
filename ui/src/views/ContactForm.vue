<template>
  <Spinner v-if="status == 'loading'" />
  <div v-else-if="status == 'error'" class="container ">
    <div class="formFetchError">
      <h2>error loading Form</h2>
      <button class="button" @click="handleRefresh">Refresh page</button>
    </div>
  </div>
  <div class="page" v-else>
    <Modal :show="deleteDialog" :close="() => updateDialogState(false)">
      <DeleteForm :form="form" />
    </Modal>
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
            <Prefrences
              :form="form"
              @formUpdate="handleUpdate"
              @deleteFormRequest="() => updateDialogState(true)"
            />
          </TabItem>
        </Tab>
      </div>
    </div>
  </div>
</template>
<script>
// v-bind="$attrs"
import {
  Entries,
  Prefrences,
  Tab,
  TabItem,
  Spinner,
  DeleteForm,
  Modal
} from "@/components";
import * as api from "@/api";
import { mapActions } from "vuex";
import EntryIcon from "@/assets/entry.svg";
import SettingsIcon from "@/assets/settings.svg";

export default {
  data: () => ({
    form: null,
    status: "loading",
    entryIcon: EntryIcon,
    settingsIcon: SettingsIcon,
    deleteDialog: false
  }),
  components: {
    Entries,
    Prefrences,
    TabItem,
    Tab,
    Spinner,
    DeleteForm,
    Modal
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
    updateDialogState(state) {
      this.deleteDialog = state;
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

.formFetchError {
  /* margin: 0 auto; */
  width: fit-content;
  text-transform: capitalize;
  /* text-align: center; */
}
.formFetchError .button {
  height: 40px;
  padding: 0 10px;
  margin: 5px 0;
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

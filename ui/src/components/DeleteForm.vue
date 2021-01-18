<template>
  <form class="deleteForm" @submit.prevent="deleteForm">
    <h3 class="legend">Are you absolutely sure</h3>
    <p class="warning-msg">
      This action will also delte all entries made to this form and further
      entries made to the form will fail
    </p>
    <p class="label">
      Please type <span class="formName"> {{ form.name }}</span> to confirm
    </p>
    <CustomInput
      :value="formName"
      :icon="false"
      @input="val => handleUpdate(val)"
    >
    </CustomInput>
    <button class="button" :disabled="!canDelete">
      I understand the consequences and delete this form
    </button>
  </form>
</template>

<script>
import { CustomInput } from "@/components";
import { mapActions } from "vuex";
import * as api from "@/api";
export default {
  props: {
    form: Object
  },
  data() {
    return {
      formName: "",
      canDelete: false
    };
  },
  methods: {
    ...mapActions(["notify"]),
    handleUpdate(val) {
      this.formName = val;
    },
    async deleteForm() {
      if (this.canDelete) {
        const { data, error } = await api.deleteForm(this.form.id);
        if (error) {
          this.notify({
            message: `Error Deleting form`,
            type: "error"
          });
        } else {
          this.notify({
            message: `${data.name} deleted`,
            type: "success"
          });
          this.$router.push({ name: "Forms" });
        }
      }
    }
  },
  watch: {
    formName(val) {
      this.canDelete = val === this.form.name;
    }
  },
  components: {
    CustomInput
  }
};
</script>

<style scoped>
.deleteForm {
  padding: 20px;
  width: calc(var(--vw) * 0.8);
  max-width: 700px;
}
.deleteForm .button {
  height: 40px;
  background: var(--warn-color);
  padding: 0 20px;
  width: 100%;
  margin: 10px 0;
}
.deleteForm .button:disabled {
  background-color: #ccc;
  color: #888;
}
.deleteForm .label {
  margin: 5px 0;
}
.deleteForm .formName {
  font-size: 1.1rem;
  font-weight: bold;
}
.warning-msg {
  margin: 10px 0;
}
</style>

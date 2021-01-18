<template>
  <div class="formsettings">
    <div class="endpoint formsetting">
      <label class="label">
        Your form's endpoint is:
      </label>
      <form class="form" @submit.prevent="copyUrl">
        <div class="input">
          <CustomInput
            class="endpoint__url"
            :value="`http://localhost:9000/api/${form.publicId}`"
            readonly
            :icon="false"
            :spellcheck="false"
            name="endpointUrl"
          />
        </div>
        <button class="button" :class="{ 'button-loading': nameButtonLoading }">
          <div class="icon">
            <ClipBoardIcon width="17px" height="17px" fill="#fff" />
            <!-- <i class="fas fa-clipboard"></i> -->
          </div>
        </button>
      </form>
    </div>
    <div class="formsettings__group">
      <div class="name formsetting">
        <label class="label">
          Name
        </label>
        <form class="form" @submit.prevent="saveFormName">
          <div class="input">
            <CustomInput
              :value="newName"
              :icon="false"
              @input="val => handleUpdate(val, 'newName')"
            />
          </div>
          <button
            class="button"
            :class="{ 'button-loading': nameButtonLoading }"
          >
            save
          </button>
        </form>
      </div>
      <div class="targetEmail formsetting">
        <label class="label">
          Target Email
        </label>
        <form class="form" @submit.prevent="saveNewEmail">
          <div class="input">
            <CustomInput
              :value="newTargetEmail"
              :icon="false"
              @input="val => handleUpdate(val, 'newTargetEmail')"
            />
          </div>

          <button
            class="button"
            :class="{ 'button-loading': emailButtonLoading }"
          >
            save
          </button>
        </form>
      </div>
    </div>
    <div class="emailing formsetting">
      <div class="info">
        <h4>
          Email Notifications
        </h4>
        <p>
          Enable or disable sending notification emails. Submissions will still
          be saved to the archive
        </p>
      </div>
      <div class="updater">
        <CheckBox
          name="email"
          :value="emailNotifyStatus"
          @input="val => handleUpdate(val, 'emailNotifyStatus')"
        />
      </div>
    </div>
    <div class="deleteForm formsetting">
      <div class="info">
        <h4>
          Delete Form
        </h4>
        <p class="disclaimer">
          Deleting the form will erase all traces of this form on our databases,
          including all the submissions.
        </p>
      </div>
      <div class="updater">
        <button class="delete" @click="requestFormDelete">
          <DeleteIcon />
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { CustomInput } from "@/components";
import CheckBox from "./CheckBox.vue";
import { mapActions } from "vuex";

import * as api from "@/api";
import ClipBoardIcon from "@/assets/clipboard.svg";
import DeleteIcon from "@/assets/delete.svg";

export default {
  props: {
    form: Object
  },
  data() {
    return {
      newName: this.form.name,
      newTargetEmail: this.form.targetEmail,
      emailNotifyStatus: this.form.emailNotify,
      nameButtonLoading: false,
      emailButtonLoading: false
    };
  },
  methods: {
    ...mapActions(["notify"]),
    copyUrl(e) {
      const url_holder = e.target.elements["endpointUrl"];
      url_holder.select();
      url_holder.setSelectionRange(0, url_holder.value.length);
      document.execCommand("copy");
      this.notify({
        message: "Endpoint copied to clipboard",
        type: "success"
      });
    },
    handleUpdate(val, prop) {
      this[prop] = val;
    },

    requestFormDelete() {
      this.$emit("deleteFormRequest");
    },
    async saveNewEmail() {
      if (this.newTargetEmail == this.form.targetEmail) {
        return this.notify({
          type: "error",
          message: `${this.newName}  update is same as existing`
        });
      }
      this.emailButtonLoading = true;
      const { data, error } = await api.updateForm(this.form.id, {
        targetEmail: this.newTargetEmail
      });
      if (error) {
        this.emailButtonLoading = false;
        return this.notifyUpdateError();
      }
      this.emailButtonLoading = false;
      this.brodcastFormUpdate(data);
    },

    async saveFormName() {
      if (this.newName == this.form.name) {
        return this.notify({
          type: "error",
          message: `${this.newName}  update is same as existing`
        });
      }
      this.nameButtonLoading = true;
      const { data, error } = await api.updateForm(this.form.id, {
        name: this.newName
      });
      if (error) {
        this.nameButtonLoading = false;
        return this.notifyUpdateError();
      }
      this.nameButtonLoading = false;
      this.brodcastFormUpdate(data);
    },

    brodcastFormUpdate(data) {
      this.$emit("formUpdate", data);
      this.notify({
        type: "success",
        message: `${this.newName} form settings has been updated`
      });
    },

    notifyUpdateError() {
      this.notify({
        type: "error",
        message: `${this.newName} form settings could not be updated`
      });
    }
  },

  watch: {
    async emailNotifyStatus() {
      const { data, error } = await api.updateForm(this.form.id, {
        emailNotifyStatus: this.emailNotifyStatus
      });
      if (error) {
        return this.notifyUpdateError();
      }
      this.brodcastFormUpdate(data);
    }
  },
  components: {
    CustomInput,
    CheckBox,
    ClipBoardIcon,
    DeleteIcon
  }
};
</script>

<style scoped>
.formsettings {
  margin: 40px 0;
}

.formsetting {
  margin: 0 0 20px;
  width: 100%;
}

.formsetting .form {
  display: flex;
  flex-direction: column;
  width: 100%;
}
.formsetting .label {
  margin: 0 0 5px;
  display: block;
  font-weight: bold;
}
.formsetting .form .input,
.formsetting .form .button {
  height: 42px;
}
.formsetting .form .input {
  flex: 1;
  margin: 0 0 5px;
}
.formsetting .form .button {
  width: 100%;
}

.formsettings__group {
  display: flex;
  flex-direction: column;
}

.formsetting .updater {
  width: 100%;
  height: 100%;
  display: flex;
  align-self: flex-end;
  justify-content: flex-end;
}
.formsetting .info {
  flex: 1;
}
.delete {
  color: var(--warn-color);
  font-size: 1.4rem;
}

@media (min-width: 540px) {
}
@media (min-width: 768px) {
  .emailing,
  .deleteForm {
    display: flex;
  }

  .formsetting .form .input {
    flex: 1;
    margin-right: 10px;
  }
  .formsetting .form .button {
    width: 100px;
  }
  .formsetting .form {
    display: flex;
    flex-direction: row;
  }
  .formsetting .updater {
    width: 100px;
    margin: 0;
  }
}
@media (min-width: 1024px) {
  .formsettings__group {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
  }

  .formsettings__group .formsetting {
    width: 48%;
  }
}
</style>

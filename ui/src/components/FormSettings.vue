<template>
  <div class="formsettings">
    <div class="group">
      <div class="name formsetting-field">
        <label class="formsetting__label">
          Name
        </label>
        <div class="formsetting__input">
          <CustomInput
            :value="newName"
            :icon="false"
            @input="(val) => handleUpdate(val, 'newName')"
          />
        </div>
        <button class="button">save</button>
      </div>
      <div class="targetEmail formsetting-field">
        <label class="formsetting__label">
          Target Email
        </label>
        <div class="formsetting__input">
          <CustomInput
            :value="newTargetEmail"
            :icon="false"
            @input="(val) => handleUpdate(val, 'newTargetEmail')"
          />
        </div>

        <button class="button">save</button>
      </div>
    </div>
    <div class="emailing formsetting">
      <div class="formsetting__info">
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
          :value="newEmailNotify"
          @input="(val) => handleUpdate(val, 'newEmailNotify')"
        />
      </div>
    </div>
    <div class="deleteForm formsetting">
      <div class="formsetting__info">
        <h4>
          Delete Form
        </h4>
        <p class="disclaimer">
          Deleting the form will erase all traces of this form on our databases,
          including all the submissions.
        </p>
      </div>
      <div class="updater">
        <button class="delete">
          <i class="fas fa-trash"></i>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { CustomInput } from "@/components";
import CheckBox from "@/components/CheckBox.vue";
export default {
  props: {
    form: Object,
  },
  data() {
    return {
      newName: this.form.name,
      newTargetEmail: this.form.target_email,
      newEmailNotify: this.form.notifications,
    };
  },
  methods: {
    handleUpdate(val, prop) {
      this[prop] = val;
    },
  },

  components: { CustomInput, CheckBox },
};
</script>

<style scoped>
.formsettings {
  margin: 80px 0;
}

.formsetting {
  margin: 20px 0;
}
.formsetting,
.formsetting-field {
  display: flex;
  align-items: center;
  width: 100%;
  padding: 0 20px;
}
.formsetting-field {
  position: relative;
  height: 42px;
}
.formsetting__input {
  flex: 1;
  margin-right: 10px;
}

.formsetting-field .button {
  width: 100px;
  background: var(--primary-color);
  color: #fff;
  height: 100%;
  font-weight: 600;
}
.formsetting__label {
  position: absolute;
  top: -30px;
  font-weight: bold;
}
.group {
  display: flex;
}

.formsetting .updater {
  width: 100px;
  height: 100%;
  display: flex;
  align-self: flex-end;
  justify-content: flex-end;
}
.formsetting__info {
  flex: 1;
}
.delete {
  color: #cc444b;
}
</style>

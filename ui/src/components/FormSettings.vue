<template>
  <div class="formsettings">
    <div class="formsettings__group">
      <div class="name formsetting">
        <label class="label">
          Name
        </label>
        <form class="form">
          <div class="input">
            <CustomInput
              :value="newName"
              :icon="false"
              @input="(val) => handleUpdate(val, 'newName')"
            />
          </div>
          <button class="button">save</button>
        </form>
      </div>
      <div class="targetEmail formsetting">
        <label class="label">
          Target Email
        </label>
        <form class="form">
          <div class="input">
            <CustomInput
              :value="newTargetEmail"
              :icon="false"
              @input="(val) => handleUpdate(val, 'newTargetEmail')"
            />
          </div>

          <button class="button">save</button>
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
          :value="newEmailNotify"
          @input="(val) => handleUpdate(val, 'newEmailNotify')"
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
        <button class="delete">
          <!-- <i class="fas fa-trash"></i> -->
          <i class="fas fa-minus-circle"></i>
          <!-- <i class="fas fa-ban"></i> -->
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { CustomInput } from "@/components";
import CheckBox from "./CheckBox.vue";
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

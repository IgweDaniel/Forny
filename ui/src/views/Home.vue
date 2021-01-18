<template>
  <div class="page">
    <!-- <Header /> -->
    <Modal :show="newFormModal" :close="toggleNewFormModal">
      <form class="addForm" @submit.prevent="createForm">
        <h3>
          Create Form
        </h3>
        <p class="addForm__info">
          The default email address for the form is this account's email, you
          can change it in this form's setting
        </p>
        <CustomInput
          placeholder="Form Name"
          :icon="false"
          :value="formName"
          @input="handleChange"
        />
        <button class="button addForm__button ">
          create form
        </button>
      </form>
    </Modal>
    <div class="home  container">
      <div class="meta">
        <h2 class="title">
          My Forms
        </h2>

        <button class="newFormButtton" @click="addForm">
          <span class="icon">
            <i class="fas fa-plus"></i>
          </span>
          <span class="text">New form</span>
        </button>
      </div>
      <Spinner v-if="status == 'loading'" />
      <h2 v-else-if="status == 'error'">Something went wrong</h2>
      <template v-else>
        <div v-if="forms.length < 1" class="emptyForm">
          <div class="emptyForm__icon">
            <EmptyBoxIcon />
          </div>
          <h2 class="emptyForm__text">You have no forms. Start creating now</h2>
        </div>
        <div class="formList" v-else>
          <div class="formList__item" v-for="form in forms" :key="form.id">
            <router-link
              :to="{ name: 'Form', params: { id: form.id } }"
              class="formList__item__content"
            >
              <div class="formList__item_display">
                <EggIcon />
              </div>

              <div class="formList__item__info">
                <h4>
                  {{ form.name }}
                </h4>
                <p>{{ form.entryCount }} submissions</p>
              </div>
            </router-link>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script>
import { Modal, CustomInput, Spinner } from "@/components";
import * as api from "@/api";
import EggIcon from "@/assets/egg.svg";
import EmptyBoxIcon from "@/assets/inbox-empty-tray.svg";
import { mapActions, mapState } from "vuex";
export default {
  data: () => {
    return {
      forms: [],
      newFormModal: false,
      formName: "",
      status: "loading"
    };
  },
  components: {
    EggIcon,
    Modal,
    CustomInput,
    Spinner,
    EmptyBoxIcon
  },
  computed: { ...mapState(["user"]) },
  methods: {
    ...mapActions(["notify"]),
    toggleNewFormModal() {
      this.newFormModal = !this.newFormModal;
    },
    addForm() {
      if (this.forms.length >= this.user.plan.maxForms) {
        return this.notify({
          message: `Form limit reached. please upgrade your plan`,
          type: "error"
        });
      }
      this.toggleNewFormModal();
    },
    handleChange(val) {
      this.formName = val;
    },
    async createForm() {
      const { data, error } = await api.createAForm(this.formName);
      this.formName = "";
      this.toggleNewFormModal();
      if (error) {
        if (error == "Limit Exceeded") {
          return this.notify({
            message: `Limit Exceeded`,
            type: "error"
          });
        }
        return this.notify({
          message: `Form with name ${this.formName} creation failed`,
          type: "error"
        });
      }
      this.forms.push(data);

      this.notify({
        message: `Form with name ${data.name} succesfully Created`,
        type: "success"
      });
    },
    async getForms() {
      const { data, error } = await api.getMyForms();
      if (error) {
        this.status = "error";
        return;
      }
      this.forms = data;
      this.status = "done";
    }
  },
  mounted() {
    this.getForms();
  }
};
</script>

<style scoped>
.home {
  position: relative;
  --marginVertical: 40px;
  margin-top: var(--marginVertical);
  margin-bottom: var(--marginVertical);
}

.meta {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.emptyForm {
  margin: 70px 0;
  text-align: center;
}
.emptyForm__icon {
  font-size: 2rem;
}

.emptyForm__text {
  font-size: 1.3rem;
}
.formList {
  margin: 40px 0;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  grid-auto-rows: 210px;
  /* padding: 50px 40px; */
  column-gap: 30px;
  row-gap: 20px;
  /* background: #fff; */
}

.formList__item {
  background: #fff;
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 2px 0 rgba(67, 154, 134, 0.1);
  /* background: var(--primary-color);
  color: #fff; */
  /* background: #577399;
  color: #fff; */
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.2s linear;
  /* border: 1px solid #eee; */
}

.formList__item:hover {
  box-shadow: 0 13px 19px 0 rgba(191, 198, 204, 0.44);
}
.formList__item:hover svg {
  fill: var(--primary-color);
}
.formList__item__content {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.formList__item_display {
  height: 60%;
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border-bottom: 1px solid rgba(67, 154, 134, 0.2); */
}

.formList__item_display svg {
  fill: var(--primary-light-color);
  transition: all 0.2s linear;
  /* fill: #fff; */
}
.formList__item__info {
  height: 40%;
  width: 100%;
  padding: 0 20px;
  display: flex;
  justify-content: center;
  flex-direction: column;
}

form.addForm {
  padding: 20px;
  width: 300px;
}
.addForm__info {
  margin: 10px 0;
}

.addForm__button {
  height: 2.5rem;
  padding: 0 10px;
  margin-top: 10px;
  display: block;
  width: 100%;
}
.newFormButtton {
  position: absolute;
  right: 0;
  height: 30px;
  width: 120px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* border: 1px solid var(--primary-color); */
  background: #fff;
  /* color: #fff; */
  /* background: var(--primary-color); */
}
.newFormButtton:hover {
}
.newFormButtton:active {
  border: 1px solid var(--secondary-color);
}
.newFormButtton .icon {
  font-size: 0.6rem;
  margin-right: 5px;
}
.newFormButtton .text {
}

@media (min-width: 540px) {
  form.addForm {
    padding: 20px;
    width: 400px;
  }
}
@media (min-width: 768px) {
  form.addForm {
    padding: 20px;
    width: 500px;
  }
  .formList {
    grid-template-columns: repeat(1, 1fr);
  }
}
@media (min-width: 1024px) {
  .addForm__button {
    /* width: 150px; */
  }

  .formList {
    grid-template-columns: repeat(auto-fit, 190px);
  }
}
</style>

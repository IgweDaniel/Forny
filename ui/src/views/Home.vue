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
      <h2 class="title">
        My Forms
      </h2>

      <button class="newFormButtton" @click="addForm">
        <span class="icon">
          <i class="fas fa-plus"></i>
        </span>
        <span class="text">New form</span>
      </button>
      <Spinner v-if="status == 'loading'" />
      <h2 v-else-if="status == 'error'">Something went wrong</h2>

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
              <p>{{ form.submissions.length }} submissions</p>
            </div>
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal, CustomInput, Spinner } from "@/components";
// import { forms } from "@/data.js";
import axios from "axios";
import EggIcon from "@/assets/egg.svg";
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
    Spinner
  },
  computed: { ...mapState(["user"]) },
  methods: {
    ...mapActions(["notify"]),
    toggleNewFormModal() {
      this.newFormModal = !this.newFormModal;
    },
    addForm() {
      if (this.forms.length >= this.user.plan.max_forms) {
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
      const {
        data: { form }
      } = await axios.post("/forms", {
        name: this.formName
      });
      this.forms.push(form);
      this.toggleNewFormModal();
      this.notify({
        message: `Form with name ${form.name} succesfully Created`,
        type: "success"
      });
    },
    async getForms() {
      try {
        const { data } = await axios.get("/forms", {});
        this.forms = data;
        this.status = "done";
      } catch (error) {
        this.status = "error";
        console.log(error);
      }
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
  border-radius: 4px;
}
.formList__item {
  background: #fff;
  width: 100%;
  height: 100%;
  box-shadow: 0 2px 2px 0 rgba(67, 154, 134, 0.1);
  /* background: var(--primary-color);
  color: #fff; */
  cursor: pointer;
  transition: all 0.2s linear;
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
  fill: rgba(67, 154, 134, 0.15);
  transition: all 0.2s linear;
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
    width: 150px;
  }

  .formList {
    grid-template-columns: repeat(auto-fit, 190px);
  }
}
</style>

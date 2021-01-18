<template>
  <div class="page">
    <h1 class="title">
      Account
    </h1>
    <Modal :show="modals.cardModal" :close="() => toggleModal('cardModal')">
      <AddCard />
    </Modal>
    <Modal :show="modals.accModal" :close="() => toggleModal('accModal')">
      <UpdateProfile :user="user" />
    </Modal>
    <div class="container account">
      <div class="profile account__setting">
        <h3 class="account__setting__label">
          Personal Information
        </h3>
        <p>
          You are registered with the email
          <span class="emph" v-if="user">
            {{ user.email }}
          </span>
          since 03:46 PM UTC - 06 September 2020.
        </p>

        <button class="button" @click="() => toggleModal('accModal')">
          Update Profile
        </button>
      </div>
      <div class="plan  account__setting">
        <h3 class="account__setting__label">
          Current Plan: Free
        </h3>
        <button class="button">
          <router-link to="/plans"> upgrade plan</router-link>
        </button>
      </div>
      <div class="billing  account__setting">
        <h3 class="account__setting__label">
          Billing
        </h3>
        <button class="button" @click="() => toggleModal('cardModal')">
          Add card
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Modal, AddCard, UpdateProfile } from "@/components";
import { mapState } from "vuex";
AddCard;
export default {
  data() {
    return {
      modals: {
        cardModal: false,
        accModal: false
      }
    };
  },
  components: {
    Modal,
    AddCard,
    UpdateProfile
  },
  computed: {
    ...mapState(["user"])
  },

  methods: {
    toggleModal(prop) {
      this.modals = {
        ...this.modals,
        [prop]: !this.modals[prop]
      };
    }
  }
};
</script>

<style scoped>
.page .title {
  margin: 40px auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.emph {
  background: var(--primary-light-color);
  color: var(--primary-color);
  padding: 5px;
  display: inline-block;
  text-align: center;

  font-weight: 600;
  font-size: 0.95rem;
}
.account {
  background: #fff;
  min-height: 400px;
  padding: 40px;
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  column-gap: 20px;
  margin-bottom: 20px;
  width: 90%;
}
/* .account__setting {
}
.account__setting__label {
} */

.account__setting .button {
  height: 39px;
  /* width: fit-content; */
  width: 100%;
  padding: 0 20px;
  margin: 20px 0;
  margin-right: 10px;
}

@media (min-width: 768px) {
  .account__setting .button {
    width: 150px;
  }
  .account {
    background: #fff;
    height: 400px;
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1024px) {
  .account {
    width: 80%;
  }
}
</style>

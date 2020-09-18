<template>
  <div class="page">
    <Header />
    <h1 class="title">
      Account
    </h1>
    <Modal :show="cardModal" :close="toggleCardModal">
      <AddCard />
    </Modal>
    <div class="container account">
      <div class="profile account__setting">
        <h3 class="account__setting__label">
          Personal Information
        </h3>
        <p>
          You are registered with the email
          <span class="emph">
            koxade6577@wonrg.com
          </span>
          since 03:46 PM UTC - 06 September 2020.
        </p>
        <button class="button">
          Update Profile
        </button>
      </div>
      <div class="plan  account__setting">
        <h3 class="account__setting__label">
          Current Plan: Free
        </h3>
        <button class="button">
          upgrade plan
        </button>
      </div>
      <div class="billing  account__setting">
        <h3 class="account__setting__label">
          Billing:
        </h3>
        <button class="button" @click="toggleCardModal">
          Add card
        </button>
        <button class="button">
          Add Address
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import { Header, Modal, AddCard } from "@/components";
export default {
  data() {
    return {
      cardModal: false,
    };
  },
  components: {
    Header,
    Modal,
    AddCard,
  },
  methods: {
    toggleCardModal() {
      this.cardModal = !this.cardModal;
    },
  },
};
</script>

<style scoped>
.page .title {
  margin: 40px auto;
  display: flex;
  align-items: center;
  justify-content: center;
}
.account {
  background: #fff;
  height: 400px;
  padding: 40px;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  column-gap: 20px;
}
.account__setting {
}
.account__setting__label {
}

.account__setting .button {
  background: var(--primary-color);
  height: 39px;
  color: #fff;
  font-weight: 600;
  width: fit-content;
  padding: 0 20px;
  margin: 20px 0;
  margin-right: 10px;
}
.account__setting .button:active {
  background: var(--primary-light-color);
}
</style>

<template>
  <div class="addCard">
    <div class="addCard__content">
      <span class="label">Add Card</span>
      <div class="addCard__container">
        <div ref="card" class="addCard__input"></div>
      </div>
      <button @click="createCard" class="addCard__button button">
        Create Card
      </button>
    </div>
  </div>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";
import { mapActions } from "vuex";
const stripe_key =
  "pk_test_51HNZanJnak3PexxST8Q6su9EFaPo5EXew0USIPW42tAcOs3eHbv8jxasF4yoC4CX2IgWaves3Ow3nrvBidYyGf9R00G7CO3nRg";
export default {
  data() {
    return { elements: {}, stripe: {} };
  },
  methods: {
    ...mapActions(["notify"]),
    createCard() {
      console.log(this.stripe);

      this.notify({
        message: "Card added",
        type: "success"
      });
    }
  },
  async mounted() {
    const stripe = await loadStripe(stripe_key);
    this.stripe = stripe;
    const elements = stripe.elements(),
      card = elements.create("card");
    if (this.$refs.card) card.mount(this.$refs.card);
  }
};
</script>

<style scoped>
.addCard {
  width: 300px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.addCard__content {
  width: 100%;
}

.addCard__content .label {
  font-weight: 600;
  margin: 10px 0;
  display: block;
}
.addCard__container {
  border: 1px solid var(--primary-color);
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 10px;
}
.addCard__input {
  width: 100%;
}
.addCard__button {
  width: 100%;
  height: 40px;
  margin-top: 10px;
}
@media (min-width: 568px) {
  .addCard {
    width: 400px;
  }
}
@media (min-width: 768px) {
  .addCard {
    width: 500px;
  }
}
</style>

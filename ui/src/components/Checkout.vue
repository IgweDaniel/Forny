<template>
  <div class="checkOut">
    <div class="checkOut__input">
      <CustomInput
        placeholder="Card Holder"
        :icon="false"
        v-model="cardHolderName"
      />
    </div>
    <div class="checkOut__input">
      <div class="cardContainer">
        <div ref="card" class="card"></div>
      </div>
    </div>

    <div class="checkOut__input">
      <button
        class="button checkOut___button"
        :class="{ 'button-loading': buttonLoading }"
        @click="handlePurchase"
      >
        Purchase
      </button>
    </div>
  </div>
</template>

<script>
import { loadStripe } from "@stripe/stripe-js";
import CustomInput from "./CustomInput";
import * as api from "@/api";
import { mapActions } from "vuex";
const stripe_key =
  "pk_test_51HNZanJnak3PexxST8Q6su9EFaPo5EXew0USIPW42tAcOs3eHbv8jxasF4yoC4CX2IgWaves3Ow3nrvBidYyGf9R00G7CO3nRg";

export default {
  components: {
    CustomInput
  },
  props: ["plan", "planId"],
  data() {
    return {
      card: null,
      cardHolderName: "",
      stripeToken: "",
      buttonLoading: false
    };
  },
  methods: {
    ...mapActions(["notify", "setUser"]),

    async handlePurchase() {
      if (this.cardHolderName.trim() == "") {
        this.notify({
          message: "card Holder Name Required",
          type: "error"
        });
        return;
      }
      this.buttonLoading = true;
      const { token, error: cardError } = await this.stripe.createToken(
        this.card,
        {
          name: this.cardHolderName
        }
      );
      if (cardError) {
        console.log(cardError);
        return;
      }
      const { data, error } = await api.upgradePlan(this.planId, token.id);
      if (error != null) {
        this.buttonLoading = false;
        this.notify({
          message: "Something Went Wrong",
          type: "error"
        });
      }
      this.setUser(data.user).then(() => {
        this.buttonLoading = false;
      });
      console.log({ data, error });
    }
  },
  async mounted() {
    const stripe = await loadStripe(stripe_key);
    this.stripe = stripe;
    const elements = stripe.elements();
    this.card = elements.create("card");
    if (this.$refs.card) this.card.mount(this.$refs.card);
  }
};
</script>

<style scoped>
.checkOut {
  padding: 15px;

  width: calc(var(--vw) * 0.8);
  max-width: 500px;
}

.cardContainer {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  background: #fff;
  padding: 0 10px;
  border: 1px solid var(--muted-color);
}
.card {
  width: 100%;
}
.checkOut__input {
  margin: 10px;
}
.address {
  width: 100%;
  font-family: Rubik;
  padding: 10px;
  font-size: 0.9375rem;
  outline: none;
  border: 1px solid var(--muted-color);
}
.checkOut___button {
  width: 100%;
  height: 40px;
}
</style>

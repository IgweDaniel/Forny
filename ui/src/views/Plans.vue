<template>
  <div class="page">
    <Modal :show="showUpgradeModal" :close="toggleModal">
      <CheckOut :planId="selectedPlan" />
    </Modal>
    <Spinner v-if="status == 'loading'" />
    <div class="container plans" v-else>
      <h1 class="title">
        Forny Plans
      </h1>
      <p class="subtitle">
        Simple, fair pricing for everyone. Cancel anytime.
      </p>
      <div class="planList">
        <div class="plan" v-for="plan in plans" :key="plan.id">
          <h3 class="plan__name">{{ plan.name }}</h3>
          <div class="plan__price">
            <span class="dollarsymbol">$</span>
            <span class="value">
              {{ plan.price }}
            </span>
            <span class="freq">/mo</span>
          </div>
          <div class="plan__action">
            <button
              class="button"
              :disabled="plan.isCurrent"
              @click="selectPlan(plan.id)"
            >
              {{ plan.isCurrent ? "current" : "select" }}
            </button>
          </div>
          <ul class="plan__perks">
            <li class="plan__perk">
              <span class="emph"> {{ normalizeValue(plan.maxForms) }} </span
              >forms
            </li>
            <li class="plan__perk">
              <span class="emph">
                {{ normalizeValue(plan.maxEntries) }}
              </span>
              submissions
            </li>
            <li
              class="plan__perk"
              v-for="feature in plan.features"
              :key="feature"
            >
              {{ feature }}
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import { plans } from "@/data.js";
import { CheckOut, Spinner, Modal } from "@/components";
import * as api from "@/apiFunctions";
import { mapActions, mapState } from "vuex";
export default {
  data() {
    return {
      plans: [],
      status: "loading",
      showUpgradeModal: false,
      selectedPlan: null
    };
  },
  components: { CheckOut, Spinner, Modal },
  computed: {
    ...mapState(["user"])
  },
  methods: {
    ...mapActions(["notify"]),
    normalizeValue(val) {
      return val == 9999 ? "unlimited" : val;
    },
    selectPlan(id) {
      this.selectedPlan = id;
      this.toggleModal();
    },
    toggleModal() {
      console.log({ user: this.user });
      this.showUpgradeModal = !this.showUpgradeModal;
    }
  },
  async mounted() {
    const { data, error } = await api.listPlans();
    if (error != null) {
      this.notify({
        message: "Something went wrong",
        type: "error"
      });
    }
    this.plans = data;
    this.status = "done";
    console.log({ data });
  }
};
</script>

<style scoped>
.page .subtitle {
  margin: 10px 0 40px;
  font-size: 1.1rem;
}
.plans {
  /* min-height: 400px; */
  padding: 40px;
  margin-bottom: 20px;
  width: 90%;
}
.planList {
  display: grid;
  grid-template-columns: repeat(1, 1fr);
  gap: 40px;
}
.plan {
  /* border: 1px solid #fff; */
  background: #fff;
  padding: 20px;
}

.plan__name {
  text-transform: capitalize;
  text-align: center;
  font-size: 1.5rem;
  margin: 10px 0;
}
.plan__price {
  margin: 0 auto;
  width: fit-content;
  font-weight: 500;
  font-size: 1.1rem;
}
.plan__price .dollarsymbol {
  position: relative;
  top: -10px;
  left: 5px;
}
.plan__price .value {
  font-size: 2rem;
  color: var(--primary-color);
}
.plan__price .freq {
  display: inline-block;
  position: relative;
  left: -5px;
  top: -5px;
}
.plan__action {
  display: flex;
  justify-content: center;
}
.plan .button {
  width: fit-content;
  margin: 10px auto;
  display: inline-block;
  padding: 0 20px;
  height: 40px;
}
.plan__perks {
  padding: 10px;
  border-top: 1px solid var(--primary-light-color);
  width: fit-content;
  margin: 10px auto;
  /* align-items: center; */
}
.plan__perk {
  text-transform: capitalize;
  margin: 5px 0;
  font-size: 1.05rem;
}
.plan__perk .emph {
  font-weight: 600;
  color: var(--primary-color);
}

@media (min-width: 1024px) {
  .planList {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>

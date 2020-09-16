<template>
  <div class="input">
    <span class="input__icon" v-if="icon">
      <slot></slot>
    </span>
    <input
      type="text"
      class="input__element"
      :placeholder="placeholder"
      :class="{ withIcon: icon }"
      v-model="inpvalue"
    />
  </div>
</template>

<script>
export default {
  props: {
    placeholder: String,
    value: String,
    icon: {
      default: true,
      type: Boolean,
    },
  },
  computed: {
    inpvalue: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit("input", val);
      },
    },
  },
  methods: {
    handleInputChange() {
      this.$emit("input", this.value);
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.input {
  height: 2.625rem;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--muted-color);
  width: 100%;
  background: #fff;
}

.input__icon {
  max-width: 3.0625rem;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  color: var(--muted-color);
}
.input__element {
  flex: 1;
  height: 100%;
  margin: 0;
  border: none;
  outline: none;
  padding: 0 10px;
}
.input__element.withIcon {
  padding: 0;
}

.input__element,
.input__element::placeholder {
  font-family: Rubik;
  font-size: 0.9375rem;
}
</style>

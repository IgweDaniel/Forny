<template>
  <div class="checkbox">
    <input
      type="checkbox"
      v-model="inpvalue"
      :name="name"
      :id="name"
      class="checkbox__element"
    />
    <label :for="name" class="checkbox__label">
      <span class="checkbox__label__indicator"> </span>
    </label>
  </div>
</template>

<script>
export default {
  name: "CheckBox",
  props: {
    name: String,
    value: [String, Boolean],
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
};
</script>

<style scoped>
.checkbox {
  cursor: pointer;
  width: fit-content;
}
.checkbox__label {
  cursor: pointer;
  position: relative;

  background: #ccc;
  border: 2px solid #ccc;
  height: 20px;
  width: 50px;
  display: block;
}
.checkbox__label__indicator {
  position: absolute;
  left: 0;
  width: 50%;
  background: #fff;
  height: 100%;
  display: block;
  transition: all 0.2s ease-in;
}
.checkbox__element {
  display: none;
}
.checkbox__element:checked + .checkbox__label {
  background: var(--primary-color);
  border-color: var(--primary-color);
}
.checkbox__element:checked + .checkbox__label .checkbox__label__indicator {
  transform: translateX(100%);
}
</style>

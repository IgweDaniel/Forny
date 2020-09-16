<template>
  <div class="formsettings">
    <div class="name formsetting">
      <div class="formsetting__input">
        <CustomInput :icon="false" />
      </div>
      <button class="button">save</button>
    </div>
    <div class="targetEmail"></div>
    <div class="deleteForm"></div>
  </div>
</template>

<script>
import { CustomInput } from "@/components";
export default {
  components: { CustomInput },
};
</script>

<style scoped>
.formsettings {
  margin: 20px 0;
}

.formsetting {
  height: 42px;
  padding: 0 20px;
  width: 100%;
  display: flex;
  align-items: center;
}
.formsetting__input {
  flex: 1;
  margin-right: 20px;
}

.formsetting .button {
  width: 150px;
  background: var(--primary-color);
  height: 100%;
  color: #fff;
}
</style>

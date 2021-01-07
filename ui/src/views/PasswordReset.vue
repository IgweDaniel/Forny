<template>
  <div class="reset">
    <form class="authform authform-reset">
      <h4 class="authform__title">
        Set a new password
      </h4>

      <div class="authform__block">
        <CustomInput placeholder="Enter Pasword" :icon="false">
          <i class="fas fa-envelope"></i>
        </CustomInput>
      </div>
      <div class="authform__block">
        <CustomInput
          placeholder="Enter to ensure you don't forget again"
          :icon="false"
        >
          <i class="fas fa-envelope"></i>
        </CustomInput>
      </div>
      <button class=" authform_button   button">
        update
      </button>
    </form>
  </div>
</template>

<script>
import { CustomInput } from "@/components";
export default {
  components: {
    CustomInput
  }
};
</script>

<style scoped>
.authform-reset .authform__title {
  margin: 10px 0;
}

@media (min-width: 768px) {
  .authform-reset {
    max-width: 400px;
  }
}
</style>

<template>
  <div>
    <Header />
    <h1>
      form
      {{ $route.params.id }}
    </h1>
  </div>
</template>

<script>
import { Header } from "@/components";
export default {
  components: {
    Header,
  },
};
</script>

<style></style>

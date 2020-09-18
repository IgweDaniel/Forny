<template>
  <div class="subs">
    <table class="subs__table">
      <thead>
        <tr class="row">
          <td class="name col ">Name</td>
          <td class="email col">Email</td>
          <td class="subject col">Subject</td>
          <td class="message col">Message</td>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sub in subs" :key="sub.id" class="row">
          <td class="name col">{{ sub.name }}</td>
          <td class="email col">{{ sub.email }}</td>
          <td class="subject col">{{ sub.subject }}</td>
          <td class="message col">{{ sub.message }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  props: {
    subs: Array,
  },
  data() {
    return {};
  },
};
</script>

<style scoped>
.subs {
  width: 100%;
  margin: 40px 0 0;
  padding: 20px 0;
  min-height: 300px;
  overflow-x: auto;
}
.subs__table {
  height: 100%;
  width: 100%;
  border: 1px solid var(--primary-light-color);
}

.subs thead {
  background: var(--primary-light-color);
  font-weight: 700;
}

.subs tbody .row {
  border-bottom: 1px solid var(--primary-light-color);
  padding: 10px;
}
.subs tbody .row:last-of-type {
  border-bottom: none;
}
.subs .row {
  min-height: 40px;
  padding: 0 10px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.subs .col {
  flex: 1;
  min-width: 120px;
}

.subs .col.message {
  flex: 2;
  min-width: 400px;
}

.subs .col {
  display: flex;
  align-items: center;
  font-size: 0.95rem;
}

@media (min-width: 540px) {
}
@media (min-width: 768px) {
}
@media (min-width: 1024px) {
}
</style>

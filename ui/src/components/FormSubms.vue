<template>
  <table class="subs">
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
</template>

<script>
export default {
  data: () => ({
    subs: [
      {
        id: 1,
        name: "dan joe",
        email: "d@d.com",
        subject: "Hiring Possibilities",
        message: "Hello dANIEL I want to hire you for a breif job",
      },
      {
        id: 2,
        name: "jane del",
        email: "janey@d.com",
        subject: "A freelance Gig",
        message:
          "I have a gig for you spanning 3 months are you intrested, pay is 200k/month",
      },
    ],
  }),
};
</script>

<style scoped>
.subs {
  width: 100%;
  margin: 40px 0 0;
}
.subs thead,
.subs tbody {
  width: 100%;
}
.subs thead {
  font-weight: 700;
}
.subs thead .col {
  /* border-bottom: 1px solid var(--primary-color); */
}
.subs .col {
  display: flex;
  align-items: center;
  justify-content: center;
}
.subs .row {
  display: flex;
  align-items: center;
  justify-content: center;
}
.subs tbody .row {
  min-height: 40px;
}
.subs .col {
  flex: 1;
}
.subs .col.subject {
  flex: 2;
}
.subs .col.message {
  flex: 3;
}
</style>

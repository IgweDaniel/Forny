<template>
  <div class="subs">
    <table class="subs__table">
      <thead>
        <tr class="row">
          <th class="name col ">Name</th>
          <th class="email col">Email</th>
          <th class="subject col">Subject</th>
          <th class="message col">Message</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="sub in subs" :key="sub.id" class="row">
          <td class="name col" data-label="name">{{ sub.name }}</td>
          <td class="email col" data-label="email">{{ sub.email }}</td>
          <td class="subject col" data-label="subject">{{ sub.subject }}</td>
          <td class="message col" data-label="message">{{ sub.message }}</td>
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
  padding: 20px 0;
  min-height: 300px;
  overflow-x: auto;
}
.subs th {
  background: var(--primary-light-color);
  font-weight: 700;
}

.subs__table {
  height: 100%;
  width: 100%;
  border: 1px solid var(--primary-light-color);
  border-collapse: collapse;
}

td.name {
  white-space: nowrap;
}
td.subject {
  min-width: 150px;
}
td,
th {
  padding: 10px;
  text-align: left;
}
.subs tbody .row {
  border-bottom: 1px solid var(--primary-light-color);
}
.subs tbody .row:last-of-type {
  border-bottom: none;
}
@media only screen and (max-width: 760px),
  (min-device-width: 768px) and (max-device-width: 1024px) {
  table,
  thead,
  tbody,
  th,
  td,
  tr {
    display: block;
  }

  /* Hide table headers (but not display: none;, for accessibility) */
  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  td {
    /* Behave  like a "row" */
    border: none;
    position: relative;
    padding-left: 40%;
    overflow-x: auto;
    font-size: 0.95rem;
  }
  /* tbody {
    overflow: scroll;
  } */
  td:before {
    position: absolute;
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    white-space: nowrap;
    content: attr(data-label);
    text-transform: capitalize;
    font-weight: 700;
  }
}
</style>

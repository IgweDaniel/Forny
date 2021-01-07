<template>
  <div class="subs">
    <Spinner v-if="status == 'loading'" />
    <template v-else>
      <div v-if="entries.length < 1" class="empty-table">
        No Entries for this form yet
      </div>
      <table class="subs__table" v-else>
        <thead>
          <tr class="row">
            <th class="col" v-for="key in keys" :key="key" :class="key">
              {{ key }}
            </th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="entry in entries" :key="entry.id" class="row">
            <td
              class="col"
              :data-label="key"
              :class="key"
              :key="key"
              v-for="key in keys"
            >
              <p v-if="key == 'createdAt'">
                {{ entry[key] }}
              </p>
              <p v-else>
                {{ entry.data[key] }}
              </p>
            </td>
            <!-- <td class="name col" data-label="name">{{ entry.name }}</td>
          <td class="email col" data-label="email">{{ entry.email }}</td>
          <td class="subject col" data-label="subject">{{ entry.subject }}</td>
          <td class="message col" data-label="message">{{ entry.message }}</td> -->
          </tr>
        </tbody>
      </table>
    </template>
  </div>
</template>

<script>
import * as api from "@/api";
import Spinner from "./Spinner";
import { mapActions } from "vuex";
export default {
  components: {
    Spinner
  },
  props: {
    keys: Array,
    formId: String
  },
  data() {
    return {
      status: "loading",
      entries: []
    };
  },

  methods: { ...mapActions(["notify"]) },

  async mounted() {
    console.log(this.keys);
    const { data, error } = await api.getFormEntries(this.formId);
    if (error) {
      this.notify({
        type: "error",
        message: "Submissions cannot be loaded at the moment"
      });
      return;
    }
    this.entries = data;
    this.status = "done";
    console.log(data);
  }
};
</script>

<style scoped>
.empty-table {
  text-align: center;
  margin: 30px 0;
}
.subs {
  width: 100%;
  padding: 20px 0;
  min-height: 300px;
  overflow-x: auto;
}
.subs th {
  background: var(--primary-light-color);
  font-weight: 700;
  text-transform: capitalize;
}

.subs__table {
  height: 100%;
  width: 100%;
  border: 1px solid var(--primary-light-color);
  border-collapse: collapse;
}

td.subject {
  min-width: 150px;
}
td,
th {
  padding: 10px;
  text-align: left;
  font-size: 0.95rem;
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
  tbody tr {
    padding: 10px 0;
  }

  td {
    /* Behave  like a "row" */
    border: none;
    position: relative;
    padding-left: 40%;
    /* overflow-x: auto; */
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

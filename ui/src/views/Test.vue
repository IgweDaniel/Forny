<template>
  <div class="page container test">
    <h1>Forny Test Page</h1>
    <p class="wiki">
      Test submissions to your form by pasting the endpoint url in the field
      below
    </p>
    <div class="input">
      <CustomInput
        placeholder="http://localhost:9000/api/b75c0673ee1347a49f2a09f6b0f04f0d"
        v-model="url"
        :icon="false"
      />
    </div>

    <form @submit.prevent="handleTest">
      <!-- <form :action="url" method="post"> -->
      <div class="input">
        <CustomInput placeholder="name" v-model="fields.name" :icon="false" />
      </div>
      <div class="input">
        <CustomInput placeholder="email" v-model="fields.email" :icon="false" />
      </div>
      <div class="input">
        <CustomInput
          placeholder="subject"
          v-model="fields.subject"
          :icon="false"
        />
      </div>
      <textarea
        name="content"
        id=""
        cols="30"
        rows="10"
        placeholder="message"
        v-model="fields.content"
      >
      </textarea>
      <button type="submit" class="button">submit</button>
    </form>
  </div>
</template>

<script>
import { CustomInput } from "@/components";

export default {
  data() {
    return {
      url: "",
      fields: { name: "", email: "", subject: "", content: "" }
    };
  },
  methods: {
    urlencodeFormData(fd) {
      let s = "";
      function encode(s) {
        return encodeURIComponent(s).replace(/%20/g, "+");
      }
      for (let pair of fd.entries()) {
        if (typeof pair[1] == "string") {
          s += (s ? "&" : "") + encode(pair[0]) + "=" + encode(pair[1]);
        }
      }
      return s;
    },
    handleTest() {
      const formData = new FormData();
      const request = new XMLHttpRequest();
      request.open("POST", this.url);
      for (const key in this.fields) {
        formData.append(key, this.fields[key]);
      }
      request.setRequestHeader(
        "Content-Type",
        "application/x-www-form-urlencoded"
      );
      request.onload = function() {
        console.log(request.responseURL);
        console.log(request.response);
      };

      request.send(this.urlencodeFormData(formData));
    }
  },
  components: { CustomInput }
};
</script>

<style scoped>
.test {
  margin: 40px auto 0;
}
.wiki {
  margin-bottom: 10px;
}
.button {
  padding: 0 20px;
  height: 2.5rem;
  margin: 20px 0;
}
form {
  margin: 10px 0;
}
form .input {
  margin: 5px 0;
}
textarea {
  border: 1px solid var(--muted-color);
  width: 100%;
  background: #fff;
  display: block;
  font-family: "Rubik", sans-serif;
  /* height: 200px; */
  outline: none;
  padding: 10px;

  font-size: 0.9375rem;
}
</style>

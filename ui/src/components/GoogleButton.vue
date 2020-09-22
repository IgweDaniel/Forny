<template>
  <a :href="googleAuthUrl" class="google-button">google</a>
</template>

<script>
const redirect_url = "http://localhost:8080/login/google";
export default {
  computed: {
    googleAuthUrl() {
      const data = {
        client_id:
          "236514718177-sd3k34i3ea9pi1q6442c87u7j4r9mri8.apps.googleusercontent.com",
        redirect_uri: redirect_url,
        scope: [
          "https://www.googleapis.com/auth/userinfo.email",
          "https://www.googleapis.com/auth/userinfo.profile"
        ].join(" "), // space seperated string
        response_type: "code",
        access_type: "offline",
        prompt: "consent"
      };

      const params = new URLSearchParams(data);
      return `https://accounts.google.com/o/oauth2/v2/auth?${params.toString()}`;
    }
  }
};
</script>

<style></style>

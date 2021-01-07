const axios = require("axios");
const { googleId, googleSecret } = require("../../config");

async function getAccessTokenFromCode(code) {
  const { data } = await axios.post(`https://oauth2.googleapis.com/token`, {
    client_id: googleId,
    client_secret: googleSecret,
    redirect_uri: "http://localhost:8080/login/google",
    grant_type: "authorization_code",
    code,
  });

  return data.access_token;
}

async function getUserInfo(accesstoken) {
  const { data } = await axios({
    url: "https://www.googleapis.com/oauth2/v2/userinfo",
    method: "get",
    headers: {
      Authorization: `Bearer ${accesstoken}`,
    },
  });
  console.log(data); // { id, email, given_name, family_name }
  return data;
}

module.exports = {
  getAccessTokenFromCode,
  getUserInfo,
};

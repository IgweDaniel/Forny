const { success, serverError } = require("../../services/response");
const { encode } = require("../../services/jwt");
const { User } = require("../users/model");
const {
  getAccessTokenFromCode,
  getUserInfo,
} = require("../../services/google");

const login = async ({ user }, res) => {
  const token = await encode(user.id);
  return success(res)({ access_token: token, user: user.show() });
};

const google = async ({ body: { code } }, res) => {
  try {
    const google_acess_token = await getAccessTokenFromCode(code),
      { email, name } = await getUserInfo(google_acess_token);
    // Generate random password for user
    const user = await User.create({
        email,
        password: "<generatedpassword>",
        name,
      }),
      token = await encode(user.id);
    console.log(token);
    return success(res, 201)({ access_token: token, user: user.show() });
  } catch (error) {
    // console.log(error.response.data);
    console.log(error.message);
    if (error.code == "E11000") {
      return res.status(400).json({ data: null, error: "Duplicate Email" });
    }

    return serverError(res);
  }
};

module.exports = { login, google };

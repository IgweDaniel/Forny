import axios from "axios";

/**User */
export async function loginUserWithGoogle() {}

export async function loginUser(email, password) {
  try {
    const { data } = await axios.post("auth/", "", {
      auth: {
        username: email,
        password: password
      }
    });
    return { error: null, data };
  } catch (error) {
    return { error: error.response, data: null };
  }
}

export async function registerUser(name, email, password) {
  try {
    const { data } = await axios.post("/users", {
      name,
      email,
      password
    });

    return { error: null, data };
  } catch (error) {
    return { error, data: null };
  }
}

export async function updateProfile() {}

export async function getMe() {}

/**Forms */
export async function createAForm(name) {
  try {
    const { data } = await axios.post("/forms", {
      name
    });
    return { error: null, data: data.form };
  } catch (error) {
    console.log({ error });
    return { error, data: null };
  }
}
export async function getMyForms() {
  try {
    const { data } = await axios.get(`forms/`);
    return { error: null, data };
  } catch (error) {
    console.log({ error });
    return { error, data: null };
  }
}

export async function getForm(id) {
  try {
    const { data } = await axios.get(`forms/${id}`);
    return { error: null, data: data.form };
  } catch (error) {
    console.log({ error });
    return { error, data: null };
  }
}
export async function getFormEntries(id, limit, skip) {
  console.log({ limit, skip });
  try {
    const { data } = await axios.get(`forms/${id}/entries`);
    return { error: null, data: data.submissions };
  } catch (error) {
    console.log({ error });
    return { error, data: null };
  }
}

export async function updateForm(id, update) {
  try {
    const { data } = await axios.patch(`forms/${id}`, {
      ...update
    });
    return { error: null, data: data.form };
  } catch (error) {
    return { error, data: null };
  }
}

export async function deleteForm(id) {
  try {
    const { data } = await axios.delete(`forms/${id}`);
    return { error: null, data: data.form };
  } catch (error) {
    return { error, data: null };
  }
}

/**Plans */

export async function listPlans() {
  try {
    const { data } = await axios.get(`billing/plans`);
    return { error: null, data: data };
  } catch (error) {
    return { error, data: null };
  }
}
export async function upgradePlan(planId, cardToken = null) {
  try {
    const { data } = await axios.post(`billing`, {
      cardToken,
      planId
    });
    return { error: null, data: data };
  } catch (error) {
    return { error, data: null };
  }
}

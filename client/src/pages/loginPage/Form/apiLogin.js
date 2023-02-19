import { AUTH_URL } from "constants/url";
import { useDispatch } from "react-redux";

export const register = async (values, onSubmitProps, func) => {
  try {
    const formData = new FormData();
    for (let value in values) {
      formData.append(value, values[value]);
    }
    formData.append("picPath", values.picture.name);
    const savedUserResp = await fetch(AUTH_URL + "/register", {
      method: "POST",
      body: formData,
    });
    const savedUser = await savedUserResp.json();
    onSubmitProps.resetForm();
    if (savedUser) {
      func("login");
    }
  } catch (e) {
    alert(e.message);
  }
};

export const login = async (values, onSubmitProps) => {
  try {
    const loggedInUserResp = await fetch(AUTH_URL + "/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    const loggedInUser = await loggedInUserResp.json();
    onSubmitProps.resetForm();
    return loggedInUser;
  } catch (e) {
    alert(e);
  }
};

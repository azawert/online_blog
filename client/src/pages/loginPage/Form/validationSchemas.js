import * as yup from "yup";
export const registerSchema = yup.object().shape({
  firstName: yup.string().required("Name is required"),
  lastName: yup.string().required("Last name is required"),
  email: yup.string().required("Email required").email("enter valid mail"),
  occupation: yup.string().required("Occupation is required"),
  location: yup.string().required("Location is required"),
  picture: yup.string().required("Your profile pic is required"),
});

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .matches(
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    )
    .required("Enter valid email"),
  password: yup.string().min(5).required("Enter password"),
});

import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
    userName: Yup.string().email("Invalid email").required("Required"),
    password: Yup.string().required("Required").min(2 , "Too Short").max(12 , "Too Long"),
  });

export const ValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  lastName: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  userName: Yup.string().email("Invalid email").required("Required"),
  password: Yup.string().required("Required").min(2 , "Too Short").max(12 , "Too Long"),
});

import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

function Registration() {
  const initialValues = {
    username: "",
    password: "",
    email: "",
  };

  const validationSchema = Yup.object().shape({
    username: Yup.string().min(3).max(15).required(),
    password: Yup.string().min(4).max(20).required(),
    email: Yup.string()
      .email("L'email doit être valid")
      .max(255)
      .required("L'email est requis"),
  });

  const onSubmit = (data) => {
    axios
      .post("https://eleves.herokuapp.com/auth", data)

      .then((error) => {
        console.log(error.data);
        alert(error.data.error);
      });
  };

  return (
    <div className="formContainerregistrationglobal">
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={validationSchema}
      >
        <Form className="formContainerregistration">
          <label>Username: </label>
          <ErrorMessage className="spanform" name="username" component="span" />
          <Field
            autocomplete="off"
            id="username"
            className="inputCreatePost"
            name="username"
            placeholder="(Ex. John123...)"
          />
          <label>Password: </label>
          <ErrorMessage className="spanform" name="password" component="span" />
          <Field
            autocomplete="off"
            type="password"
            id="password"
            className="inputCreatePost"
            name="password"
            placeholder="Votre mots de passe..."
          />
          <label>email: </label>
          <ErrorMessage className="spanform" name="email" component="span" />
          <Field
            autocomplete="off"
            id="email"
            className="inputCreatePost"
            name="email"
            placeholder="(John@groupomania.com...)"
          />
          <button type="submit"> Enregistrer</button>
        </Form>
      </Formik>
    </div>
  );
}

export default Registration;

import React, { useContext, useState } from "react";
import { useForm } from "../../shared/hooks/form-hook";
import { useHttpClient } from "../../shared/hooks/http-hook";
import { AuthContext } from "../../shared/context/auth-context";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validate";
import Button from "../../shared/components/Form/Button";
import Input from "../../shared/components/Form/Input";
import Card from "../../shared/components/UIelements/Card";
import ErrorModal from "../../shared/components/UIelements/ErrorModal";
import Loader from "../../shared/components/UIelements/Loader";
import "./Auth.css";

const Auth = () => {
  const auth = useContext(AuthContext);
  const [authMod, setAuthMod] = useState(true);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();

  const [formState, inputHandler, setFormData] = useForm(
    {
      email: {
        value: "",
        isValid: false,
      },

      password: {
        value: "",
        isValid: false,
      },
    },
    false
  );

  const switchMode = () => {
    // Login
    if (!authMod) {
      setFormData(
        {
          ...formState.inputs,
          name: undefined,
        },
        formState.inputs.email.isValid && formState.inputs.password.isValid
      );
      // Register
    } else {
      setFormData(
        {
          ...formState.inputs,
          name: {
            value: "",
            isValid: false,
          },
        },
        false
      );
    }
    setAuthMod((prevMode) => !prevMode);
  };

  const AuthSubmitHandler = async (event) => {
    event.preventDefault();

    if (authMod) {
      try {
        const responseData = await sendRequest(
          "http://localhost:8000/api/users/login",
          "POST",
          JSON.stringify({
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );
        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    } else {
      try {
        const responseData = await sendRequest(
          "http://localhost:8000/api/users/signup",
          "POST",
          JSON.stringify({
            name: formState.inputs.name.value,
            email: formState.inputs.email.value,
            password: formState.inputs.password.value,
          }),
          {
            "Content-Type": "application/json",
          }
        );

        auth.login(responseData.userId, responseData.token);
      } catch (err) {}
    }
  };

  return (
    <div className="form_div">
      <ErrorModal error={error} onClear={clearError} />
      <Card className="form_card">
        {isLoading && <Loader asOverlay />}
        <h2>{authMod ? "Prijavi se" : "Registruj se "}</h2>
        <hr />
        <form className="auth_form" onSubmit={AuthSubmitHandler}>
          {!authMod && (
            <Input
              element="input"
              id="name"
              type="text"
              label="Ime"
              validators={[VALIDATOR_REQUIRE()]}
              errorText="Unesite ispravno ime!"
              onInput={inputHandler}
            />
          )}
          <Input
            element="input"
            id="email"
            type="email"
            label="E-Mail"
            validators={[VALIDATOR_EMAIL()]}
            errorText="Unesite ispravan mejl!"
            onInput={inputHandler}
          />
          <Input
            element="input"
            id="password"
            type="password"
            label="Password"
            validators={[VALIDATOR_MINLENGTH(6)]}
            errorText="Unesite ispravnu sifru!"
            onInput={inputHandler}
          />

          <div style={{ display: "flex", gap: "1em", alignItems: "center" }}>
            <Button type="submit" disabled={!formState.isValid}>
              {authMod ? "Prijavi se" : "Registruj se "}
            </Button>
            <a className="switchbtn" onClick={switchMode}>
              {authMod ? "Registruj se" : "Prijavi se"}
            </a>
          </div>
        </form>
      </Card>
    </div>
  );
};

export default Auth;

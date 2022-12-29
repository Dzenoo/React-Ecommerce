import React, { useState } from "react";
import { useForm } from "../../shared/hooks/form-hook";
import {
  VALIDATOR_EMAIL,
  VALIDATOR_MINLENGTH,
  VALIDATOR_REQUIRE,
} from "../../shared/util/validate";
import { AuthActions } from "../../shared/redux/auth-slice";
import Button from "../../shared/components/Form/Button";
import Input from "../../shared/components/Form/Input";
import Card from "../../shared/components/UIelements/Card";
import "./Auth.css";
import { useDispatch } from "react-redux";

const Auth = () => {
  const [authMod, setAuthMod] = useState(false);
  const dispatch = useDispatch();

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

  const AuthSubmitHandler = (event) => {
    event.preventDefault();
    dispatch(AuthActions.login());
    console.log(formState.inputs);
  };

  return (
    <Card className="form_card">
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
  );
};

export default Auth;

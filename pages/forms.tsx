import { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";

interface LoginForm {
  username: string;
  password: string;
  email: string;
}

export default function forms() {
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    reset,
    watch,
    formState: { errors },
  } = useForm<LoginForm>({ mode: "onChange" });
  const [globalMessage, setGlobalMessage] = useState<string>("");

  const onValid = (data: LoginForm) => {
    reset();
    setGlobalMessage("Thank you");
  };
  const onInvalid = (errors: FieldErrors) => {
    setGlobalMessage("");
  };

  return (
    <form onSubmit={handleSubmit(onValid, onInvalid)}>
      <div>
        <span>Name:</span>
        <input
          {...register("username", {
            required: "Please write down your username",
          })}
          type="text"
          placeholder="Username"
          style={{ border: "1px solid grey" }}
        />
        <span>{errors.username?.message}</span>
      </div>
      <div>
        <span>Email:</span>
        <input
          {...register("email", {
            required: "Please write down your email",
            validate: {
              isNaver: (value) =>
                value.includes("@naver.com") || "@naver.com is required",
            },
          })}
          type="email"
          placeholder="Email"
          style={{ border: "1px solid grey" }}
        />
        <span>{errors.email?.message}</span>
      </div>
      <div>
        <span>Password:</span>
        <input
          {...register("password", {
            required: "Please write down your password",
            minLength: {
              message: "The password has to be more than 10 chars",
              value: 10,
            },
          })}
          type="password"
          placeholder="Password"
          style={{ border: "1px solid grey" }}
        />
        <span>{errors.password?.message}</span>
      </div>
      <input
        type="submit"
        value="create account"
        style={{
          border: "2px solid black",
          backgroundColor: "lightGrey",
          cursor: "pointer",
        }}
      />
      <div>
        <span>{globalMessage}</span>
      </div>
    </form>
  );
}

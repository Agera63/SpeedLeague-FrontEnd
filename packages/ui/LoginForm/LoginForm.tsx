"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import styles from "./LoginForm.module.css";
import { useRouter } from "next/navigation";
import { AuthService, LoginResponseModel } from "../../api";

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    //check if the username and passowrd field are filled before changing the error
    if (form.username === "" || form.password === "") {
      setError("Please fill in the blank field!");
      return;
    }

    try {
      setError("");

      const response: LoginResponseModel = await AuthService.login(form);

      if (!response.accessToken || !response.userName) {
        setError("Incorrect username or password!");
        throw new Error(
          "Login succeeded but accessToken or userName was missing from the response",
        );
      }

      // Store the token so future requests can use it
      localStorage.setItem("token", response.accessToken);
      localStorage.setItem("username", response.userName);

      //Push back to "main page"
      router.push("/");
    } catch (err) {
      console.error("Network or unexpected error:", err);
      setError("Network or unexpected error!");
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form className={styles.formOutline} onSubmit={submitForm}>
      <h4>Login</h4>

      {/* Username field */}
      <div className={styles.divFieldStyle}>
        <p className={styles.loginField}>Username</p>
        <input
          className={styles.loginInputFields}
          type="text"
          name="username"
          onChange={handleChange}
          placeholder="Username"
        />
      </div>

      {/* Password field */}
      <div className={styles.divFieldStyle}>
        <p className={styles.loginField}>Password</p>

        <div className={styles.inputContainer}>
          <input
            onChange={handleChange}
            className={styles.loginInputFields}
            type={showPassword ? "text" : "password"}
            name="password"
            placeholder="Password"
          />
          {/**Eye field */}
          <button
            type="button"
            className={styles.iconWrapper}
            onClick={togglePasswordVisibility}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            <Image
              src={
                showPassword
                  ? "/svg/hide_password.svg"
                  : "/svg/show_password.svg"
              }
              width={24}
              height={24}
              className={styles.passwordToggleIcon}
              alt="Show password btn"
            />
          </button>
        </div>
      </div>
      <div className={styles.divSpliting}>
        <div className={styles.loginDiv}>
          <button className={styles.formSubmissionBtn} type="submit">
            <p>Login</p>
          </button>
        </div>
        <div className={styles.accountDiv}>
          <p>No account ?</p>
          <Link href={"/signup"}>
            <p className={styles.creationText}>Create One.</p>
          </Link>
        </div>
      </div>

      <Link href={"/"} className={styles.backDiv}>
        <Image src={"/svg/red_back.svg"} width={24} height={24} alt="Arrow" />
        <p>Back</p>
      </Link>

      <p className={styles.errorMsg}>{error}</p>
    </form>
  );
}

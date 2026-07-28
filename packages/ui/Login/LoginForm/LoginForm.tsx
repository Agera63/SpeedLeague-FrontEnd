"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import styles from "@/../packages/ui/Login/LoginForm/LoginForm.module.css";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e) => {
    e.preventDefault();

    try {
      setError("");
      const response = await fetch("http://localhost:8080/api/Auth/Login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userName: form.username,
          password: form.password,
        }),
      });

      if (!response.ok) {
        //check if the username and passowrd field are filled before changing the error
        if (form.username === "" || form.password === "") {
          setError("Please fill in the blank field!");
        } else {
          const errorData = await response.json().catch(() => null);
          console.error("Login failed:", response.status, errorData);
          setError("Incorrect username or password!");
        }
        return;
      }

      // Store the token so future requests can use it
      const data = await response.json();
      localStorage.setItem("token", data.accessToken);

      //Push back to "main page"
      router.push("/");
    } catch (error) {
      console.error("Network or unexpected error:", error);
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
          <div
            className={styles.iconWrapper}
            onClick={togglePasswordVisibility}
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
          </div>
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

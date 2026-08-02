"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

import styles from "./SignupForm.module.css";

import { ApiError, UserService } from "../../api";

export default function SignupForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    username: "",
    password: "",
    confirmpass: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const submitForm = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (form.username === "" || form.password === "") {
      setError("Please fill in the blank field!");
      return;
    }

    //Makes sure that the password are identical
    if (form.password !== form.confirmpass) {
      setError("Passwords do not match!");
      return;
    }

    //Makes sure the passwords are not empty
    if (form.password.length === 0 && form.confirmpass.length === 0) {
      setError("Please enter a valid password.");
      return;
    }

    //Makes sure the username is longer then 2 characters
    if (form.username.length < 2) {
      setError("Usernames must exceed 2 characters!");
      return;
    }

    //Makes sure the username is not longer then 30 characters
    if (form.username.length > 31) {
      setError("Usernames cannot exceed 30 characters!");
      return;
    }

    try {
      setError("");
      const response = await UserService.createUser({
        username: form.username,
        password: form.password,
        role: 1,
      });

      //Push back to "main page"
      router.push("/login");
    } catch (error) {
      if (error instanceof ApiError) {
        setError(error.body?.message);
      } else {
        console.error("Network or unexpected error:", error);
        setError("Network or unexpected error!");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form className={styles.formOutline} onSubmit={submitForm}>
      <h4>Sign Up</h4>

      {/* Username field */}
      <div className={styles.divFieldStyle}>
        <p className={styles.signupField}>Username</p>
        <input
          className={styles.signupInputFields}
          type="text"
          name="username"
          onChange={handleChange}
          placeholder="Username"
        />
      </div>

      {/* Password field */}
      <div className={styles.divFieldStyle}>
        <p className={styles.signupField}>Password</p>

        <div className={styles.inputContainer}>
          <input
            onChange={handleChange}
            className={styles.signupInputFields}
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

      {/* Confirm password field */}
      <div className={styles.divFieldStyle}>
        <p className={styles.signupField}>Confirm Password</p>

        <div className={styles.inputContainer}>
          <input
            onChange={handleChange}
            className={styles.signupInputFields}
            type={showPassword ? "text" : "password"}
            name="confirmpass"
            placeholder="Confirm password"
          />
        </div>
      </div>

      <div className={styles.divSpliting}>
        <div className={styles.signupDiv}>
          <button className={styles.formSubmissionBtn} type="submit">
            <p>Sign up</p>
          </button>
        </div>
        <div className={styles.accountDiv}>
          <p>Have an account ?</p>
          <Link href={"/login"}>
            <p className={styles.creationText}>Login</p>
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

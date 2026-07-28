"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";

import styles from "@/../packages/ui/Login/LoginForm/LoginForm.module.css";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();

  const [showPassword, setShowPassword] = useState(false);
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

  const submitForm = () => {
    //...
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  return (
    <form className={styles.formOutline}>
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
          <button onClick={submitForm} className={styles.formSubmissionBtn}>
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
    </form>
  );
}

import SignupForm from "@/../packages/ui/Login/SignupForm/SignupForm";
import styles from "./page.module.css";

export default function Signup() {
  return (
    <div className={styles.divStyle}>
      <div className={styles.loginDiv}>
        <SignupForm />
      </div>
    </div>
  );
}

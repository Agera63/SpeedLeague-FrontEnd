import SignupForm from "../../../../packages/ui/SignupForm/SignupForm";
import styles from "./page.module.css";

export default function Signup() {
  return (
    <div className={styles.divStyle}>
      <div className={styles.signupDiv}>
        <SignupForm />
      </div>
    </div>
  );
}

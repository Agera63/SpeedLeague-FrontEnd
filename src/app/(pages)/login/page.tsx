import LoginForm from "../../../../packages/ui/Login/LoginForm/LoginForm";
import styles from "./page.module.css";

export default function Login() {
  return (
    <div className={styles.divStyle}>
      <div className={styles.loginDiv}>
        <LoginForm />
      </div>
    </div>
  );
}

"use client";

import Image from "next/image";
import Link from "next/link";

import styles from "./navbar.module.css";

export default function Navbar({ pageName }: { pageName: string }) {
  return (
    <div>
      <ul className={styles.layoutUl}>
        <li>{pageName}</li>
        <li className={styles.gameName}>Speed League</li>
        <li>
          <div>
            {localStorage?.getItem("token") !== null ? (
              <Link href={"/"} className={styles.loggedUser}>
                <Image
                  src="/svg/user_icon.svg"
                  alt="Logged in user icon"
                  width={40}
                  height={40}
                />
                <p>{localStorage.getItem("username")}</p>
              </Link>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
}

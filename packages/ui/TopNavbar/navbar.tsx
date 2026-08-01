"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./navbar.module.css";

export default function Navbar({ pageName }: { pageName: string }) {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setToken(localStorage.getItem("token"));
    setUsername(localStorage.getItem("username"));
    setHasMounted(true);
  }, []);

  const onLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    window.location.reload();
  };

  return (
    <div>
      <ul className={styles.layoutUl}>
        <li>{pageName}</li>
        <li className={styles.gameName}>Speed League</li>
        <li>
          <div>
            {!hasMounted ? (
              <div className={styles.authPlaceholder} />
            ) : token !== null ? (
              <div className={styles.dropdown}>
                <button className={styles.loggedUser}>
                  <Image
                    src="/svg/user_icon.svg"
                    alt="Logged in user icon"
                    width={40}
                    height={40}
                  />
                  <p>{username}</p>
                </button>

                <ul className={styles.menu}>
                  <li>
                    <Link href={"/"} className={styles.dropdownLink}>
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link href={"/tracks"} className={styles.dropdownLink}>
                      Tracks
                    </Link>
                  </li>
                  <li className={styles.logout} onClick={onLogout}>
                    <button onClick={onLogout}>Logout</button>
                  </li>
                </ul>
              </div>
            ) : (
              <Link href="/login">Login</Link>
            )}
          </div>
        </li>
      </ul>
    </div>
  );
}

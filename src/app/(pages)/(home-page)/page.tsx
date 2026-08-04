"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

import styles from "./page.module.css";

export default function Home() {
  const [os, setOs] = useState<"windows" | "mac" | "other">("other");

  useEffect(() => {
    const ua = navigator.userAgent;

    //checks the os of the user
    if (ua.includes("Win")) setOs("windows");
    if (ua.includes("Mac")) setOs("mac");
  }, []);

  return (
    <div className={styles.mainHeader}>
      <div className={styles.heroSection}>
        <h1>Speed League</h1>
        <Link href={"https://github.com/Agera63"}>
          <h4>Created by Agera63</h4>
        </Link>
        <p>Every lap counts!</p>
      </div>

      <div className={styles.trackContainer}>
        {/* Tracks */}
        <div className={styles.boxContainer}>
          <h4>What is Speed League?</h4>
          <p>
            Speed League is a single-player time trial racing game where you
            choose a car and a track, then race against the clock to set your
            best lap time. The timer starts the moment you hit the first
            checkpoint, and every lap is automatically saved to a database as
            you complete it. Each track has its own leaderboard, so you can
            track your progress over time and see how your best runs compare.
            It's a simple, focused racing experience built around chasing
            personal bests and clean lap times. Lastly but not least, go chase
            the clock!
          </p>
          <div>
            <Link className={styles.trackBtn} href={"/tracks"}>
              Tracks
            </Link>
            <a
              className={styles.trackBtn}
              href={
                os === "windows"
                  ? "https://github.com/Agera63/SpeedLeague-Game/releases/download/v0.1.0-beta.1/SpeedLeague-v0.1.0-beta.1-Windows.zip"
                  : "https://github.com/Agera63/SpeedLeague-Game/releases/download/v0.1.0-beta.1/SpeedLeague-v0.1.0-beta.1-Mac.zip"
              }
              download={
                os === "other"
                  ? undefined
                  : os === "windows"
                    ? "SpeedLeague-Windows"
                    : "SpeedLeague-Mac"
              }
              aria-disabled={os === "other"}
              onClick={(e) => {
                if (os === "other") e.preventDefault();
              }}
              style={
                os === "other"
                  ? { pointerEvents: "none", opacity: 0.5 }
                  : undefined
              }
            >
              Download
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

import Link from "next/link";

import styles from "./not-found.module.css";

export default function NotFound() {
  return (
    <div className={styles.wrapper}>
      <div className={styles.content}>
        <p className={styles.eyebrow}>Lap Invalid</p>
        <h1 className={styles.heading}>Off Track</h1>
        <div className={styles.laneMarker} aria-hidden="true" />
        <p className={styles.subtext}>
          This route doesn&apos;t exist on any circuit we know of. You veered
          off the racing line somewhere — let&apos;s get you back on it.
        </p>

        <div className={styles.actions}>
          <Link className={styles.btnFilled} href="/">
            Back to Home
          </Link>
          <Link className={styles.btnOutline} href="/tracks">
            Browse Tracks
          </Link>
        </div>
      </div>
    </div>
  );
}

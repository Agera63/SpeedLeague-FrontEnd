import TrackCards from "@/../packages/ui/TrackCards/trackCards";

import styles from "./page.module.css";

export default function Track() {
  return (
    <div className={styles.trackDiv}>
      <TrackCards />
    </div>
  );
}

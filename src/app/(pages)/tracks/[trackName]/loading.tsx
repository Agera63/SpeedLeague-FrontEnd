import styles from "./loading.module.css";

export default function Loading() {
  return (
    <div className={styles.globalDiv}>
      <div className={styles.navigationText}>
        <span className={`${styles.skeleton} ${styles.navSkeleton}`} />
      </div>

      <div className={styles.contentDiv}>
        <div className={styles.leftDiv}>
          <span className={`${styles.skeleton} ${styles.titleSkeleton}`} />
          <span className={`${styles.skeleton} ${styles.locationSkeleton}`} />
          <span className={`${styles.skeleton} ${styles.imageSkeleton}`} />
        </div>

        <div className={styles.rightDiv}>
          <span className={`${styles.skeleton} ${styles.recordsSkeleton}`} />

          <div className={styles.tableSkeleton}>
            {Array.from({ length: 10 }).map((_, i) => (
              <span
                key={i}
                className={`${styles.skeleton} ${styles.rowSkeleton}`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

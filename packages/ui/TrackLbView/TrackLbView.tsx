"use client";

import Link from "next/link";
import Image from "next/image";
import LbTable from "../LeaderboardTable/LeaderboardTable";

import styles from "./TrackLbView.module.css";
import { TrackResponseDTO } from "../../api";

export default function TrackLbView({
  selectedTrack,
}: {
  selectedTrack: TrackResponseDTO;
}) {
  return (
    <div className={styles.globalDiv}>
      <div className={styles.navigationText}>
        <Link href="/tracks">
          <p className={styles.navTrack}>Tracks</p>
        </Link>
        <Image
          src={"/svg/right_arrow.svg"}
          alt="Red arrow"
          width={24}
          height={24}
        />
        <p className={styles.navTrackName}>{selectedTrack.name}</p>
      </div>

      <div className={styles.contentDiv}>
        <div className={styles.leftDiv}>
          <p className={styles.trackTitle}>{selectedTrack.name}</p>
          <div>
            <p className={styles.locationText}>{selectedTrack.country}</p>
            <Image
              src={`/svg/${selectedTrack.name}.svg`}
              alt="Red arrow"
              width={500}
              height={500}
              loading="eager"
            />
          </div>
        </div>
        <div className={styles.rightDiv}>
          <p className={styles.trackRecords}>Track Records</p>
          <LbTable selectedTrack={selectedTrack} />
        </div>
      </div>
    </div>
  );
}

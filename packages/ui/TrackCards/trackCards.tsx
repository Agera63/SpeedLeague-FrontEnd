"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./trackCards.module.css";
import { TrackResponseDTO, TrackService } from "../../api";

const SKELETON_COUNT = 6;

export default function TrackCards() {
  const [trackList, setTrackList] = useState<TrackResponseDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function getTracks() {
      try {
        const data = await TrackService.getAllTracks();
        setTrackList(data);
      } catch (err) {
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    }

    getTracks();
  }, []);

  if (isLoading) {
    return (
      <ul className={`${styles.accordion} ${styles.accordionLoading}`}>
        {Array.from({ length: SKELETON_COUNT }).map((_, i) => (
          <li key={i} className={styles.skeletonLi}>
            <span className={styles.cardSkeleton} />
          </li>
        ))}
      </ul>
    );
  }

  return (
    <ul className={styles.accordion}>
      {trackList.map((track) => (
        <li key={track.trackId}>
          <Link href={`/tracks/${track.name}`} className={styles.link}>
            <Image
              className={styles.img}
              src={`/jpg/${track.name}.jpg`}
              alt={`${track.name} track background`}
              fill
              sizes="(max-width: 768px) 33vw, 260px"
              loading="eager"
            />
            <div className={styles.content}>
              <span>
                <h2>{track.name}</h2>
                <p>{track.country}</p>
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

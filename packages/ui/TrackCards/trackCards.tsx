"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./trackCards.module.css";
import { TrackResponseDTO, TrackService } from "../../api";

export default function TrackCards() {
  const [trackList, setTrackList] = useState<TrackResponseDTO[]>([]);

  useEffect(() => {
    async function getTracks() {
      const data = await TrackService.getAllTracks();
      setTrackList(data);
    }

    getTracks().catch(console.error);
  }, []);

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

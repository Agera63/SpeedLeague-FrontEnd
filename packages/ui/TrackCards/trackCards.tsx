"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./trackCards.module.css";

type Track = {
  trackId: string;
  name: string;
  times: [];
};

export default function TrackCards() {
  const [trackList, setTrackList] = useState<Track[]>([]);

  useEffect(() => {
    async function getTracks() {
      const response = await fetch("http://localhost:8080/api/Track", {
        headers: {
          Authorization: "Bearer YOUR_SECRET_TOKEN",
        },
      });

      if (!response.ok) {
        throw new Error(`Request failed: ${response.status}`);
      }

      const data: Track[] = await response.json();
      setTrackList(data);
    }

    getTracks().catch(console.error);
  }, []);

  return (
    <ul className={styles.accordion}>
      {trackList.map((track) => (
        <li key={track.trackId}>
          <Link href={`/tracks/${track.trackId}`} className={styles.link}>
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
                <p>...</p>
              </span>
            </div>
          </Link>
        </li>
      ))}
    </ul>
  );
}

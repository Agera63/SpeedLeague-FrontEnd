"use client";

import { useEffect, useState } from "react";
import styles from "./LeaderboardTable.module.css";
import {
  CarService,
  TimeResponseDTO,
  TimeService,
  TrackResponseDTO,
  UserService,
} from "@/../packages/api";

import "@/../packages/api/setup";

export type RowInformation = {
  convertedTime: string;
  user: string;
  car: string;
  ranAt: string;
};

export default function LbTable({
  selectedTrack,
}: {
  selectedTrack: TrackResponseDTO;
}) {
  const [rowList, setRowList] = useState<RowInformation[]>([]);

  useEffect(() => {
    async function getTimes() {
      const timeData: TimeResponseDTO[] = await TimeService.getTimeByTrackId(
        selectedTrack.trackId,
      );

      if (timeData.length !== 0) {
        const rows = await Promise.all(
          timeData
            .filter((time) => time.carId && time.userId)
            .map(async (time) => {
              const car = await CarService.getCarById(time.carId!);
              const user = await UserService.getUserById(time.userId!);

              //checks if the user is logged in
              if (
                localStorage.getItem("username") &&
                localStorage.getItem("username") === user.username
              ) {
                //If the user is logged in and has a time, add (You) next to the username
                user.username = `${user.username} (You)`;
              }

              const newRow: RowInformation = {
                convertedTime: formatTime(time.timeMs),
                user: user.username,
                car: `${car.brand}, ${car.model}`,
                ranAt: formatDate(time.runAt),
              };

              setRowList((prev) => [...prev, newRow]);
            }),
        );
      }
    }

    getTimes().catch(console.error);
  }, [selectedTrack.trackId]);

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.rootTable}>
        <tbody>
          {rowList.length === 0 ? (
            <tr>
              <td className={styles.noAttemptMsg}>
                No time has been attempted yet!
              </td>
            </tr>
          ) : (
            rowList.map((row, index) => (
              <tr key={index} className={styles.rowContent}>
                <td className={styles.lbNum}>
                  <p>{index + 1}</p>
                </td>
                <td className={styles.time}>
                  <p>{row.convertedTime}</p>
                </td>
                <td className={styles.user}>
                  {/* Handles css color */}
                  {index === 0 ? (
                    <p className={styles.rankGold}>{row.user}</p>
                  ) : index === 1 ? (
                    <p className={styles.rankSilver}>{row.user}</p>
                  ) : index === 2 ? (
                    <p className={styles.rankBronze}>{row.user}</p>
                  ) : (
                    <p>{row.user}</p>
                  )}
                </td>
                <td className={styles.car}>
                  <p>{row.car}</p>
                </td>
                <td className={styles.date}>
                  <p>{row.ranAt}</p>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}

function formatTime(totalSeconds: number): string {
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);
  const milliseconds = Math.floor((totalSeconds % 1) * 1000);

  const pad = (num: number, length = 2) => String(num).padStart(length, "0");

  if (hours > 0) {
    return `${hours}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
  }

  return `${minutes}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

function formatDate(isoString: string): string {
  const date = new Date(isoString);
  return date.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

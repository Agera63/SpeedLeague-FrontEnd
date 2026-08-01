"use client";

import { useEffect, useState } from "react";
import styles from "./LeaderboardTable.module.css";
import loadingStyle from "./loading.module.css";
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    setIsLoading(true);
    setError("");
    setRowList([]);

    if (!localStorage.getItem("token")) {
      setError("Please log in to view times!");
      setIsLoading(false);
      return;
    }

    async function getTimes() {
      try {
        // Tries to talk to an API point
        const res = await fetch("http://localhost:8080/api/Auth/Validate", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        // If that reponse is 401, it means the token is invalid
        if (res.status === 401) {
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          return;
        }

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

                if (
                  localStorage.getItem("username") &&
                  localStorage.getItem("username") === user.username
                ) {
                  user.username = `${user.username} (You)`;
                }

                const newRow: RowInformation = {
                  convertedTime: formatTime(time.timeMs),
                  user: user.username,
                  car: `${car.brand}, ${car.model}`,
                  ranAt: formatDate(time.runAt),
                };

                return newRow;
              }),
          );

          setRowList(rows);
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load times.");
      } finally {
        setIsLoading(false);
      }
    }

    getTimes();
  }, [selectedTrack.trackId]);

  if (isLoading) {
    return (
      <div className={loadingStyle.tableSkeleton}>
        {Array.from({ length: 10 }).map((_, i) => (
          <span
            key={i}
            className={`${loadingStyle.skeleton} ${loadingStyle.rowSkeleton}`}
          />
        ))}
      </div>
    );
  }

  return (
    <div className={styles.tableWrapper}>
      <table className={styles.rootTable}>
        <tbody>
          {rowList.length === 0 ? (
            <tr>
              <td className={styles.noAttemptMsg}>
                {error || "No times recorded yet."}
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

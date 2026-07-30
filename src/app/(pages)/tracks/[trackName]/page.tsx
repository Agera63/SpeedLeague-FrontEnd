"use server";

import TrackLbView from "@/../packages/ui/TrackLbView/TrackLbView";
import { redirect } from "next/navigation";

import { TrackResponseDTO, TrackService } from "@/../packages/api";

export default async function TrackLbPage({
  params,
}: {
  params: Promise<{ trackName: string }>;
}) {
  const { trackName } = await params;

  const trackList = await TrackService.getAllTracks();

  let selectedTrack: TrackResponseDTO = {
    trackId: "",
    name: "",
    country: "",
  };

  const trackExists = trackList.some((t) => t.name === trackName);

  if (!trackExists) {
    redirect("/tracks");
  } else {
    trackList.map((track) => {
      if (track.name === trackName) {
        selectedTrack = track;
      }
    });
  }

  return <TrackLbView selectedTrack={selectedTrack} />;
}

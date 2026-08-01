"use server";

import TrackLbView from "@/../packages/ui/TrackLbView/TrackLbView";
import { redirect } from "next/navigation";
import { unstable_cache } from "next/cache";

import { TrackResponseDTO, TrackService } from "@/../packages/api";

// TrackService uses axios under the hood, not the native fetch API, so
// Next.js's built-in fetch caching doesn't apply here automatically.
// unstable_cache wraps any async function (axios calls, DB queries, etc.)
// and gives it the same caching + revalidation Next gives native fetch().
const getCachedTracks = unstable_cache(
  async () => TrackService.getAllTracks(),
  ["all-tracks"], // cache key
  {
    tags: ["tracks"], // lets you invalidate on demand with revalidateTag("tracks")
    revalidate: 300, // re-fetch at most every 5 minutes
  },
);

export default async function TrackLbPage({
  params,
}: {
  params: Promise<{ trackName: string }>;
}) {
  const { trackName } = await params;

  const trackList = await getCachedTracks();

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

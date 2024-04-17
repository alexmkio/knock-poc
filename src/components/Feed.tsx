"use client";
import { KnockProvider, KnockFeedProvider } from "@knocklabs/react";
import Notifications from "./Notifications";

export default function Feed() {
  return (
    <KnockProvider
      apiKey={process.env.NEXT_PUBLIC_KNOCK_PUBLIC_API_KEY as string}
      userId={"c51af454-5aa0-437e-8ce2-04fd9fa97403"}
    >
      <KnockFeedProvider
        feedId={process.env.NEXT_PUBLIC_KNOCK_FEED_CHANNEL_ID as string}
      >
        <Notifications />
      </KnockFeedProvider>
    </KnockProvider>
  );
}

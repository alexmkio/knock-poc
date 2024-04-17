import toast, { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { useKnockFeed } from "@knocklabs/react";

export default function Notifications() {
  const { feedClient } = useKnockFeed();

  useEffect(() => {
    // Show only notifications that have not been seen yet
    const onNotificationsReceived = ({ items }) => {
      console.log("items", items);
      // Whenever we receive a new notification from our real-time stream, show a toast
      // (note here that we can receive > 1 items in a batch)
      items.forEach((notification) => {
        console.log("notification", notification);
        if (!notification?.seen_at) {
          toast(notification.blocks[0].rendered, { id: notification.id });
        }
      });

      // Optionally, you may want to mark them as "seen" as well
      feedClient.markAsSeen(items);
    };

    // Receive all real-time notifications on our feed
    feedClient.on("items.received.realtime", onNotificationsReceived);

    // Cleanup
    return () =>
      feedClient.off("items.received.realtime", onNotificationsReceived);
  }, [feedClient]);

  return <Toaster />;
}

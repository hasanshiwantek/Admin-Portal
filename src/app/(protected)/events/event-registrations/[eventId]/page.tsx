"use client";

import { use } from "react";
import EventRegistrations from "@/components/events/EventRegistrations";

export default function Page({
  params,
}: {
  params: Promise<{ eventId: string }>;
}) {
  const { eventId } = use(params);

  return (
    <EventRegistrations
      eventId={eventId}
    />
  );
}
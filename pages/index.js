import React from "react";
import { getFeaturedEvents } from "../dummy_data";
import EventList from "../components/events/event-list";



export default function HomePage() {
 const featuredEvents = getFeaturedEvents()
  return (
    <div>
      <EventList events={featuredEvents}/>
    </div>
  );
}

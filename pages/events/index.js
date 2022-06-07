import React, { Fragment } from "react";
import { useRouter } from "next/router";

import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-search";

import { getAllEvents } from "../../dummy_data";

export default function EventsPage() {
  const router = useRouter();
  const events = getAllEvents();

  function findEventHandler(year, month) {
    const fullpath = `/events/${year}/${month}`
    router.push(fullpath)
  }
  return (
    <Fragment>
      <EventSearch onSearch={findEventHandler} />
      <EventList events={events} />
    </Fragment>
  );
}

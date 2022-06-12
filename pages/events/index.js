import React, { Fragment, useState } from "react";
import { useRouter } from "next/router";
// import useSWR from "swr";

import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-search";
import { getAllEvents } from "../../helper/api-util";

export default function EventsPage(props) {
  const router = useRouter();
  const { events } = props;

  function findEventHandler(year, month) {
    const fullpath = `/events/${year}/${month}`;
    router.push(fullpath);
  }
  return (
    <Fragment>
      <EventSearch onSearch={findEventHandler} />
      <EventList events={events} />
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const allEvents = await getAllEvents();
  return {
    props: {
      events: allEvents,
    },
    revalidate: 60,
  };
}

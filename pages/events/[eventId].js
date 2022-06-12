import { Fragment } from "react";
import EventSummary from "../../components/event-detail/event-summary";
import EventLogistics from "../../components/event-detail/event-logistics";
import EventContent from "../../components/event-detail/event-content";
// import ErrorAlert from "../../components/ui/error-alert";
// import Button from "../../components/ui/button";

import { getEventById, getFeaturedEvents } from "../../helper/api-util";

export default function EventPage(props) {
  const { event } = props;
  console.log(event);

  if (!event) {
    return (
      <p className="center">loaading.....</p>
      // <Fragment>
      //   <ErrorAlert>
      //     <p className="center">No Event Found</p>
      //   </ErrorAlert>
      //   <div className="center">
      //     <Button link="/events">Show All Events</Button>
      //   </div>
      // </Fragment>
    );
  }
  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imgAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
}

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);
  console.log(event);

  return {
    props: {
      event: event,
    },
    revalidate: 20,
  };
}

export async function getStaticPaths() {
  const featuredEvent = await getFeaturedEvents();
  const paths = featuredEvent.map((event) => ({
    params: {
      eventId: event.id,
    },
  }));

  console.log(paths);
  return {
    paths: ["/events/e1", { params: { eventId: "e2" } }],
    fallback: true,
  };
}

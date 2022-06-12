import React from "react";
// import { getFeaturedEvents } from "../dummy_data";
import EventList from "../components/events/event-list";
import { getFeaturedEvents } from "../helper/api-util";

export default function HomePage(props) {
  //  const featuredEvents = getFeaturedEvents()
  const { featuredEvents } = props;
  return (
    <div>
      <EventList events={featuredEvents} />
    </div>
  );
}

export async function getStaticProps(context) {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      featuredEvents: featuredEvents,
    },
    revalidate: 10,
  };
}

// const response = await fetch(
//   'https://nextjs-course-c81cc-default-rtdb.firebaseio.com/sales.json'
// );
// const data = await response.json();

// const transformedSales = [];

// for (const key in data) {
//   transformedSales.push({
//     id: key,
//     username: data[key].username,
//     volume: data[key].volume,
//   });
// }

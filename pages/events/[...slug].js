// import { useRouter } from "next/router";
// import { Fragment, useEffect, useState } from "react";
// import useSWR from "swr";

// import EventList from "../../components/events/event-list";
// import ResultsTitle from "../../components/events/results-title";
// import ErrorAlert from "../../components/ui/error-alert";
// import Button from "../../components/ui/button";

// import { getFilteredEvents } from "../../dummy_data";
// import { getAllEvents } from "../../helper/api-util";
// import { getAllEvents } from "../../dummy_data";

// export default function EventInSpecific() {
//   const router = useRouter();
//   const [loadedEvents, setLoadedEvents] = useState();

//   const filterData = router.query.slug;

//   const fetch = async () => {
//     const response = await fetch(
//       "https://next-js-event-7fd17-default-rtdb.asia-southeast1.firebasedatabase.app/events.json"
//     );
//     const data = await response.json();

//     console.log("ini data", data);

// if (data) {
//   const events = [];

//   for (const key in data) {
//     events.push({
//       id: key,
//       ...data[key],
//     });
//   }
//   console.log("ini event ", events);
// setLoadedEvents(data);
//   console.log(loadedEvents);
// }

// setLoadedEvents(data);
// };
// const { data, error } = useSWR(
//   "https://next-js-event-7fd17-default-rtdb.asia-southeast1.firebasedatabase.app/events.json"
// );

// useEffect(() => {
//   fetch();
// }, []);

// console.log("ini apa", loadedEvents);

// useEffect(() => {
//   if (error) {
//     console.error(error);
//   }

//   if (data) {
//     const events = [];

//     for (key in data) {
//       events.push({
//         id: key,
//         ...data[key],
//       });
//     }

//     setLoadedEvents(events);

//   }
// }, [data]);

// if (!loadedEvents) {
//   return <p className="center">loading...</p>;
// }

// const filteredYear = filterData[0];
// const filteredMonth = filterData[1];

// const numYear = +filteredYear;
// const numMonth = +filteredMonth;

// const date = new Date(numYear, numMonth - 1);

// if (
//   isNaN(numYear) ||
//   isNaN(numMonth) ||
//   numYear > 2030 ||
//   numYear < 2021 ||
//   numMonth < 1 ||
//   numMonth > 12
// ) {
//   return (
//     <Fragment>
//       <ErrorAlert>
//         <p className="center">Invalid Filter</p>
//       </ErrorAlert>

//       <div className="center">
//         <Button link="/events">Show All Events</Button>
//       </div>
//     </Fragment>
//   );
// }

// const filteredEvents = loadedEvents.filter((event) => {
//   const eventDate = new Date(event.date);
//   return (
//     eventDate.getFullYear() === numYear &&
//     eventDate.getMonth() === numMonth - 1
//   );
// });

// if (!filteredEvents || filteredEvents.length === 0) {
//   return (
//     <Fragment>
//       <ErrorAlert>
//         <p className="center">No Events Found</p>
//       </ErrorAlert>
//       <div className="center">
//         <Button link="/events">Show All Events</Button>
//       </div>
//     </Fragment>
//   );
// }

//   return (
//     <Fragment>
//       {/* <ResultsTitle date={date} /> */}
//       <EventList events={loadedEvents} />
//     </Fragment>
//   );
// }

import { Fragment, useEffect, useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";

// import { getFilteredEvents } from "../../helper/api-util";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

function FilteredEventsPage(props) {
  const [loadedEvents, setLoadedEvents] = useState();
  const router = useRouter();

  const filterData = router.query.slug;

  const [data, setData] = useState();

  // const { data, error } = useSWR(
  //   "https://next-js-event-7fd17-default-rtdb.asia-southeast1.firebasedatabase.app/events.json"
  // );

  const fetch = async () => {
    const resp = await fetch(
      "https://next-js-event-7fd17-default-rtdb.asia-southeast1.firebasedatabase.app/events.json"
    );
    const respData = resp.json();

    setData(respData);
  };

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
    return <p className="center">Loading...</p>;
  }

  const filteredYear = filterData[0];
  const filteredMonth = filterData[1];

  const numYear = +filteredYear;
  const numMonth = +filteredMonth;

  if (
    isNaN(numYear) ||
    isNaN(numMonth) ||
    numYear > 2030 ||
    numYear < 2021 ||
    numMonth < 1 ||
    numMonth > 12 ||
    error
  ) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter. Please adjust your values!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === numYear &&
      eventDate.getMonth() === numMonth - 1
    );
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const date = new Date(numYear, numMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
}

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filterData = params.slug;

//   const filteredYear = filterData[0];
//   const filteredMonth = filterData[1];

//   const numYear = +filteredYear;
//   const numMonth = +filteredMonth;

//   if (
//     isNaN(numYear) ||
//     isNaN(numMonth) ||
//     numYear > 2030 ||
//     numYear < 2021 ||
//     numMonth < 1 ||
//     numMonth > 12
//   ) {
//     return {
//       props: { hasError: true },
//       // notFound: true,
//       // redirect: {
//       //   destination: '/error'
//       // }
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: numYear,
//     month: numMonth,
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: numYear,
//         month: numMonth,
//       },
//     },
//   };
// }

export default FilteredEventsPage;

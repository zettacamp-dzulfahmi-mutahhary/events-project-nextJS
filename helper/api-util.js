export async function getAllEvents() {
  const response = await fetch(
    "https://next-js-event-7fd17-default-rtdb.asia-southeast1.firebasedatabase.app/events.json"
  );
  const data = await response.json();
  const eventsData = [];
  for (const key in data) {
    eventsData.push({
      id: key,
      ...data[key],
    });
  }

  return eventsData;
}

export async function getFeaturedEvents() {
  const data = await getAllEvents();
  const featuredEvents = data.filter((event) => event.isFeatured);
  return featuredEvents;
}

export async function getEventById(eventId) {
  const data = await getAllEvents();
  const event = data.find((event) => event.id === eventId);
  return event;
}

export async function getFilteredEvents(dateFilter) {
  const { year, month } = dateFilter;

  const allEvents = await getAllEvents();

  let filteredEvents = allEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === year && eventDate.getMonth() === month - 1
    );
  });

  return filteredEvents;
}

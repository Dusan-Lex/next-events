import { Fragment } from "react";
import { useRouter } from "next/router";

import EventSummary from "../../components/event-detail/EventSummary";
import EventLogistics from "../../components/event-detail/EventLogistics";
import EventContent from "../../components/event-detail/EventContent";
import ErrorAlert from "../../components/ui/ErrorAlert";
import { getAllEvents, getEventById } from "../../helpers/api-util";

const eventDetailPage = ({ event }) => {
  if (!event)
    return (
      <ErrorAlert>
        <p>No event found!</p>
      </ErrorAlert>
    );
  return (
    <Fragment>
      <EventSummary title={event.title} />
      <EventLogistics
        date={event.date}
        address={event.location}
        image={event.image}
        imageAlt={event.title}
      />
      <EventContent>
        <p>{event.description}</p>
      </EventContent>
    </Fragment>
  );
};

export default eventDetailPage;

export async function getStaticProps(context) {
  const eventId = context.params.eventId;
  const event = await getEventById(eventId);
  return {
    props: { event },
  };
}

export async function getStaticPaths() {
  const events = await getAllEvents();
  const paths = events.map((event) => ({ params: { eventId: event.id } }));

  return {
    paths,
    fallback: false,
  };
}

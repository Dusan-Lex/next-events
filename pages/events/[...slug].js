import { Fragment } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import EventList from "../../components/events/EventList";
import ResultsTitle from "../../components/events/ResultsTitle";
import { getFilteredEvents } from "../../helpers/api-util";
import Button from "../../components/ui/Button";
import ErrorAlert from "../../components/ui/ErrorAlert";

const FilteredEventsPage = ({ filteredEvents, hasError, date }) => {
  if (hasError) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>Invalid filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show AllEvents</Button>
        </div>
      </Fragment>
    );
  }

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p>No events found!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show AllEvents</Button>
        </div>
      </Fragment>
    );
  }

  const filteredDate = new Date(date.filteredYear, date.filteredMonth);

  return (
    <Fragment>
      <Head>
        <title>Filtered Events</title>
        <meta
          name="description"
          content={`All events for ${date.filteredMonth}/${date.filteredYear}`}
        />
      </Head>
      <ResultsTitle date={filteredDate} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

export default FilteredEventsPage;

export async function getServerSideProps(context) {
  const filterData = context.params.slug;
  const filteredYear = +filterData[0];
  const filteredMonth = +filterData[1];

  if (
    isNaN(filteredYear) ||
    isNaN(filteredMonth) ||
    filteredYear > 2030 ||
    filteredYear < 2020 ||
    filteredMonth < 1 ||
    filteredMonth > 12
  ) {
    return {
      props: { hasError: true },
      notFound: true,
    };
  }

  const filteredEvents = await getFilteredEvents({
    year: filteredYear,
    month: filteredMonth,
  });
  return {
    props: {
      filteredEvents,
      date: {
        filteredYear,
        filteredMonth,
      },
    },
  };
}

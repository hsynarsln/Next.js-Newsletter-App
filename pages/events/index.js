import Head from 'next/head';
import { useRouter } from 'next/router';
import React from 'react';
import EventList from '../../components/events/event-list';
import EventSearch from '../../components/events/event-search';
import { getAllEvents } from '../../helpers/api-util';

const EventsPage = props => {
  // const events = getAllEvents();
  const { events } = props;
  const router = useRouter();

  const findEventsHandler = (year, month) => {
    const fullPath = `/events/${year}/${month}`;
    router.push(fullPath);
  };

  return (
    <div>
      <Head>
        <title>All Evennts </title>
      </Head>
      <Head>
        <title>All Events</title>
        <meta name='description' content='Find a lot of great events that allow you to evolve...' />
      </Head>
      <EventSearch onSearch={findEventsHandler} />
      <EventList items={events} />
    </div>
  );
};

export async function getStaticProps() {
  const events = await getAllEvents();

  return {
    props: {
      events: events
    },
    revalidate: 60
  };
}

export default EventsPage;

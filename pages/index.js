import Head from 'next/head';
import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/api-util';

//! Metadata olarak next.js in özelliği olan Head kullanıyoruz.

export default function HomePage(props) {
  const { events } = props;

  return (
    <div>
      <Head>
        <title>NextJS Events</title>
        <meta name='description' content='Find a lot of great events that allow you to evolve...' />
      </Head>
      <EventList items={events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: {
      events: featuredEvents
    },
    revalidate: 1800 //! every half hour we regenerate this page for a new incoming request
  };
}

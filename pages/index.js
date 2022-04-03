import EventList from '../components/events/event-list';
import { getFeaturedEvents } from '../helpers/api-util';

export default function HomePage(props) {
  const { events } = props;

  return (
    <div>
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

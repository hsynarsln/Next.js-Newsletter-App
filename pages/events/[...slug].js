import { useRouter } from 'next/router';
import React, { Fragment, useEffect, useState } from 'react';
import useSWR from 'swr';
import EventList from '../../components/events/event-list';
import ResultsTitle from '../../components/events/results-title';
import Button from '../../components/ui/button';
import ErrorAlert from '../../components/ui/error-alert';

const fetcher = url => fetch(url).then(res => res.json());

const FilteredEventsPage = props => {
  const router = useRouter();
  const [loadedEvents, setLoadedEvents] = useState();

  const filterData = router.query.slug;
  // console.log(filterData);

  const { data, error } = useSWR('https://nextjs-app-5a15c-default-rtdb.europe-west1.firebasedatabase.app/events.json', fetcher);
  console.log(data);
  console.log(error);

  useEffect(() => {
    if (data) {
      const events = [];

      for (const key in data) {
        events.push({
          id: key,
          ...data[key]
        });
      }

      setLoadedEvents(events);
    }
  }, [data]);

  // if (!filterData) {
  if (!loadedEvents) {
    return <p className='center'>Loading...</p>;
  }

  const filteredYear = +filterData[0];
  const filteredMonth = +filterData[1];

  if (isNaN(filteredYear) || isNaN(filteredMonth) || filteredYear > 2030 || filteredYear < 2021 || filteredMonth > 12 || filteredMonth < 1 || error) {
    return (
      <Fragment>
        <ErrorAlert>
          <p className='center'>Invalid Filter Data</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  const filteredEvents = loadedEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === filteredYear && eventDate.getMonth() === filteredMonth - 1;
  });

  // const filteredEvents = getFilteredEvents({
  //   year: filteredYear,
  //   month: filteredMonth
  // });

  // const filteredEvents = props.events;

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <Fragment>
        <ErrorAlert>
          <p className='center'>No events found</p>
        </ErrorAlert>
        <div className='center'>
          <Button link='/events'>Show All Events</Button>
        </div>
      </Fragment>
    );
  }

  // const date = new Date(props.date.year, props.date.month - 1);
  const date = new Date(filteredYear, filteredMonth - 1);

  return (
    <Fragment>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </Fragment>
  );
};

// export async function getServerSideProps(context) {
//   const { params } = context;

//   const filterData = params.slug;

//   const filteredYear = +filterData[0];
//   const filteredMonth = +filterData[1];

//   if (isNaN(filteredYear) || isNaN(filteredMonth) || filteredYear > 2030 || filteredYear < 2021 || filteredMonth > 12 || filteredMonth < 1) {
//     return {
//       props: { hasError: true }
//       // notFound: true,
//       // redirect: {
//       //   destination: '/error',
//       // }
//     };
//   }

//   const filteredEvents = await getFilteredEvents({
//     year: filteredYear,
//     month: filteredMonth
//   });

//   return {
//     props: {
//       events: filteredEvents,
//       date: {
//         year: filteredYear,
//         month: filteredMonth
//       }
//     }
//   };
// }

export default FilteredEventsPage;

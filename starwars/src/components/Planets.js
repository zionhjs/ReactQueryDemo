import React, { useState } from 'react';
import { useQuery, usePaginatedQuery } from 'react-query';
import Planet from './Planet';

const fetchPlanets = async (key, page) => {
  const res = await fetch(`http://swapi.dev/api/planets/?page=${page}`);
  return res.json();
}

const Planets = () => {
  const [ page, setPage ] = useState(1);
  // const { data, status } = useQuery(['planets', 'hello, ninjas', page], fetchPlanets);
  const { resolvedData, latestData, status } = usePaginatedQuery(['planets', page], fetchPlanets);

  return (
    <div>
      <h2>Planets</h2>

      {status === 'loading' && (
        <div>Loading data</div>
      )}

      {status === 'error' && (
        <div>Error fetching data</div>
      )}

      {status === 'success' && (
          <>
            <button
                onClick={() => setPage(page => Math.max(page-1, 1))}
                disabled={page === 1}
            >Previous Page</button>
            <button>{ page }</button>
            <button
                onClick={() => setPage(page => Math.max(page+1, 1))}
                disabled={!latestData || !latestData.next}
            >Next Page</button>
            <div>
              { resolvedData.results.map(planet => <Planet key={planet.name} planet={planet} /> ) }
            </div>
         </>
      )} 
    </div>
  );
}
 
export default Planets;
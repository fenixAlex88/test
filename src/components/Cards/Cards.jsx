import React, { useEffect, useState } from 'react';
import Card from '../Card/Card';
import axios from 'axios';
import './Cards.scss';

const API_URL = 'https://rickandmortyapi.com/api/character';

function Cards() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(0);
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(1);
  useEffect(() => {
    if (fetching) {
      axios
        .get(API_URL, {
          params: {
            page: currentPage,
          },
        })
        .then((response) => {
          setData([...data, ...response.data.results]);
          setTotalCount(response.data.info.count);
          setCurrentPage((prev) => prev + 1);
          console.log(data.length);
          console.log(totalCount);
          console.log('page', currentPage);
          setIsLoading(false);
        })
        .finally(() => {
          setFetching(false);
        });
    }
  }, [fetching]);
  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);
  function scrollHandler(e) {
    console.log(data);
    console.log(totalCount);
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100 && data.length < totalCount) {
      setFetching(true);
    }
  }

  return <div className="cards">{isLoading ? <h2>Loading...</h2> : data.map(({ id, image, name }) => <Card key={id} image={image} name={data.length} />)}</div>;
}

export default Cards;

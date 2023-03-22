import React, { useEffect, useState } from 'react';
import Card from '../card/Card';
import axios from 'axios';
import './Сharacters.scss';

const API_URL = 'https://rickandmortyapi.com/api/character';

function Cards() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(1);
  useEffect(() => {
    if (fetching && data.length < totalCount) {
      axios
        .get(API_URL, {
          params: {
            page: currentPage,
          },
        })
        .then((response) => {
          setData([...data, ...response.data.results]);
          setTotalCount(response.data.info.count);
          setCurrentPage(currentPage + 1);
          setIsLoading(false);
        })
        .finally(() => {
          setFetching(false);
        });
    }
  }, [fetching, data, totalCount, currentPage]);
  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, []);

  function scrollHandler(e) {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 250) {
      setFetching((prev) => true);
    }
  }

  function showModalInfo(id){
    console.log(data.find(item=>item.id===id));

  }

  return (
  <div className='container'>
    <div className="characters">{isLoading ? <h2>Loading...</h2> : data.map(({ id, image, name }) => <Card key={id} id={id} image={image} name={name} showModalInfo={showModalInfo}/>)}</div>
  </div>
  )
}

export default Cards;

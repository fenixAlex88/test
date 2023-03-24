import React, { useEffect, useState } from 'react';
import Card from '../card/Card';
import axios from 'axios';
import './Сharacters.module.scss';
import Modal from '../modal/Modal';
import PersonInfo from '../personInfo/PersonInfo';

const API_URL = 'https://rickandmortyapi.com/api/character';

function Cards() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [totalCount, setTotalCount] = useState(1);
  const [modalActive, setModalActive] = useState(false);
  const [person, setPerson] = useState({});

  useEffect(() => {
    if (fetching && data.length < totalCount) {
      axios
        .get(API_URL, {
          params: {
            page: currentPage,
          },
        })
        .then((response) => response.data)
        .then((res) => {
          console.log(res);
          setData([
            ...data,
            ...res.results.map(({ id, name, image, status, species, gender, location, origin }) => ({
              id,
              name,
              image,
              status,
              species,
              gender,
              location: location['name'],
              origin: origin['name'],
            })),
          ]);
          setTotalCount(res.info.count);
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

  function showModalInfo(id) {
    setPerson(data.find((item) => item.id === id));
    setModalActive(true);
  }

  const personKeys = ['name', 'origin', 'status', 'location', 'species', 'gender'];

  return (
    <div className="container">
      <div className="characters">
        {isLoading ? <h2>Loading...</h2> : data.map(({ id, image, name }) => <Card key={id} id={id} image={image} name={name} showModalInfo={showModalInfo} />)}
      </div>

      <Modal active={modalActive} setActive={setModalActive}>
        {person ? <PersonInfo personKeys={personKeys} person={person} /> : <div className="">Information not found</div>}
      </Modal>
    </div>
  );
}

export default Cards;

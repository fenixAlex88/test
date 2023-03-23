import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../card/Card';
import Modal from '../modal/Modal';
import PersonInfo from '../personInfo/PersonInfo';
import PagesPagination from '../pagesPagination/PagesPagination';
import './Сharacters.scss';
import Preloader from '../preloader/Preloader';

const API_URL = 'https://rickandmortyapi.com/api/character';
const personKeys = ['name', 'origin', 'status', 'location', 'species', 'gender'];

function Сharacters() {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const [modalActive, setModalActive] = useState(false);
  const [person, setPerson] = useState({});
  const [autoPagination, setAutoPagination] = useState(false);

  useEffect(() => {
    if (fetching && currentPage <= totalPage) {
      axios
        .get(API_URL, {
          params: {
            page: currentPage,
          },
        })
        .then((response) => response.data)
        .then((res) => {
          if (autoPagination) {
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
            setCurrentPage(currentPage + 1);
            console.log('data if ',data);
          } else {
            setData(prev=>res.results.map(({ id, name, image, status, species, gender, location, origin }) => ({
                id,
                name,
                image,
                status,
                species,
                gender,
                location: location['name'],
                origin: origin['name'],
              })),
            );
            console.log('data else ',data);
          }

          setTotalPage(res.info.pages);
          setIsLoading(false);
        })
        .finally(() => {
          setFetching(false);
        });
    }
  }, [fetching, data, currentPage, totalPage]);

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

  function changePage(num) {
    setCurrentPage(num);
    setFetching(true);
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }


  return (
    <div className="container">
      <PagesPagination currentPage={currentPage} totalPage={totalPage} changePage={changePage} autoPagination={autoPagination} setAutoPagination={setAutoPagination} />
      <div className="characters">
        {isLoading ? <Preloader/> : data.map(({ id, image, name }) => <Card key={`${Math.random()}_${id}`} id={id} image={image} name={name} showModalInfo={showModalInfo} />)}
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        {person ? <PersonInfo personKeys={personKeys} person={person} /> : <div className="">Information not found</div>}
      </Modal>
    </div>
  );
}

export default Сharacters;

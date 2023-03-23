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
  const [currentPage, setCurrentPage] = useState(1);
  const [isFetching, setIsFetching] = useState(true);
  const [totalPage, setTotalPage] = useState(1);
  const [modalActive, setModalActive] = useState(false);
  const [person, setPerson] = useState({});
  const [autoPagination, setAutoPagination] = useState(false);

  useEffect(() => {
    if (isFetching && currentPage <= totalPage) {
      axios
        .get(API_URL, {
          params: {
            page: currentPage,
          },
        })
        .then((response) => {
          setTotalPage(response.data.info.pages);
          return response.data.results;
        })
        .then((res) => {
          if (autoPagination) {
            setData([
              ...data,
              ...res.map(({ id, name, image, status, species, gender, location, origin }) => ({
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
          } else {
            setData(
              res.map(({ id, name, image, status, species, gender, location, origin }) => ({
                id,
                name,
                image,
                status,
                species,
                gender,
                location: location['name'],
                origin: origin['name'],
              }))
            );
          }
        })
        .finally(() => {
          setIsFetching(false);
        });
    } else {
      setIsFetching(false);
    }
  }, [isFetching, data, currentPage, totalPage, autoPagination]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollHandler]);

  function scrollHandler(e) {
    if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 150 && autoPagination) {
      setIsFetching(true);
    }
  }

  function autoPaginationHandler() {
    if (autoPagination) {
      setAutoPagination((prev) => !prev);
      changePage(currentPage);
    } else {
      setAutoPagination((prev) => !prev);
      changePage(currentPage + 1);
    }
  }

  function showModalInfo(id) {
    setPerson(data.find((item) => item.id === id));
    setModalActive(true);
  }

  function changePage(num) {
    setCurrentPage(num);
    setIsFetching(true);
  }

  return (
    <div className="container">
      <PagesPagination
        currentPage={currentPage}
        totalPage={totalPage}
        changePage={changePage}
        autoPagination={autoPagination}
        autoPaginationHandler={autoPaginationHandler}
      />
      <div className="characters">
        {isFetching && <Preloader />}
        {data.map(({ id, image, name }) => (
          <Card key={id} id={id} image={image} name={name} showModalInfo={showModalInfo} />
        ))}
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        {person ? <PersonInfo personKeys={personKeys} person={person} /> : <div className="">Information not found</div>}
      </Modal>
    </div>
  );
}

export default Сharacters;

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from '../card/Card';
import Modal from '../modal/Modal';
import PersonInfo from '../personInfo/PersonInfo';
import PagesPagination from '../pagesPagination/PagesPagination';
import './Сharacters.scss';

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
          console.log(res);
          setData([
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
          setTotalPage(res.info.pages);
          setIsLoading(false);
        })
        .finally(() => {
          setFetching(false);
        });
    }
  }, [fetching, data, currentPage, totalPage]);

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
      <PagesPagination currentPage={currentPage} totalPage={totalPage} changePage={changePage} />
      <div className="characters">
        {isLoading ? <h2>Loading...</h2> : data.map(({ id, image, name }) => <Card key={id} id={id} image={image} name={name} showModalInfo={showModalInfo} />)}
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        {person ? <PersonInfo personKeys={personKeys} person={person} /> : <div className="">Information not found</div>}
      </Modal>
      <PagesPagination currentPage={currentPage} totalPage={totalPage} changePage={changePage} />
    </div>
  );
}

export default Сharacters;

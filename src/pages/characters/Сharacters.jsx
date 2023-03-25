import React, {useCallback, useEffect, useState} from 'react';
import axios from 'axios';
import Card from '../../components/card/Card';
import {Modal, Nav, Preloader} from '../../components/general';
import PersonInfo from '../../components/personInfo/PersonInfo';
import PagesPagination from '../../components/pagesPagination/PagesPagination';
import styles from './Сharacters.module.scss';

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
          return response.data.results.map(({ id, name, image, status, species, gender, location, origin }) => ({
            id,
            name,
            image,
            status,
            species,
            gender,
            location: location['name'],
            origin: origin['name'],
          }));
        })
        .then((res) => {
          if (autoPagination) {
            setData((prev) => [...data, ...res]);
            setCurrentPage(currentPage + 1);
          } else {
            setData([...res]);
          }
        })
        .finally(() => {
          setIsFetching(false);
        });
    } else {
      setIsFetching(false);
    }
  }, [isFetching, data, currentPage, totalPage, autoPagination]);

  const scrollHandler = useCallback((e)=>{if (
      e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 150 &&
      autoPagination
  ) {
    setIsFetching(true);
  }},[autoPagination]);

  useEffect(() => {
    document.addEventListener('scroll', scrollHandler);
    return () => {
      document.removeEventListener('scroll', scrollHandler);
    };
  }, [scrollHandler]);

  function autoPaginationHandler() {
    if (autoPagination) {
      setAutoPagination(false);
      changePage((prev) => prev - 2);
    } else {
      setAutoPagination(true);
      changePage((prev) => (prev === totalPage ? prev + 2 : prev + 1));
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
      <div className={styles.wrapper}>
        <Nav title='Pages:'>
        <PagesPagination
          currentPage={currentPage}
          totalPage={totalPage}
          changePage={changePage}
          autoPagination={autoPagination}
          autoPaginationHandler={autoPaginationHandler}
        />
      </Nav>

      <div className={styles.characters}>
        {isFetching && <Preloader />}
        {data.map(({ id, image, name }) => (
          <Card key={id} id={id} image={image} name={name} showModalInfo={showModalInfo} />
        ))}
      </div>
      <Modal active={modalActive} setActive={setModalActive}>
        {person ? <PersonInfo personKeys={personKeys} person={person} /> : <div className="">Information not found</div>}
      </Modal>
      </div>
    </div>
  );
}

export default Сharacters;

import React, { useCallback, useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Nav, Preloader, Error } from '../../components/general';
import Card from '../../components/card/Card';
import PersonInfo from '../../components/personInfo/PersonInfo';
import PagesPagination from '../../components/pagesPagination/PagesPagination';
import styles from './Сharacters.module.scss';

const API_URL = 'https://rickandmortyapi.com/api/character';
const personKeys = ['name', 'origin', 'status', 'location', 'species', 'gender', 'premiere'];

function Сharacters() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(true);
  const [isFetching, setIsFetching] = useState(false);
  const [totalPage, setTotalPage] = useState(1);
  const [modalActive, setModalActive] = useState(false);
  const [person, setPerson] = useState({});
  const [premiere, setPremiere] = useState();
  const [autoPagination, setAutoPagination] = useState(false);

  useEffect(() => {
    if (fetching && currentPage <= totalPage) {
      setIsFetching(true);
      axios
        .get(API_URL, {
          params: {
            page: currentPage,
          },
        })
        .then((response) => {
          console.log(response);
          setTotalPage(response.data.info.pages);
          return response.data.results.map(({ id, name, image, status, species, gender, location, origin, episode }) => ({
            id,
            name,
            image,
            status,
            species,
            gender,
            location: location['name'],
            origin: origin['name'],
            episode: episode[0],
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
        .catch((err) => {
          setError((prev) => err);
        })
        .finally(() => {
          setFetching(false);
          setIsFetching(false);
        });
    }
  }, [fetching, data, currentPage, totalPage, autoPagination]);

  useEffect(() => {
    if (person.episode) {
      setIsFetching(true);
      axios
        .get(person.episode)
        .then((res) => {
          setPremiere((prev) => `ep.${res.data.id} "${res.data.name}"`);
        })
        .catch((err) => {
          setError((prev) => err);
        })
        .finally(setIsFetching(false));
    }
  }, [person]);

  const scrollHandler = useCallback(
    (e) => {
      if (
        e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 150 &&
        autoPagination
      ) {
        setFetching(true);
      }
    },
    [autoPagination]
  );

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
    setFetching(true);
  }

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <Nav title="Pages:">
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
        {modalActive && (
          <Modal active={modalActive} setActive={setModalActive}>
            {person ? (
              <PersonInfo personKeys={personKeys} person={{ ...person, premiere }} />
            ) : (
              <Error error={{ message: 'Information about this person not found' }} />
            )}
          </Modal>
        )}
      </div>
      {error && (
        <Modal active={error} setActive={setError}>
          <Error error={error} />
        </Modal>
      )}
    </div>
  );
}

export default Сharacters;

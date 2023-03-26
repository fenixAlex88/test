import { useCallback, useEffect, useState } from 'react';
import axios from 'axios';

const personKeys = ['name', 'origin', 'status', 'location', 'species', 'gender', 'premiere'];

export const usePersonModal = (data, setError, setIsFetching) => {
    const [modalActive, setModalActive] = useState(false);
    const [person, setPerson] = useState({});
    const [premiere, setPremiere] = useState();
 
    
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
      }, [person, setError, setIsFetching]);

    function showModalInfo(id) {
        setPerson(data.find((item) => item.id === id));
        setModalActive(true);
      }
  return {showModalInfo, modalActive, setModalActive, person:{ ...person, premiere }, personKeys}};



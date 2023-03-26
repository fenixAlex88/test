import { useEffect, useState } from 'react';
import axios from 'axios';
import { useAutoPaginationToggle } from './useAutoPaginationToggle';


const API_URL = 'https://rickandmortyapi.com/api/character';

export const useChangePage = (setIsFetching, setError) => {

    const [data, setData] = useState([]);
    const [totalPage, setTotalPage] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);
    const [fetching, setFetching] = useState(true);

    const clearData = () => {
      setData([]);
    }

    const {autoPagination, autoPaginationToggle} = useAutoPaginationToggle(changePage, clearData);

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
                setData((prev) => [...prev, ...res]);
                setCurrentPage(prev=>prev + 1);
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
      }, [data, autoPagination, currentPage, totalPage, setIsFetching, setError, fetching]);

      function changePage(num) {
        setCurrentPage(num);
        setFetching(true);
      }

  return {data, totalPage, currentPage, changePage, autoPagination, autoPaginationToggle, setFetching};
};


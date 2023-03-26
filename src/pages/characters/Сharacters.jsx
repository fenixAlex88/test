import { useState } from 'react';
import { usePersonModal, useScrollHandler, useChangePage } from '../../hooks';
import { Modal, Nav, Preloader, Error } from '../../components/general';
import { Card, PagesPagination, PersonInfo } from '../../components';
import styles from './Сharacters.module.scss';

function Сharacters() {
  const [error, setError] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { data, totalPage, currentPage, changePage, autoPagination, autoPaginationToggle, setFetching } = useChangePage(
    setIsFetching,
    setError
  );
  const { showModalInfo, modalActive, setModalActive, person, personKeys } = usePersonModal(data, setError, setIsFetching);
  useScrollHandler(autoPagination, setFetching);

  return (
    <div className="container">
      <div className={styles.wrapper}>
        <Nav title="Pages:">
          <PagesPagination
            currentPage={currentPage}
            totalPage={totalPage}
            changePage={changePage}
            autoPagination={autoPagination}
            autoPaginationToggle={autoPaginationToggle}
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
              <PersonInfo personKeys={personKeys} person={person} />
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

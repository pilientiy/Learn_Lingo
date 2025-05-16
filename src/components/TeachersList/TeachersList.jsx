import { useState, useMemo } from 'react';
import { PER_PAGE } from '../../redux/teachers/operations';
import TeachersItem from '../TeachersItem/TeachersItem';
import css from './TeachersList.module.css';


export default function TeachersList({ selectedTeachersArray }) {
  const [page, setPage] = useState(PER_PAGE);

  const handleLoadMore = () => {
    setPage((prev) => prev + PER_PAGE);
  };

  const teachersMarkup = useMemo(() => {
    return Array.isArray(selectedTeachersArray)
      ? selectedTeachersArray
          .filter((teacher) => teacher && teacher.id && Array.isArray(teacher.languages))
          .slice(0, page)
      : [];
  }, [selectedTeachersArray, page]);

  return (
    <div className={css.cardsWrapper}>
      {teachersMarkup.length > 0 ? (
        <>
          <ul className={css.teacherCards}>
            {teachersMarkup.map((teacher) => (
              <TeachersItem key={teacher.id} teacher={teacher} />
            ))}
          </ul>
          {selectedTeachersArray.length > page && (
            <button onClick={handleLoadMore} className={css.button}>
              Load more
            </button>
          )}
        </>
      ) : (
        <p className={css.errorText}>No teachers found</p>
      )}
    </div>
  );
}

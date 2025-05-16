import { Suspense, useEffect, useMemo } from "react";
import { Outlet } from "react-router-dom";
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectIsError, selectIsLoading, selectTeachers } from "../../redux/teachers/selectors";
import { fetchTeachers } from "../../redux/teachers/operations";
import { clearFilters, selectFilters, setLanguage, setLevel, setPrice } from "../../redux/filters/slice";
import Filters from "../../components/Filters/Filters";
import TeachersList from "../../components/TeachersList/TeachersList";
import Loader from "../../components/Loader/Loader";
import css from './Teachers.module.css';


export default function Teachers() {
  const dispatch = useDispatch();
  const teachers = useSelector(selectTeachers);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const { language, level, price } = useSelector(selectFilters);

  useEffect(() => {
    if (!teachers || teachers.length === 0) {
      dispatch(fetchTeachers());
    }
  }, [dispatch, teachers]);

  const selectedTeachersArray = useMemo(() => {
    return Array.isArray(teachers)
      ? teachers
          .filter((teacher) => teacher && teacher.id)
          .filter((teacher) => {
            if (!language && !price && !level) {
              return true;
            }
            const selectLanguageFilter =
              !language ||
              (Array.isArray(teacher.languages) &&
                teacher.languages.some(
                  (lang) => lang.toLowerCase() === language.toLowerCase()
                ));
            const selectLevelFilter =
              !level ||
              (Array.isArray(teacher.levels) &&
                teacher.levels.some(
                  (lvl) => lvl.toLowerCase() === level.toLowerCase()
                ));
            const selectPriceFilter =
              !price || teacher.price_per_hour === Number(price);
            return selectLanguageFilter && selectLevelFilter && selectPriceFilter;
          })
      : [];
  }, [teachers, language, level, price]);

  return (
    <div className={css.teachersPage}>
      {isLoading && <Loader />}
      {isError && <p>Error loading teachers: {isError}</p>}
      <Filters
        teachers={teachers}
        setLanguage={(value) => dispatch(setLanguage(value))}
        setLevel={(value) => dispatch(setLevel(value))}
        setPrice={(value) => dispatch(setPrice(value))}
        clearFilters={() => dispatch(clearFilters())}
      />
      <TeachersList selectedTeachersArray={selectedTeachersArray} />
      <Suspense fallback={<Loader />}>
        <Outlet />
      </Suspense>
    </div>
  );
};
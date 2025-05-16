import { useEffect, useState, useMemo } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectTeachers } from "../../redux/teachers/selectors";
import { selectFavoriteTeachers, selectIsError, selectIsLoading } from "../../redux/favorites/selectors";
import { fetchTeachers } from "../../redux/teachers/operations";
import { selectIsLoggedIn, selectUserId } from "../../redux/auth/selectors";
import { getFavoriteTeachers } from "../../redux/favorites/operations";
import TeachersList from "../../components/TeachersList/TeachersList";
import Loader from "../../components/Loader/Loader";
import css from './Favorites.module.css';


export default function Favorites() {
  const dispatch = useDispatch();
  const teachers = useSelector(selectTeachers);
  const favoriteTeachers = useSelector(selectFavoriteTeachers);
  const isLoading = useSelector(selectIsLoading);
  const isError = useSelector(selectIsError);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userId = useSelector(selectUserId);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [hasFetchedFavorites, setHasFetchedFavorites] = useState(false);

  useEffect(() => {
    if (isLoggedIn && userId && !hasLoaded) {
      const fetchData = async () => {
        try {
          if (!teachers || teachers.length === 0) {
            await dispatch(fetchTeachers()).unwrap();
          }
          if (!hasFetchedFavorites) {
            await dispatch(getFavoriteTeachers(userId)).unwrap();
            setHasFetchedFavorites(true); 
          }
        } catch (error) {
          console.error("Error fetching data:", error);
        } finally {
          setHasLoaded(true);
        }
      };
      fetchData();
    }
  }, [dispatch, isLoggedIn, userId, teachers, hasLoaded, hasFetchedFavorites]);

  const favoriteTeachersArray = useMemo(() => {
    const result = Array.isArray(teachers) && Array.isArray(favoriteTeachers)
      ? teachers
          .filter((teacher) => teacher && teacher.id)
          .filter((teacher) => favoriteTeachers.includes(String(teacher.id)))
      : [];
    return result;
  }, [teachers, favoriteTeachers]);

  return (
    <div className={css.favoritesPage}>
      {!isLoggedIn && null}
      {isLoading && <Loader />}
      {isError && <p>Error loading favorite teachers: {isError}</p>}
      {hasLoaded && favoriteTeachersArray.length > 0 ? (
        <TeachersList selectedTeachersArray={favoriteTeachersArray} />
      ) : hasLoaded ? (
        <p className={css.message}>You don't have any favorite teachers yet.</p>
      ) : null}
    </div>
  );
};
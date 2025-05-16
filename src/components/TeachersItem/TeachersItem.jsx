import { useState, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import toast from 'react-hot-toast';
import { selectFavoriteTeachers } from '../../redux/favorites/selectors';
import { selectIsLoggedIn, selectUserId } from '../../redux/auth/selectors';
import { addToFavoriteTeachers, removeFromFavoriteTeachers } from '../../redux/favorites/operations';
import ModalWindow from '../ModalWindow/ModalWindow';
import TeachersModal from '../TeachersModal/TeachersModal';
import AuthPromptModal from '../AuthPromptModal/AuthPromptModal';
import sprite from '../../images/sprite/icons.svg';
import image from '../../images/teachers/Image-not-found.png';
import css from './TeachersItem.module.css';


export default function TeachersItem({ teacher }) {
  const [fullInformation, setFullInformation] = useState(false);
  const [modal, setModal] = useState(null);
  const [isToggling, setIsToggling] = useState(false);
  const openModal = (type) => setModal(type);
  const closeModal = () => setModal(null);

  const dispatch = useDispatch();
  const favoriteTeachers = useSelector(selectFavoriteTeachers);
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const userId = useSelector(selectUserId);

  const teacherIsInFavorite = favoriteTeachers.includes(String(teacher.id));

  const handleFavoriteClick = useCallback(async () => {
    if (isToggling) {
      return;
    } if (!isLoggedIn) {
      openModal("authPrompt");
      toast.info("Please log in to add teachers to favorites");
      return;
    }
    setIsToggling(true);
    try {
      if (teacherIsInFavorite) {
        await dispatch(
          removeFromFavoriteTeachers({
            userId,
            teacherId: String(teacher.id),
          })
        ).unwrap();
        toast.success("Teacher removed from favorites");
      } else {
        await dispatch(
          addToFavoriteTeachers({
            userId,
            teacherId: String(teacher.id),
          })
        ).unwrap();
        toast.success("Teacher added to favorites");
      }
    } catch (error) {
      toast.error("Failed to update favorites: " + error);
    } finally {
      setIsToggling(false);
    }
  }, [isLoggedIn, userId, teacherIsInFavorite, teacher.id, dispatch, openModal, isToggling]);

  const renderLevels = () => (
    <div className={css.langLevelWrp}>
      {teacher.levels.map((level, index) => (
        <span
          key={index}
          className={index === 0 ? css.firstLevel : css.langLevel}
        >
          #{level}
        </span>
      ))}
    </div>
  );

  return (
    <>
      <li key={teacher.id} className={css.teacherCard}>
        <div className={css.imageWrapper}>
          <img src={teacher.avatar_url} alt={teacher.name} className={css.image} />
        </div>
        <div className={css.infoWrapper}>
          <div className={css.headerWrp}>
            <div className={css.headingAndChars}>
              <p className={css.cardHeading}>Languages</p>
              <div className={css.teacherChars}>
                <p className={css.char}>
                  <svg className={css.icon}>
                    <use xlinkHref={`${sprite}#icon-book-open`} />
                  </svg>
                  Lessons online
                </p>
                <p className={css.char}>Lessons done: {teacher.lessons_done}</p>
                <p className={css.char}>
                  <svg className={css.icon}>
                    <use xlinkHref={`${sprite}#icon-rating-star`} />
                  </svg>
                  Rating: {teacher.rating}
                </p>
                <p className={css.char}>
                  Price / 1 hour:
                  <span className={css.charPrice}>{teacher.price_per_hour}$</span>
                </p>
              </div>
              <div className={css.buttonWrapper}>
                <button className={css.button} onClick={handleFavoriteClick} disabled={isToggling}>
                  <svg className={css.heartIcon}>
                    <use
                      xlinkHref={`${sprite}#${
                        teacherIsInFavorite && isLoggedIn
                          ? "icon-hover-heart"
                          : "icon-heart-normal"
                      }`}
                    />
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <p className={css.teacherName}>{teacher.name} {teacher.surname}</p>
          <div className={css.teacherInfoWrp}>
            <p className={css.teacherInfoHead}>
              Speaks:{" "}
              <span className={css.teacherLangInfo}>
                {teacher.languages.join(", ")}
              </span>
            </p>
            <p className={css.teacherInfoHead}>
              Lesson info:{" "}
              <span className={css.teacherInfo}>{teacher.lesson_info}</span>
            </p>
            <p className={css.teacherInfoHead}>
              Conditions:{" "}
              <span className={css.teacherInfo}>{teacher.conditions}</span>
            </p>
          </div>
          <div className={css.navWrp}>
            {!fullInformation ? (
              <>
                <button
                  onClick={() => setFullInformation(true)}
                  className={css.link}
                >
                  Read more
                </button>
                {renderLevels()}
              </>
            ) : (
              <>
                <div className={css.fullInfoBlock}>
                  <p className={css.experience}>{teacher.experience}</p>
                  {teacher.reviews &&
                    teacher.reviews.map((review, index) => (
                      <div key={index} className={css.reviewBlock}>
                        <div className={css.reviewerInfoWrapper}>
                          <img
                            src={image}
                            alt={review.reviewer_name}
                            className={css.reviewerImage}
                          />
                          <div className={css.reviewerDetails}>
                            <p className={css.reviewerName}>{review.reviewer_name}</p>
                            <p className={css.reviewerRating}>
                              <svg className={css.icon}>
                                <use xlinkHref={`${sprite}#icon-rating-star`} />
                              </svg>
                              {Number(review.reviewer_rating).toFixed(1)}
                            </p>
                          </div>
                        </div>
                        <p className={css.reviewerComment}>{review.comment}</p>
                      </div>
                    ))}
                  {renderLevels()}
                  <button
                    onClick={() => openModal("teacherModal")}
                    className={css.bookButton}
                  >
                    Book trial lesson
                  </button>
                </div>
                <button
                  onClick={() => setFullInformation(false)}
                  className={css.link}
                >
                  Show less
                </button>
              </>
            )}
          </div>
        </div>
        <ModalWindow isOpen={!!modal} onClose={closeModal}>
          {modal === "teacherModal" && <TeachersModal teacher={teacher} />}
          {modal === "authPrompt" && <AuthPromptModal />}
        </ModalWindow>
      </li>
    </>
  );
}

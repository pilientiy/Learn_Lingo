import { useState } from 'react';
import { useSelector } from 'react-redux';
import { filterParams } from '../../utils/FilterParams';
import { selectFilters } from '../../redux/filters/slice';
import sprite from '../../images/sprite/icons.svg';
import css from './Filters.module.css';


export default function Filters({ teachers, setLanguage, setLevel, setPrice, clearFilters }) {
  const { language, level, price } = useSelector(selectFilters);
  const languagesParams = filterParams(teachers, "languages");
  const levelParams = filterParams(teachers, "levels");
  const pricesParams = filterParams(teachers, "price_per_hour");
  const [openDropdown, setOpenDropdown] = useState(null);

  const toggleDropdown = (dropdown) => {
    setOpenDropdown(openDropdown === dropdown ? null : dropdown);
  };

  const handleLangChange = (value) => {
    setLanguage(value || "");
    setOpenDropdown(null);
  };

  const handleLevelChange = (value) => {
    setLevel(value || "");
    setOpenDropdown(null);
  };

  const handlePriceChange = (value) => {
    setPrice(value || "");
    setOpenDropdown(null);
  };

  return (
    <form className={css.form}>
      <div className={css.selectWrapper}>
        <label htmlFor="language" className={css.label}>Languages:</label>
        <div className={css.customSelect}>
          <div
            className={css.selectHeader}
            onClick={() => toggleDropdown('language')}>
            {language || "Select language"}
            <svg className={css.selectIcon}>
              <use xlinkHref={`${sprite}#icon-chevron-down`} />
            </svg>
          </div>
          {openDropdown === 'language' && (
            <ul className={css.optionsList}>
              <li
                className={css.option}
                onClick={() => handleLangChange("")}>
                Select language
              </li>
              {languagesParams.map((param, index) => (
                <li
                  key={index}
                  className={css.option}
                  onClick={() => handleLangChange(param)}>
                  {param}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className={css.selectWrapper}>
        <label htmlFor="level" className={css.label}>Level of knowledge:</label>
        <div className={css.customSelect}>
          <div
            className={css.selectHeader}
            onClick={() => toggleDropdown('level')}>
            {level || "Select level"}
            <svg className={css.selectIcon}>
              <use xlinkHref={`${sprite}#icon-chevron-down`} />
            </svg>
          </div>
          {openDropdown === 'level' && (
            <ul className={css.optionsList}>
              <li
                className={css.option}
                onClick={() => handleLevelChange("")}>
                Select level
              </li>
              {levelParams.map((param, index) => (
                <li
                  key={index}
                  className={css.option}
                  onClick={() => handleLevelChange(param)}>
                  {param}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className={css.selectWrapper}>
        <label htmlFor="price" className={css.label}>Price:</label>
        <div className={css.customSelect}>
          <div
            className={css.selectHeader}
            onClick={() => toggleDropdown('price')}>
            {price || "Select price"} {price && "$"}
            <svg className={css.selectIcon}>
              <use xlinkHref={`${sprite}#icon-chevron-down`} />
            </svg>
          </div>
          {openDropdown === 'price' && (
            <ul className={css.optionsList}>
              <li
                className={css.option}
                onClick={() => handlePriceChange("")}>
                Select price
              </li>
              {pricesParams.map((param, index) => (
                <li
                  key={index}
                  className={css.option}
                  onClick={() => handlePriceChange(param)}>
                  {param} $
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      {(language || level || price) && (
        <button type="button" onClick={clearFilters} className={css.button}>
          <svg className={css.icon}>
            <use xlinkHref={`${sprite}#icon-close-modal`} />
          </svg>
        </button>
      )}
    </form>
  );
}
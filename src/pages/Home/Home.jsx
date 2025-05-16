import { useNavigate } from "react-router-dom";
import { useTheme } from "../../utils/ThemeProvider";
import sprite from '../../images/sprite/icons.svg';
import css from './Home.module.css';


export default function Home() {
    const navigate = useNavigate();
    const { handleThemeChange } = useTheme();

    return (
        <div className={css.wrapper}>
            <div>
                <button onClick={handleThemeChange} className={css.themeBtn}>
                    <svg className={css.iconTheme} >
                        <use xlinkHref={`${sprite}#${"icon-theme"}`} />
                    </svg>
                    <svg className={css.iconPoint} >
                        <use xlinkHref={`${sprite}#${"icon-pointing-left"}`} />
                    </svg>
                </button>
            </div>
            <div className={css.heroWrapper}>
                <div className={css.textContainer}>
                    <p className={css.promoText}>
                        Unlock your potential with the best
                        <span className={css.accentText}>language</span>
                        tutors
                    </p>
                    <p className={css.secondaryText}>
                        Embark on an Exciting Language Journey with Expert Language Tutors:
                        Elevate your language proficiency to new heights by connecting with
                        highly qualified and experienced tutors.
                    </p>

                    <button className={css.linkBtn} onClick={() => navigate("./teachers")}>
                        Get started
                    </button>
                </div>
                <div className={css.image}></div>
            </div>

            <div className={css.statsContainer}>
                <p className={css.stats}>32,000 +<span className={css.statsDescr}>Experienced tutors</span></p>
                <p className={css.stats}>300,000 +<span className={css.statsDescr}>5-star tutor reviews</span></p>
                <p className={css.stats}>120 +<span className={css.statsDescr}>Subjects taught</span></p>
                <p className={css.stats}>200 +<span className={css.statsDescr}>Tutor nationalities</span></p>
            </div>
        </div>
    );
}

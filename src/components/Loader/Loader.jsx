import { ClipLoader } from 'react-spinners';
import css from './Loader.module.css';

const Loader = () => {
  return (
    <div className={css.wrapper}>
      <ClipLoader
        color="#F4C550"
        size={96}
        speedMultiplier={0.75}
        aria-label="clip-loader"
        className={css.lines}
      />
    </div>
  );
};

export default Loader;
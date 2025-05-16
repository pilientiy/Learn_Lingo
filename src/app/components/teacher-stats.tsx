interface TeacherStatsProps {
  listStyles: string;
  lessonsDone: number;
  rating: number;
  pricePerHour: number;
}

export default function TeacherStats({
  listStyles,
  lessonsDone,
  rating,
  pricePerHour,
}: TeacherStatsProps) {
  return (
    <ul className={listStyles}>
      <li className="lg:relative">
        <div className="flex justify-center items-center gap-2 lg:pseudoelement-right-line">
          <svg className="stroke-black fill-none" width={16} height={16}>
            <use href="/icons/icons.svg#icon-book"></use>
          </svg>
          <span>Lessons online</span>
        </div>
      </li>
      <div className="lg:relative">
        <p className="lg:pseudoelement-right-line">
          Lessons done: {lessonsDone}
        </p>
      </div>
      <li className="lg:relative">
        <p className="flex gap-2 justify-center items-center lg:pseudoelement-right-line">
          <svg width={16} height={16}>
            <use href="/icons/icons.svg#icon-star"></use>
          </svg>
          Rating: {rating}
        </p>
      </li>
      <li>
        <p>
          Price / 1 hour:{' '}
          <span className="text-green">{`${pricePerHour}$`}</span>
        </p>
      </li>
    </ul>
  );
}

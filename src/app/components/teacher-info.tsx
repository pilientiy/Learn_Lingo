interface TeacherInfoProps {
  name: string;
  surname: string;
  languages: string[];
  lessonInfo: string;
  conditions: string[];
}

export default function TeacherInfo({
  name,
  surname,
  languages,
  lessonInfo,
  conditions,
}: TeacherInfoProps) {
  return (
    <>
      <h3 className="text-2xl leading-none mb-8">{`${name} ${surname}`}</h3>
      <ul className="mb-4">
        <li className="mb-2">
          <div className="flex">
            <p className="text-gray">Speaks:&nbsp;</p>
            <p className="text-black underline decoration-solid decoration-black">
              {languages.join(', ')}
            </p>
          </div>
        </li>
        <li className="mb-2">
          <p>
            <span className="text-gray">Lesson Info:&nbsp;</span>
            {lessonInfo}
          </p>
        </li>
        <li>
          <p>
            <span className="text-gray">Conditions:&nbsp;</span>
            {conditions}
          </p>
        </li>
      </ul>
    </>
  );
}

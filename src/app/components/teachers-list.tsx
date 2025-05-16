import { Teacher } from '../teachers/page';
import TeacherCard from './teacher-card';

interface TeachersListProps {
  teachers: Teacher[];
}

export default function TeachersList({ teachers }: TeachersListProps) {
  return (
    <ul className="flex flex-col gap-8 max-w-[1184px]">
      {teachers.map((teacher) => (
        <li
          className="w-full py-4 px-2 md:p-6 rounded-3xl bg-white"
          key={teacher.id}
        >
          <TeacherCard teacher={teacher} />
        </li>
      ))}
    </ul>
  );
}

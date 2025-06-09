export function CourseTable({
  courses,
}: {
  courses: {
    id: string;
    name: string;
    sectionsCount: number;
    lessonsCount: number;
    studentCount: number;
  }[];
}) {
  return <h1>Course Table</h1>;
}

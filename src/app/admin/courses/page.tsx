import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { PageHeader } from '@/components/PageHeader';

export default function CoursesPage() {
  return (
    <div className='container my-6'>
      <PageHeader title='Courses'>
        <Button asChild>
          <Link href='/admin/courses/new'>New Course</Link>
        </Button>
      </PageHeader>
    </div>
  );
}

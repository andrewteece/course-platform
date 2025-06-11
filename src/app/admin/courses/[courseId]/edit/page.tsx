import { PageHeader } from '@/components/PageHeader';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DialogTrigger } from '@/components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { db } from '@/drizzle/db';
import { CourseSectionTable, CourseTable, LessonTable } from '@/drizzle/schema';
import { CourseForm } from '@/features/courses/components/CourseForm';
import { notFound } from 'next/navigation';

export default async function EditCoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = await params;
  const course = await getCourseGlobalTag(courseId);

  if (course === null) return notFound();
}

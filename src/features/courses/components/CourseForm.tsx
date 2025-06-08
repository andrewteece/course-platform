'use client';

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { courseSchema } from '../schemas/courses';
import { z } from 'zod';

export function CourseForm({
  course,
}: {
  course?: {
    id: string;
    name: string;
    description: '';
  };
}) {
  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: course ?? {
      name: '',
      description: '',
    },
  });
}

'use server';

import { z } from 'zod';
import { courseSchema } from '../schemas/courses';
import { redirect } from 'next/navigation';
import { getCurrentUser } from '@/services/clerk';

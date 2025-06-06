import { z } from 'zod';

export const noteSchema = z.object({
  title: z.string({
    required_error: 'Title is required',
  }),
  content: z.string({
    required_error: 'Content is required',
  }),
  archived: z.boolean().optional(),
  tagIds: z.array(z.number()).optional(), // para relacionar tags por ID
});

import z from 'zod'

const movieScheme = z.object({
  title: z.string({
    invalid_type_error: 'Movie title must be a string',
    invalid_length_error: 'Movie title must be at least 1 character long'
  }),
  year: z.number().int().positive().min(1900),
  duration: z.number().int().positive(),
  rate: z.number().min(0).max(10),
  poster: z
    .string()
    .url()
    .startsWith('https://' || 'http://'),
  genre: z.array(
    z.enum(['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-fi'])
  )
})

export function validateMovie (object) {
  return movieScheme.safeParse(object)
}

export function validatePartialMovie (input) {
  return movieScheme.partial().safeParse(input)
}

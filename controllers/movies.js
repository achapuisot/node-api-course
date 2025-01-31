import { MovieModel } from '../models/movie.js'
import { validateMovie, validatePartialMovie } from '../schemas/movies.js'

export class MovieController {
  static getAll = async (req, res) => {
    const { genre } = req.query

    const movies = await MovieModel.getAll({ genre })
    return res.json(movies)
  }

  static getById = async (req, res) => {
    const { id } = req.params
    const movie = await MovieModel.getById({ id })
    if (movie) return res.json(movie)
    res.status(404).json({ message: 'Movie not found' })
  }

  static create = async (req, res) => {
    const result = validateMovie(req.body)

    if (!result.success) {
      // 422 Unprocessable Entity
      return res.status(422).json({ error: JSON.parse(result.error.message) })
    }

    const newMovie = await MovieModel.create({ input: result.data })

    res.status(201).json(newMovie)
  }

  static delete = async (req, res) => {
    const { id } = req.params

    const deleted = await MovieModel.delete({ id })
    if (!deleted) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    return res.json({ message: 'Movie deleted' })
  }

  static update = async (req, res) => {
    const result = validatePartialMovie(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedMovie = await MovieModel.update({ id, newData: result.data })

    if (!updatedMovie) {
      return res.status(404).json({ message: 'Movie not found' })
    }

    return res.json(updatedMovie)
  }
}

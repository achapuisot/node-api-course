import { getJSON } from '../utils/getJson.js'
import { randomUUID } from 'node:crypto'
const movies = getJSON('../movies.json')
export class MovieModel {
  static getAll = async ({ genre }) => {
    if (genre) {
      return movies.filter(m => m.genre.some(g => g.toLowerCase() === genre.toLowerCase()))
    }

    return movies
  }

  static getById = async ({ id }) => {
    const movie = movies.find((movie) => movie.id === id)
    return movie
  }

  static create = async ({ input }) => {
    const newMovie = {
      id: randomUUID(), // uuid v4
      ...input
    }

    movies.push(newMovie)

    return newMovie
  }

  static delete = async ({ id }) => {
    const movieIndex = movies.findIndex((movie) => movie.id === id)
    if (movieIndex === -1) return false
    movies.splice(movieIndex, 1)
    return true
  }

  static update = async ({ id, newData }) => {
    const movieIndex = movies.findIndex((movie) => movie.id === id)

    if (movieIndex === -1) { return false }

    const updatedMovie = {
      ...movies[movieIndex],
      ...newData
    }

    movies[movieIndex] = updatedMovie

    return updatedMovie
  }
}

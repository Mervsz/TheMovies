export interface IMovie{
  title: string
  overview: string
  release_date: string
  poster_path: string
  genres: IGenres[]
  isAdded: boolean

  popularity: number
  vote_average: number
  vote_count: number

}

export interface IReviews{
  author: string
  content: string
}

interface IGenres{
  id: string
  name: string
}
import { API_V1, API_KEY } from "fe-api"
import AsyncStorage from "@react-native-community/async-storage";
import { INetwork } from "fe-models/INetwork";

export async function getMovieDetails(movie_id: number): Promise<INetwork<any>>{
  try{
    // API call get Movie Details
    const { data }  = await API_V1.get(`/movie/${movie_id}?api_key=${API_KEY}`)

    const session_id = await AsyncStorage.getItem('@session_id')
    const account_id = await AsyncStorage.getItem('@account_id')
    const watchlist = await API_V1.get(`/account/${account_id}/watchlist/movies?api_key=${API_KEY}&session_id=${session_id}`)

    const add_list: any = watchlist.data.results.map((elements: any) =>  elements.id)
    const isAdded: boolean = add_list.includes(movie_id)

    return { data:{...data, isAdded}, status: "success" }
  }
  catch({ data, statusText}){
    console.log("status: ", statusText, data)
    return {data , status: "failed" }
  }
}

export async function getMovieReviews(movie_id: number): Promise<INetwork<any>>{
  try{
    const session_id = await AsyncStorage.getItem('@session_id')
    const account_id = await AsyncStorage.getItem('@account_id')
    // API call get Movie Details
    const { data }  = await API_V1.get(`/movie/${movie_id}/reviews?api_key=${API_KEY}`)
    const my_rating  = await API_V1.get(`/account/${account_id}/rated/movies?api_key=${API_KEY}&session_id=${session_id}`)
    
    return { data, status: "success" }
  }
  catch({ data, statusText}){
    console.log("status: ", statusText, data)
    return {data , status: "failed" }
  }
}

export async function addToWatchlist(movie_id: number, isAdded: boolean): Promise<INetwork<any>>{
  try{
    const session_id = await AsyncStorage.getItem('@session_id')
    const account_id = await AsyncStorage.getItem('@account_id')
    // API call get Movie Details
    const { data }  = await API_V1.post(`/account/${account_id}/watchlist?api_key=${API_KEY}&session_id=${session_id}`, 
    {media_type: "movie", media_id: movie_id, watchlist: !isAdded })

    return { data, status: "success" }
  }
  catch({ data, statusText}){
    console.log("status: ", statusText, data)
    return {data , status: "failed" }
  }
}

export async function getMovieRate(movie_id: number): Promise<INetwork<any>>{
  try{
    const session_id = await AsyncStorage.getItem('@session_id')
    const account_id = await AsyncStorage.getItem('@account_id')
    // API call get Movie Details
    const { data }  = await API_V1.get(`/account/${account_id}/rated/movies?api_key=${API_KEY}&session_id=${session_id}`)
    const item = data.results.find((element: any) => element.id == movie_id)

    return { data:{rating: item ? item.rating :  0}, status: "success" }
  }
  catch({ data, statusText}){
    console.log("status: ", statusText, data)
    return {data , status: "failed" }
  }
}

export async function rateMovie(movie_id: number, rating: number): Promise<INetwork<any>>{
  try{
    const session_id = await AsyncStorage.getItem('@session_id')
    // API call get Movie Details
    const { data }  = await API_V1.post(`/movie/${movie_id}/rating?api_key=${API_KEY}&session_id=${session_id}`, { value: rating })

    return { data, status: "success" }
  }
  catch({ data, statusText}){
    console.log("status: ", statusText, data)
    return {data , status: "failed" }
  }
}

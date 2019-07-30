import { API_V1, API_KEY } from "fe-api";
import AsyncStorage from "@react-native-community/async-storage";
import { INetwork } from "fe-models/INetwork";

export async function getTrendingMovies(page: number = 1): Promise<INetwork<any>>{
  try{
    // API call get Trending Movies
    const { data }  = await API_V1.get(`/trending/movie/day?api_key=${API_KEY}&page=${page}`)

    return { data, status: "success" }
  }
  catch({ data, statusText}){
    console.log("status: ", statusText, data)
    return {data , status: "failed" }
  }
}


export async function searchMovies(query: string, page: number = 1): Promise<INetwork<any>>{
  try{
    // API call search Movies
    const { data }  = await API_V1.get(`/search/movie?api_key=${API_KEY}&query=${query}&page=${page}`)

    return { data, status: "success" }
  }
  catch({ data, statusText}){
    console.log("status: ", statusText, data)
    return {data , status: "failed" }
  }
}
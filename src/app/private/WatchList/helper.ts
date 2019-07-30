import { API_V1, API_KEY } from "fe-api";
import { INetwork } from "fe-models/INetwork";
import AsyncStorage from "@react-native-community/async-storage";

export async function getWatchList(page: number = 1): Promise<INetwork<any>>{
  try{
    // API call get Watchlist Movies
    const session_id = await AsyncStorage.getItem('@session_id')
    const account_id = await AsyncStorage.getItem('@account_id')
    const { data }  = await API_V1.get(`/account/${account_id}/watchlist/movies?api_key=${API_KEY}&session_id=${session_id}`)

    return { data, status: "success" }
  }
  catch({ data, statusText}){
    console.log("status: ", statusText, data)
    return {data , status: "failed" }
  }
}


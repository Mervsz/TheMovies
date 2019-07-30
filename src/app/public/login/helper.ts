import { API_V1, API_KEY } from "fe-api";
import { INetwork } from "fe-models/INetwork";

export async function userLogin(username:string, password: string): Promise<INetwork<any>>{
  try{
    // API Call request a token for authentication
    const { data:{ request_token }} = await API_V1.get(`/authentication/token/new?api_key=${API_KEY}`)

    // API Call validate credential with the token given
    await API_V1.post(`/authentication/token/validate_with_login?api_key=${API_KEY}`,{
      username,
      password,
      request_token
    })

    // API Call generate session ID
    const {data:{ session_id }} = await API_V1.get(`/authentication/session/new?api_key=${API_KEY}`, {
      params: {
        request_token
      }
    })
    const { data:{ id }} = await API_V1.get(`/account?api_key=${API_KEY}&session_id=${session_id}`)

    return { data:{status_message: "success", session_id, id}, status: "success" }
  }
  catch({ data, statusText}){
    return {data , status: "failed" }
  }
}
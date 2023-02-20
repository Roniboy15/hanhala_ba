import axios from "axios"

export const API_URL = "";
// export const API_URL = "http://blalba.cyclic.com";

export const TOKEN_KEY = "ba_tok";
export const GOOGLE_API_KEY = "AIzaSyD-iwThS1ZAiA1-y-vfFOZYFFSjh5SUb4M";
export const GOOGLE_CLIENT_ID = "549892695718-4jo7oth2d7k0bu2g1784ftsfpggt8r03.apps.googleusercontent.com";
export const SPREADSHEET_ID = "1arLwRrflsfrpk5CdockuvK0U6zo3Evzkwdjch9Tgf38";

// for Get only
export const doApiGet = async(_url) => {
  try{
    let resp = await axios({
      url:_url,
      method: "GET",
      headers: {
        "x-api-key": localStorage[TOKEN_KEY]
      }
    })
    return resp.data;
  }
  catch(err){
    console.log(err);
    throw err;
  }
}

// For Delete , put , post , patch
export const doApiMethod = async(_url,_method,_body = {}) => {
  console.log(_body)
  try{
    let resp = await axios({
      url:_url,
      method: _method,
      data:_body ,
      headers: {
        "x-api-key": localStorage[TOKEN_KEY]
      }
    })
    return resp.data;
  }
  catch(err){
    console.log(err);
   throw err;
  }
}

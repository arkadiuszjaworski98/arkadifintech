import React, {useEffect, useState} from "react";
import { jsx } from "@emotion/react";
import ListComponent from "./ListComponent";
import axios from "axios";

export default function Trending() {
const [response, setResponse] = useState(false)

useEffect(() => {
  async function fetchData() {
    const response = await axios.request({
      method: 'GET',
      url: 'https://yfapi.net/v1/finance/trending/US',
      params: {modules: 'defaultKeyStatistics,assetProfile'},
      headers: {
        'x-api-key': '9fVI4jSr2Z51yN7xsiCLm1XHvMqADd5M1Fdb8d17'
      }
    })
    setResponse(response.data.finance.result[0].quotes)
    
  }
  fetchData()
},[])


  return <div>
    <h2>Trending</h2>
    {response ?
    Object.values(response).map((result, index) => {
      return <h6 key={index}>{result.symbol}</h6>
     })
     : null}
    </div>
}
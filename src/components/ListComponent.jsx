import React, { useEffect, useState } from "react";
import { jsx } from "@emotion/react";
import axios from "axios";

export default function ListComponent( {results}) {
  const [response, setResponse] = useState(false)
  const [firstResult, setFirstResult] = useState('')

  useEffect(() => {
    if (results.length) {
    setFirstResult(results[0].symbol)
    }
  }, [results])


  useEffect(() => {
  if (firstResult) {
  async function fetchData() {
      const responsePrice = await axios.request({
        method: 'GET',
        url: 'https://yfapi.net/v6/finance/quote',
        params: {modules: 'defaultKeyStatistics,assetProfile',region:'GB', lang:'en', symbols:firstResult},
        headers: {
          'x-api-key': '9fVI4jSr2Z51yN7xsiCLm1XHvMqADd5M1Fdb8d17'
        }
      })
      setResponse(responsePrice.data.quoteResponse.result[0].ask)
    }
  fetchData()
  }
},[firstResult])

  const answer = (
    <div>{response ? `Price of ${results[0].symbol} is $${response}` : ''}</div>
  )

  return answer
}

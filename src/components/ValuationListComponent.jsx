import React, { useEffect, useState } from "react";
import { jsx } from "@emotion/react";
import axios from "axios";

export default function ValuationListComponent( {results}) {
  console.log(results)
  const [response, setResponse] = useState(false)
  const [firstResult, setFirstResult] = useState('')

  useEffect(() => {
    if (results.length) {
    setFirstResult(results[0].symbol)
    }
  }, [results])


  useEffect(() => {
  if (firstResult) {
    console.log('firstresult', firstResult)
  async function fetchData() {
      const responsePrice = await axios.request({
        method: 'GET',
        url: 'https://yfapi.net/ws/insights/v1/finance/insights',
        params: {modules: 'defaultKeyStatistics,assetProfile',region:'GB', lang:'en', symbol:firstResult},
        headers: {
          'x-api-key': '9fVI4jSr2Z51yN7xsiCLm1XHvMqADd5M1Fdb8d17'
        }
      })
      console.log('***response', responsePrice)
      setResponse(responsePrice.data.finance.result.instrumentInfo)
    }
  fetchData()
  }
},[firstResult])

  const answer = (<div>
    <h4>{response ? `${results[0].symbol} is ${response.valuation.description} by a margin of ${response.valuation.discount}` : ''}</h4>
    <h4>{response ? `Data provider ${response.recommendation.provider} is rating ${results[0].symbol} a ${response.recommendation.rating} with a target price of $${response.recommendation.targetPrice}` : ''}</h4></div>
  )

  return answer
}

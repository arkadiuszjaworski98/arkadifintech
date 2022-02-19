import React, {useEffect, useState} from "react";
import { jsx } from "@emotion/react";
import ValuationListComponent from "./ValuationListComponent";
import axios from "axios";

export default function Valuation() {

const [apiData, setAPIData] = useState(null)
const [input, setInput] = useState('')
const [response, setResponse] = useState(false)
const [isError, setIsError] = useState(false)



async function makeAPICall(e) {
  e.preventDefault();
  setAPIData(input)
}

useEffect(() => {
  if (apiData) {
  async function fetchData() {
    const response = await axios.request({
      method: 'GET',
      url: 'https://yfapi.net/v6/finance/autocomplete',
      params: {modules: 'defaultKeyStatistics,assetProfile', lang:'en', query:apiData},
      headers: {
        'x-api-key': '9fVI4jSr2Z51yN7xsiCLm1XHvMqADd5M1Fdb8d17'
      }
    })
    if (response.data.ResultSet.Result.length) {
      setIsError(false)
      console.log(response)
    setResponse(response.data.ResultSet.Result)
    } else {
      setIsError(true)
  }
}
  fetchData()
}
},[apiData])
  
  const container = (
    <div className="inputContainer">
        <form>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={'Type...'}
          />
          <button onClick={makeAPICall} type="submit">
            Search
          </button>
        </form>
      </div>
  );

  return <div>
    <h2>Stock Valuation Identifier</h2>
    {container}
    {response ? <ValuationListComponent results={response}/> : null}
    {isError ? 'Please check your spelling and try again': null}
    </div>
}
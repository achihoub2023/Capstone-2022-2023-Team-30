import axios from 'axios';

const backendPostUrl = "http://localhost:8081/time_series_default";  // Set backend post URL here
const backendGetUrl = "http://localhost:3001/backendGet";  // Set backend get URL here

export const getData = async () => {
    try {
      const response = await axios.get("http://localhost:8081/time_series_default");
      const data = response.data;
    //   console.log("data")
    //   console.log(data.x)
      return data;
    } catch (error) {
      console.error(error);
    }
};

export const postData = async (data:string, data2:string, url:string) => {
  try {
      const response = await fetch(url, {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({stockTicker: data, stockName:data2})
  });
    const data_2 = response.json();
    return data_2;
  } catch (error) {
    console.error(error);
  }


  // const backendData = await getDataFromBackend();  // This will get the stock data from the backend. Not tested yet.
  // console.log(backendData);
}

export const getDataFromBackend = async () => {
  console.log("Running backendData()");
  return await fetch(backendGetUrl)
  .then((res) => {
    if(!res.ok) {
      throw Error("Backend GET request failed.");
    }
    return res.json();
  }).then((data) => {
    return data;
  }).catch((error) => {
    console.log(error.message);
  })
}
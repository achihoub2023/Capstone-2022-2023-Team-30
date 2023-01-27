
import axios from 'axios';



export const getData = async () => {
    try {
      const response = await axios.get("http://172.31.204.181:8081/time_series_default");
      const data = response.data;
    //   console.log("data")
    //   console.log(data.x)
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  
  
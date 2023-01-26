
import axios from 'axios';



export const getData = async () => {
    try {
      const response = await axios.get("http://172.31.217.82:8081/time_series_default");
      const data = response.data;
      return data;
    } catch (error) {
      console.error(error);
    }
  };
  
  
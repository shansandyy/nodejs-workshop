import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Stock = () => {
  const [error, setError] = useState(null);
  const [data, setData] = useState([]);

  useEffect(()=>{
    let getStock =async ()=>{
      console.log('Stock', 'useEffect []');
      console.log('useEffect[]', data);
      let response = await axios.get('http://localhost:3001/api/01/stocks');
      // console.log(response);
      setData(response.data);
      console.log('useEffect[] after set', data);
    }
    getStock();
  },[])

  useEffect(()=>{
    console.log('Stock', 'useEffect [data]');
    console.log('useEffect[data]', data);
  },[data])
  return (
    <div>
      {error && <div>{error}</div>}
      <h2 className="ml-7 mt-6 text-xl text-gray-600">股票代碼</h2>

      {data.map((v)=>{
        return <div key={v.id} className="bg-white bg-gray-50 p-6 rounded-lg shadow hover:shadow-lg m-6 cursor-pointer">
        <Link to={`/stock/${v.id}`}>
          <h2 className="text-2xl font-bold mb-2 text-gray-800">{v.id}</h2>
          <p className="text-gray-700">{v.name}</p>
        </Link>
      </div>
      })}
      
    </div>
  );
};

export default Stock;

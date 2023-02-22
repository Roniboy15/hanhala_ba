import React, { useState, useEffect } from 'react';
import { API_URL, doApiGet } from '../../../services/apiServices';

const SumaSheet = () => {

  const [link, setLink] = useState('');

  const getData = async () => {
    try {
      const data = await doApiGet(`${API_URL}/daten/Suma`);
      console.log(data);

      const filteredData = {
        spreadLink: data[0].spreadLink,
      };
      setLink(filteredData.spreadLink);
    }
    catch (err) {
      console.log("suma-sheet", err)
    }
  }

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className='col-11 col-md-10 mt-3 bg-dark-subtle bg-opacity-25 rounded'>
      <h3 className='p-2'>Antworten von Google Forms</h3>
      <iframe style={{ height: "40vh" }} className='w-100 p-2 border rounded shadow' src={link}></iframe>
    </div>
  );
}

export default SumaSheet;

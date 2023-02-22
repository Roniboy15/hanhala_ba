import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet } from '../../services/apiServices';
import './client.css'
import background from '../../images/suma.jpeg'

const Home = () => {

  const [suma, setSuma] = useState({});
  const [wima, setWima] = useState({});
  const [sayarim, setSayarim] = useState({});
  const [israel, setIsrael] = useState({})

  const getData = async () => {
    try {
      const dataSuma = await doApiGet(`${API_URL}/daten/Suma`);

      const filteredData = {
        name: dataSuma[0].name,
        datum: dataSuma[0].datum,
        formsLink: dataSuma[0].formsLink,
        spreadLink: dataSuma[0].spreadLink,
        active: dataSuma[0].active
      };

      setSuma(filteredData);

      const dataWima = await doApiGet(`${API_URL}/daten/Wima`);

      const filteredDataWima = {
        name: dataWima[0].name,
        datum: dataWima[0].datum,
        formsLink: dataWima[0].formsLink,
        spreadLink: dataWima[0].spreadLink,
        active: dataWima[0].active
      };

      setWima(filteredDataWima);

      const dataSayarim = await doApiGet(`${API_URL}/daten/Sayarim`);

      const filteredDataSayarim = {
        name: dataSayarim[0].name,
        datum: dataSayarim[0].datum,
        formsLink: dataSayarim[0].formsLink,
        spreadLink: dataSayarim[0].spreadLink,
        active: dataSayarim[0].active
      };

      setSayarim(filteredDataSayarim);

      const dataIsrael = await doApiGet(`${API_URL}/daten/israel`);

      const filteredDataIsrael = {
        name: dataIsrael[0].name,
        datum: dataIsrael[0].datum,
        formsLink: dataIsrael[0].formsLink,
        spreadLink: dataIsrael[0].spreadLink,
        active: dataIsrael[0].active
      };

      setIsrael(filteredDataIsrael);

    } catch (err) {
      console.log('forms suma', err);
    }
  };

  useEffect(() => {
    getData();
  }, [])

  return (
    <div className='container mt-2'>
      <div className='row justify-content-center text-center'>
        {suma.active ?
          <div style={{backgroundImage:`url(${background})`}} className='col-12 col-md-6 rounded'>
            <h2 className='m-2 p-1 application-title'>Apply now to take part in the next Summer Camp</h2>
            <i class="fa-sharp fa-solid fa-arrow-down arrowDown"></i>
            <iframe className='w-100' style={{ height: '100vh' }} src={suma.formsLink} >Loading…</iframe>
          </div>
          : ''}


      </div>
    </div>
  )
}

export default Home
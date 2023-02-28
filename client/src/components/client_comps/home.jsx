import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet } from '../../services/apiServices';
import './client.css'
import backgroundSuma from '../../images/suma.jpeg'
import backgroundWima from '../../images/wima.jpeg'
import backgroundSayarim from '../../images/sayarim.webp'
import backgroundIsrael from '../../images/israel.jpeg'

const Home = () => {

  const [suma, setSuma] = useState({});
  const [wima, setWima] = useState({});
  const [sayarim, setSayarim] = useState({});
  const [israel, setIsrael] = useState({});

  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(false);

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

    }
    catch (err) {
      console.log('forms suma', err);
    }
    setLoading(true);

  };

  const countDivs = () => {
    let counter = 0;
    if (suma.active == true) counter++;
    if (wima.active == true) counter++;
    if (suma.active == true) counter++;
    if (suma.active == true) counter++;
    setCount(counter);

  }

  useEffect(() => {
    getData();
    if (loading) {
      countDivs();
    }
  }, [loading])


  return (
    <div className="container-fluid mt-1">
      {loading ?
        <div className="row justify-content-around text-center">
          {suma.active ?
            <div className={count > 1 ? 'col-12 col-md-6 rounded' : 'col-12 rounded'} style={{ backgroundImage: `url(${backgroundSuma})`, backgroundSize: "cover" }}>
              <div className="text-center justify-content-around mt-3 mt-md-4">
                <h2 className='p-2'>Sommermachane</h2>
                <p className='p-2 bg-light rounded-4 bg-opacity-75 '>Wie oft hat man die Chance, das Leben von dutzenden jungen aufstrebenden Jugendlichen positiv zu beeinflussen?<br /><br />1. Leitung des Madrichimteams <br />2. Lieferungen koordinieren <br />3. Finanzen überblicken</p>
                <iframe className="w-100" src={suma.formsLink}>..Loading</iframe>
              </div>
            </div>
            : ''}
          {wima.active ?
            <div className={count > 1 ? 'col-12 col-md-6 rounded' : 'col-12 rounded'} style={{ backgroundImage: `url(${backgroundWima})`, backgroundSize: "cover" }}>
              <div className="text-center justify-content-around mt-3 mt-md-4">
                <h2 className='p-2'>Wintermachane</h2> <p className='p-2 bg-light rounded-4 bg-opacity-75 '>
                  Wie oft hat man die Chance, das Leben von dutzenden jungen aufstrebenden Jugendlichen positiv zu beeinflussen?<br /><br />1. Leitung des Madrichimteams <br />2. Lieferungen koordinieren <br />3. Finanzen überblicken</p>                <iframe className="w-100" src={wima.formsLink}>..Loading</iframe>
              </div>
            </div>
            : ''}
          {sayarim.active ?
            <div className={count > 1 ? 'col-12 col-md-6 rounded' : 'col-12 rounded'} style={{ backgroundImage: `url(${backgroundSayarim})`, backgroundSize: "cover" }}>
              <div className="text-center justify-content-around mt-3 mt-md-4">
                <h2 className='p-2'>Sayarim</h2>
                <p className='p-2 bg-light rounded-4 bg-opacity-75 '>
                  Wie oft hat man die Chance, das Leben von dutzenden jungen aufstrebenden Jugendlichen positiv zu beeinflussen?<br /><br />1. Begleitung der Chanichim ans Sayarim <br />2. Teilnahme am Program des Bne Akiwa Olami</p>   
                <iframe className="w-100" src={sayarim.formsLink}>..Loading</iframe>
              </div>
            </div>
            : ''}
          {israel.active ?
            <div className={count > 1 ? 'col-12 col-md-6 rounded' : 'col-12 rounded'} style={{ backgroundImage: `url(${backgroundIsrael})`, backgroundSize: "cover" }}>
              <div className="text-center justify-content-around mt-3 mt-md-4">
                <h2 className='p-2'>Israel Reise</h2>
                <p className='p-2 bg-light rounded-4 bg-opacity-75 '>
                  Das ist eine einmalige Gelegenheit, die sich jede und jeder überlegen soll zu ergreifen!<br /><br />1. Begleitung der Kwutza nach Israel <br />2. Koordination mit den Verantwortlichen in Israel </p>   
                <iframe className="w-100" src={israel.formsLink}>..Loading</iframe>
              </div>
            </div>
            : ''}
        </div>
        : ''}
    </div >


  )
}

export default Home
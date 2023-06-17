import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/Context';
import { API_URL, doApiGet, doApiMethod } from '../../../services/apiServices';
import AdminLogin from '../adminLogin';


const WimaHome = () => {

  const { admin, setAdmin } = useContext(AuthContext);
  const nav = useNavigate();
  const [dateWima, setDateWima] = useState({});
  const [dateID, setID] = useState();
  const inputdate = useRef();

  useEffect(() => {
    getDates();
  }, []);

  const getDates = async () => {
    let date = await doApiGet(API_URL + "/daten/" + "wima")
    console.log(date)
    setDateWima(date[0]);
    setID(date[0]._id);
  }

  const changeDate = async (_changedDate) => {
    let url = API_URL + "/daten/" + dateID;
    let updatedDate = { ...dateWima };
    const { name, datum } = updatedDate;
    const newObject = { name, datum };
    newObject.datum = _changedDate;
    console.log(url, newObject)
    let date = await doApiMethod(url, "PUT", newObject)
    getDates();
  }

  return (
    <div className='container'>
      {admin ?
        <div className='row justify-content-center'>
          <div className='col-11 col-md-12 mt-3'>
            <h3>Daten Wima: <span>{dateWima.datum}</span> </h3>
            <input
              className="rounded"
              type="text"
              ref={inputdate}
            />
            <button className='btn btn-secondary m-2' onClick={() => changeDate(inputdate.current.value)}>Change Date</button>
          </div>
          <WimaSheet />
          <ApplicantsWima />
        </div>
        : <div className='container justify-content-center'>
          {async () => alert("Gang dich go ilogge du Globi")}
          <AdminLogin />
        </div>}
    </div>
  )
}

export default WimaHome
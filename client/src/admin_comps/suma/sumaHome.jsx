import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiServices';
import { AuthContext } from '../adminAuth';
import AdminLogin from '../adminLogin';
import ApplicantsSuma from './applicantsSuma'
import SumaSheet from './sumaSheet'

const SumaHome = () => {

  const { admin, setAdmin } = useContext(AuthContext);
  const nav = useNavigate();
  const [dateSuma, setDateSuma] = useState({});
  const [dateID, setID] = useState();
  const inputdate = useRef();

  useEffect(() => {
    getDates();
  }, []);

  const getDates = async () => {
    let date = await doApiGet(API_URL + "/daten/" + "suma")
    console.log(date)
    setDateSuma(date[0]);
    setID(date[0]._id);
  }

  const changeDate = async (_changedDate) => {
    let url = API_URL + "/daten/" + dateID;
    let updatedDate = { ...dateSuma };
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
            <h3>Daten Suma: <span>{dateSuma.datum}</span> </h3>
            <input
              className="rounded"
              type="text"
              ref={inputdate}
            />
            <button className='btn btn-secondary m-2' onClick={() => changeDate(inputdate.current.value)}>Change Date</button>
          </div>
          <SumaSheet />
          <ApplicantsSuma />
        </div>
        : <div className='container justify-content-center'>
          {async () => alert("Gang dich go ilogge du Globi")}
          <AdminLogin />
        </div>}
    </div>
  )
}

export default SumaHome
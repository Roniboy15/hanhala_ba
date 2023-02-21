import React, { useContext, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { API_URL, doApiGet, doApiMethod } from '../../../services/apiServices';
import { AuthContext } from '../adminAuth';
import AdminLogin from '../adminLogin';
import ApplicantsSuma from './applicantsSuma'
import HousesSuma from './housesSuma';
import SumaSheet from './sumaSheet'

const SumaHome = () => {

  const { admin, setAdmin } = useContext(AuthContext);
  const nav = useNavigate();
  const [dateSuma, setDateSuma] = useState({});
  const [dateMessage, setDateMessage] = useState("");
  const [dateButton, setDateButton] = useState("");
  const [dateID, setID] = useState();
  const inputdate = useRef();

  useEffect(() => {
    if (admin) {
      getDates();
    }
  }, [admin]);

  const getDates = async () => {
    let date = await doApiGet(API_URL + "/daten/" + "suma")
    console.log(date)
    if (date.length > 0) {
      setDateButton("Change")
      setDateMessage("Daten Suma: ")
      console.log(date)
      setDateSuma(date[0]);
      setID(date[0]._id);
    }
    else {
      setDateMessage("Gib bitte sofort dDate i: ")
      setDateButton("Confirm");
    }
  }

  const changeDate = async (_changedDate) => {
    let url, method;
    let name, datum;
    let newObject = {};
    if (dateButton === "Change") {
      url = API_URL + "/daten/" + dateID;
      method = "PUT";

      newObject.name = dateSuma.name;
      newObject.datum = _changedDate;
    }
    else {
      url = API_URL + "/daten";
      method = "POST";

      name = "Suma";
      datum = _changedDate;
      newObject.name = name;
      newObject.datum = datum;
    }
    console.log(newObject)


    await doApiMethod(url, method, newObject)
    getDates();
  }

  return (
    <div className='container'>
      {admin ?
        <div className='row justify-content-center'>
          <div className='col-11 col-md-12 mt-3'>
            <h3>{dateMessage}<span>{dateSuma.datum}</span> </h3>
            <input
              className="rounded"
              type="text"
              ref={inputdate}
            />
            <button className='btn btn-secondary m-2' onClick={() => changeDate(inputdate.current.value)}>{dateButton} Date</button>
          </div>
          <SumaSheet />
          <ApplicantsSuma />
          <HousesSuma />
        </div>
        :
        <div className='container justify-content-center'>
          <AdminLogin />
        </div>}
    </div>
  )
}

export default SumaHome
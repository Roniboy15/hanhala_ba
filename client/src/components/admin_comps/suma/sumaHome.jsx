import React, { useContext, useEffect, useRef, useState } from 'react'
import { Form, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/Context';
import { API_URL, doApiGet, doApiMethod } from '../../../services/apiServices';
import AdminLogin from '../adminLogin';
import ApplicantsSuma from './applicantsSuma'
import HousesSuma from './housesSuma';
import SumaSheet from './sumaSheet'
import Websites from './websites';

const SumaHome = () => {

  {/*
  TODO:
  - List of  website to search Houses
  -
*/}

  const { admin, setAdmin } = useContext(AuthContext);
  const nav = useNavigate();
  const [dateSuma, setDateSuma] = useState({});

  const [newDate, setNewDate] = useState("");
  const [dateMessage, setDateMessage] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [dateButton, setDateButton] = useState("");
  const [messageButton, setMessageButton] = useState("");
  const [dateID, setID] = useState();

  useEffect(() => {
    if (admin) {
      getDates();
    }
  }, [admin]);

  useEffect(() => {
    if (dateSuma.datum) {
      setNewMessage(dateSuma.message)
      if (dateSuma.datum) {
        setDateButton("Change")
        setDateMessage("Daten Suma: ")
        //console.log(date)

      }
      else {
        setDateMessage("Gib bitte sofort dDate i: ")
        setDateButton("Confirm");
      }
      if (dateSuma.message) {
        setMessageButton("Change")

      }
      else {
        setMessageButton("Confirm");

      }
    }
  }, [dateSuma])

  const getDates = async () => {
    let date;
    try {
      date = await doApiGet(API_URL + "/daten/" + "suma")
      setDateSuma(date[0]);
      setID(date[0]._id);
    }
    catch (err) {
      console.log("err sumaHmome", err)
    }
    //console.log(date)

  }

  const changeDate = async () => {
    let url, method;
    let name, datum;
    let newObject = {};
    if (dateButton === "Change") {
      url = API_URL + "/daten/" + dateID;
      method = "PUT";

      newObject.name = dateSuma.name;
      newObject.datum = newDate || dateSuma.datum;
      newObject.active = dateSuma.active;

    }
    else {
      url = API_URL + "/daten";
      method = "POST";

      datum = newDate || dateSuma.datum;

      newObject.name = dateSuma.name;
      newObject.datum = datum;
      newObject.active = dateSuma.active;

    }

    await doApiMethod(url, method, newObject)
    getDates();
  }

  const changeMessage = async () => {
    let url, method;
    let newObject = {};
    if (messageButton === "Change") {
      url = API_URL + "/daten/" + dateID;
      method = "PUT";

      newObject.name = dateSuma.name;
      newObject.datum = dateSuma.datum;
      newObject.active = dateSuma.active;
      newObject.message = newMessage || dateSuma.message;
    }
    else {
      url = API_URL + "/daten";
      method = "POST";

      newObject.name = dateSuma.name;
      newObject.datum = dateSuma.datum;
      newObject.active = dateSuma.active;
      newObject.message = newMessage;

    }

    await doApiMethod(url, method, newObject)
    getDates();
  }


  return (
    <div className='container p-1'>
      {admin ?
        <div className='row justify-content-center'>
          <div className='col-11 col-md-12 mt-3'>
            <h3>{dateMessage}<span>{dateSuma.datum}</span> </h3>
            <input
              className="rounded"
              type="text"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
            <button className='btn btn-secondary m-2' onClick={changeDate}>{dateButton} Date</button>

          </div>
          <SumaSheet />
          <ApplicantsSuma />
          <div className='col-11 col-md-10 mt-2 bg-dark-subtle bg-opacity-25 rounded'>
            <Websites />
          </div>
          <div className='col-11 col-md-10 mt-2 bg-dark-subtle bg-opacity-25 rounded'>
            <div className='container p-2'>
              <div className='row'>
                <div className='col-12'>
                  <h3 className='p-1'>Message fürd Hüser</h3>
                 
                  <input
                    as="textarea"
                    className="rounded w-100"
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                  />
                  <button className='btn btn-secondary m-2' onClick={changeMessage}>{messageButton} text</button>

                </div>
              </div>
            </div>
          </div>
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
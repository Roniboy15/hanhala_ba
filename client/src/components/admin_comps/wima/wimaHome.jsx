import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/Context';
import { API_URL, doApiGet, doApiMethod } from '../../../services/apiServices';
import AdminLogin from '../adminLogin';
import ApplicantsWima from './applicantsWima'
import HousesWima from './housesWima';
import WimaSheet from './wimaSheet'
import Websites from './websites';

const WimaHome = () => {

  const { admin, setAdmin } = useContext(AuthContext);
  const [dateWima, setDateWima] = useState({});

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
    if (dateWima.datum) {
      setNewMessage(dateWima.message)
      if (dateWima.datum) {
        setDateButton("Change")
        setDateMessage("Daten Wima: ")
        //console.log(date)

      }
      else {
        setDateMessage("Gib bitte sofort dDate i: ")
        setDateButton("Confirm");
      }
      if (dateWima.message) {
        setMessageButton("Change")

      }
      else {
        setMessageButton("Confirm");

      }
    }
  }, [dateWima])

  const getDates = async () => {
    let date;
    try {
      date = await doApiGet(API_URL + "/daten/" + "wima")
      setDateWima(date[0]);
      setID(date[0]._id);
    }
    catch (err) {
      console.log("err wimaHmome", err)
    }

  }

  const changeDate = async () => {
    let url, method;
    let name, datum;
    let newObject = {};
    if (dateButton === "Change") {
      url = API_URL + "/daten/" + dateID;
      method = "PUT";

      newObject.name = dateWima.name;
      newObject.datum = newDate || dateWima.datum;
      newObject.active = dateWima.active;

    }
    else {
      url = API_URL + "/daten";
      method = "POST";

      datum = newDate || dateWima.datum;

      newObject.name = dateWima.name;
      newObject.datum = datum;
      newObject.active = dateWima.active;

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

      newObject.name = dateWima.name;
      newObject.datum = dateWima.datum;
      newObject.active = dateWima.active;
      newObject.message = newMessage || dateWima.message;
    }
    else {
      url = API_URL + "/daten";
      method = "POST";

      newObject.name = dateWima.name;
      newObject.datum = dateWima.datum;
      newObject.active = dateWima.active;
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
            <h3>{dateMessage}<span>{dateWima.datum}</span> </h3>
            <input
              className="rounded"
              type="text"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
            <button className='btn btn-secondary m-2' onClick={changeDate}>{dateButton} Date</button>

          </div>
          <WimaSheet />
          <ApplicantsWima />
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
          <HousesWima />
        </div>
        :
        <div className='container justify-content-center'>
          <AdminLogin />
        </div>}
    </div>
  )
}

export default WimaHome
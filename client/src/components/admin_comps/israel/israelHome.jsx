import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../../../context/Context';
import { API_URL, doApiGet, doApiMethod } from '../../../services/apiServices';
import AdminLogin from '../adminLogin';
import ApplicantsIsrael from './applicantsIsrael';
import IsraelSheet from './israelSheet'
import Websites from './websites';

const IsraelHome = () => {

  const { admin, setAdmin } = useContext(AuthContext);
  const [dateIsrael, setDateIsrael] = useState({});

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
  }, []);

  useEffect(() => {
    if (dateIsrael.datum) {
      setNewMessage(dateIsrael.message)
      if (dateIsrael.datum) {
        setDateButton("Change")
        setDateMessage("Daten Israel Reise: ")
        //console.log(date)

      }
      else {
        setDateMessage("Gib bitte sofort dDate i: ")
        setDateButton("Confirm");
      }
      if (dateIsrael.message) {
        setMessageButton("Change")

      }
      else {
        setMessageButton("Confirm");

      }
    }
  }, [dateIsrael])

  const getDates = async () => {
    let date;
    try {
      date = await doApiGet(API_URL + "/daten/" + "israel")
      setDateIsrael(date);
      setID(date._id);
    }
    catch (err) {
      console.log("err IsraelHome", err)
    }

  }

  const changeDate = async () => {
    let url, method;
    let name, datum;
    let newObject = {};
    if (dateButton === "Change") {
      url = API_URL + "/daten/" + dateID;
      method = "PUT";

      newObject.name = dateIsrael.name;
      newObject.datum = newDate || dateIsrael.datum;
      newObject.active = dateIsrael.active;

    }
    else {
      url = API_URL + "/daten";
      method = "POST";

      datum = newDate || dateIsrael.datum;

      newObject.name = dateIsrael.name;
      newObject.datum = datum;
      newObject.active = dateIsrael.active;

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

      newObject.name = dateIsrael.name;
      newObject.datum = dateIsrael.datum;
      newObject.active = dateIsrael.active;
      newObject.message = newMessage || dateIsrael.message;
    }
    else {
      url = API_URL + "/daten";
      method = "POST";

      newObject.name = dateIsrael.name;
      newObject.datum = dateIsrael.datum;
      newObject.active = dateIsrael.active;
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
            <h3>{dateMessage}<span>{dateIsrael.datum}</span> </h3>
            <input
              className="rounded"
              type="text"
              value={newDate}
              onChange={(e) => setNewDate(e.target.value)}
            />
            <button className='btn btn-secondary m-2' onClick={changeDate}>{dateButton} Date</button>

          </div>
          <IsraelSheet />
          <ApplicantsIsrael/>
          <div className='col-11 col-md-10 mt-2 bg-dark-subtle bg-opacity-25 rounded'>
            <Websites />
          </div>
          
        </div>
        :
        <div className='container justify-content-center'>
          <AdminLogin />
        </div>}
    </div>
  )
}

export default IsraelHome
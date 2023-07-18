import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext, LoadHouses, LoadHousesContext } from '../../../context/Context';
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

  const [fetchedHouses, setFetchedHouses] = useState([]);
  const [selectedHouseIds, setSelectedHouseIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const { loadHouses, setLoadHouses } = useContext(LoadHousesContext);

  useEffect(() => {
    if (admin) {
      getDates();
    }
  }, [admin]);

  // In your useEffect or other function where you want to fetch the data

  useEffect(() => {
    fetchHouses();
  }, []);

  useEffect(() => {
    fetchHouses();
  }, [loadHouses]);



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

  const fetchHouses = async () => {
    const response = await doApiGet(API_URL + '/houses/email/wima');  // machane would either be 'suma' or 'wima'
    setFetchedHouses(response);
  };

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

  const addDateToMessage = () => {
    let currentMessage = newMessage || dateWima.message;

    // Check if the word 'date' exists in the message
    if (currentMessage.includes("date")) {
      // Replace 'date' with the actual date
      currentMessage = currentMessage.replace("date", dateWima.datum);
    } else {
      // If 'date' is not in the message, replace any date (in 'DD.MM.YY-DD.MM.YY' format) with the actual date
      let dateRegex = /\d{2}\.\d{2}\.\d{2}-\d{2}\.\d{2}\.\d{2}/g;
      currentMessage = currentMessage.replace(dateRegex, dateWima.datum);
    }

    console.log(currentMessage);
    setNewMessage(currentMessage);
  };




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

  const handleCheck = (id) => {
    if (selectedHouseIds.includes(id)) {
      setSelectedHouseIds(selectedHouseIds.filter(houseId => houseId !== id));
    } else {
      setSelectedHouseIds([...selectedHouseIds, id]);
    }
  };

  const handleSelectAllCheck = () => {
    if (!selectAll) {
      setSelectedHouseIds(fetchedHouses.map(house => house._id));
      setSelectAll(true);
    } else {
      setSelectedHouseIds([]);
      setSelectAll(false);
    }
  };


  const sendEmails = async () => {
    try {
      const response = await doApiMethod(API_URL + '/email/sendEmail', "POST", {
        houseIds: selectedHouseIds,
        message: (newMessage || dateWima.message).replace(/\n/g, '<br/>')
      });
      fetchHouses();
      setSelectedHouseIds([]); // Clear the selected houses after sending the emails
      setLoadHouses(!loadHouses)
      console.log('Emails sent successfully!');
    } catch (error) {
      console.error('Failed to send emails:', error.message);
    }
  };





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
                  <textarea
                    className="rounded w-100"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    rows="10"
                  />

                  <button className='btn btn-secondary m-2' onClick={changeMessage}>{messageButton} text</button>
                  <button className='btn btn-secondary m-2' onClick={addDateToMessage}>Add Date to Message</button>
                  <br></br><br></br>
                  {/* Map over the houses and add a checkbox to each */}
                  {fetchedHouses.length < 1 ? "You contacted all houses! Add Houses or activate Wima at existing houses" :
                    <div>
                      <input
                        type="checkbox"
                        checked={selectAll}
                        onChange={handleSelectAllCheck}
                        style={{ marginRight: '10px' }}
                      />
                      Select All
                    </div>
                  }
                  {fetchedHouses.map(house => (
                    <div key={house._id}>
                      <input
                        type="checkbox"
                        checked={selectedHouseIds.includes(house._id)}
                        onChange={() => handleCheck(house._id)}
                        style={{ marginRight: '10px' }}

                      />
                      {house.name}
                    </div>
                  ))}

                  <br></br>
                  {fetchedHouses.length < 1 ? "" :

                    <button className='btn btn-secondary m-2' onClick={sendEmails}>Send Emails</button>
                  }
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
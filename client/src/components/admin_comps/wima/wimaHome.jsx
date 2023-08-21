import React, { useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { AuthContext, LoadHouses, LoadHousesContext } from '../../../context/Context';
import { API_URL, doApiGet, doApiMethod } from '../../../services/apiServices';
import AdminLogin from '../adminLogin';
import ApplicantsWima from './applicantsWima'
import HousesWima from './housesWima';
import WimaSheet from './wimaSheet'
import Websites from './websites';
import useWindowWidth from '../../../general_comps/useWidth';



const WimaHome = () => {

  const { admin, setAdmin } = useContext(AuthContext);
  const [datenWima, setDatenWima] = useState({});

  const [newDatum, setNewDatum] = useState("");
  const [newDatum2, setNewDatum2] = useState("");
  const [newDatum3, setNewDatum3] = useState("");
  const [newDatum4, setNewDatum4] = useState("");

  const [dateMessage, setDateMessage] = useState("");
  const [newMessage, setNewMessage] = useState("");
  const [dateButton, setDateButton] = useState("");
  const [dateID, setID] = useState();

  const [fetchedHouses, setFetchedHouses] = useState([]);
  const [selectedHouseIds, setSelectedHouseIds] = useState([]);
  const [selectAll, setSelectAll] = useState(false);

  const [selectedYear, setSelectedYear] = useState(undefined);

  const [selectedEmail, setSelectedEmail] = useState("");

  const { loadHouses, setLoadHouses } = useContext(LoadHousesContext);

  let  width = useWindowWidth();

  useEffect(() => {
    if (admin) {
      getDates();
    }
  }, [admin]);

  useEffect(() => {
    fetchHouses();
  }, [selectedYear]);

  useEffect(() => {
    addDateToMessageAutomatically();
}, [selectedYear]);


  useEffect(() => {
    fetchHouses();
  }, [loadHouses]);

  useEffect(() => {
    if (datenWima.datum) {
      setNewDatum(datenWima.datum);
      setNewDatum2(datenWima.datum2);
      setNewDatum3(datenWima.datum3);
      setNewDatum4(datenWima.datum4);
    }
    setNewMessage(datenWima.message)
  }, [datenWima])

  const addDateToMessageAutomatically = () => {
    let currentMessage = newMessage || datenWima.message;

    // Based on the selected year, decide which date to use:
    let selectedDate;
    switch (selectedYear) {
        case "1":
            selectedDate = datenWima.datum;
            break;
        case "2":
            selectedDate = datenWima.datum2;
            break;
        case "3":
            selectedDate = datenWima.datum3;
            break;
        case "4":
            selectedDate = datenWima.datum4;
            break;
        default:
            return; // exit the function if no valid year is selected
    }

    if(selectedDate == ""){
      selectedDate = "DATE"
    }

    if (currentMessage.includes("DATE")) {
        currentMessage = currentMessage.replace("DATE", selectedDate);
    } else {
        let dateRegex = /\d{2}\.\d{2}\.\d{4}-\d{2}\.\d{2}\.\d{4}/g;
        if(dateRegex.test(currentMessage)) {
            currentMessage = currentMessage.replace(dateRegex, selectedDate);
        } 
    }

    setNewMessage(currentMessage);
};




  const fetchHouses = async () => {
    console.log(selectedYear)
    if (selectedYear === undefined) return;
    const response = await doApiGet(API_URL + '/houses/email/Wima/' + selectedYear);
    console.log(response)

    setFetchedHouses(response);
  };

  const getDates = async () => {
    let date;
    try {
      date = await doApiGet(API_URL + "/daten/wima")
      setDatenWima(date);
      setID(date._id);

    }
    catch (err) {
      console.log("err wimaHmome", err)
    }

  }



  const getNextYears = (index = 0) => {
    const currentYear = (new Date()).getFullYear();
    return `${currentYear + index}/${currentYear + index + 1}`;
  }


  const changeDate = async (field) => {
    try {
      let url, method;
      let newDatumObject;

      const newDates = {
        "datum": newDatum,
        "datum2": newDatum2,
        "datum3": newDatum3,
        "datum4": newDatum4,
      };

      newDatumObject = { date: newDates[field] };

      url = API_URL + "/daten/" + dateID + "/" + field;
      method = "PUT";

      await doApiMethod(url, method, newDatumObject)
      getDates();
    } catch (error) {
      console.error("Error while changing date:", error.message);
    }
  }

  const changeMessage = async (field) => {
    try {
      let url, method;
      let newDatumObject;

      newDatumObject = { date: newMessage };

      url = API_URL + "/daten/" + dateID + "/" + field;
      method = "PUT";

      await doApiMethod(url, method, newDatumObject)
      getDates();
    } catch (error) {
      console.error("Error while changing message:", error.message);
    }
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

  const isValidEmail = (email) => {
    // Regular expression pattern for basic email validation
    let pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return pattern.test(email);
}

  const sendEmails = async () => {
  if (!isValidEmail(selectedEmail)) {
      alert("Please enter a valid email address from which the mail/s should be sent!");
      return;
  }
  
    if (window.confirm("Are you sure you want to send the email/s?")) {
      try {
        const response = await doApiMethod(API_URL + '/email/sendEmail', "POST", {
          houseIds: selectedHouseIds,
          message: (newMessage || datenWima.message).replace(/\n/g, '<br/>'),
          emailSentField: selectedYear == 1 ? `emailSentWima` : `emailSentWima${selectedYear}`,
          email: selectedEmail
        });
        setSelectedHouseIds([]); // Clear the selected houses after sending the emails
        setLoadHouses(!loadHouses)
        console.log('Emails sent successfully!');
      } catch (error) {
        console.error('Failed to send emails:', error.message);
      }
    } else {
      console.log('Email sending canceled.');
    }
  };








  return (
    <div className='container p-1'>
      {admin ?
        <div className='row justify-content-center'>
          <div className='col-11 col-md-12 mt-3'>
            {
              ["datum", "datum2", "datum3", "datum4"].map((field, index) => (
                <div key={field}>
                  <h3>{getNextYears(index)} : <p style={{ color: 'rgb(59, 94, 168)' }}>{datenWima[field]}</p></h3>
                  <input
                    className="rounded"
                    type="text"
                    value={
                      field === "datum" ? newDatum :
                        field === "datum2" ? newDatum2 :
                          field === "datum3" ? newDatum3 :
                            newDatum4
                    }
                    onChange={(e) => {
                      if (field === "datum") setNewDatum(e.target.value)
                      else if (field === "datum2") setNewDatum2(e.target.value)
                      else if (field === "datum3") setNewDatum3(e.target.value)
                      else if (field === "datum4") setNewDatum4(e.target.value)
                    }}
                  />
                  <button className='btn btn-secondary m-2' onClick={() => changeDate(field)}>{datenWima[field] ? "Change" : "Confirm"}</button>
                </div>
              ))
            }
          </div>
          <WimaSheet />
          <ApplicantsWima />
          <Websites />
          <div className='col-11 col-md-12 mt-2 bg-dark-subtle bg-opacity-25 rounded'>
            <div className='container p-2'>
              <div className='row'>
                <div className='col-12'>

                  <h3 className='p-1'>Häuser Kontaktieren</h3>

                  {/* Year Selection */}
                  <div style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'start',
                    marginBottom: '10px'
                  }}>
                    <label
                      htmlFor="yearSelection"
                      style={{
                        marginBottom: '5px',
                        fontSize: '16px',
                        color: '#333'
                      }}
                    >
                      Select Year:
                    </label>
                    <select
                      id="yearSelection"
                      value={selectedYear}
                      onChange={(e) => setSelectedYear(e.target.value)}
                      style={{
                        width: '200px',
                        padding: '10px',
                        fontSize: '16px',
                        color: '#333',
                        border: '1px solid #ccc',
                        borderRadius: '5px'
                      }}
                    >
                      <option value={undefined}>Select Year</option>
                      <option value="1">{getNextYears()}</option>
                      <option value="2">{getNextYears(1)}</option>
                      <option value="3">{getNextYears(2)}</option>
                      <option value="4">{getNextYears(3)}</option>
                    </select>
                  </div>

                  <textarea
                    className="rounded w-100"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    rows={width<500? "15" : "10"}
                  />

                  <button className='btn btn-secondary m-2' onClick={() => changeMessage("message")}>Save text</button>
                  
                  <br></br><br></br>
                  {/* Map over the houses and add a checkbox to each */}
                  {selectedYear === undefined ? "Choose a year!" : fetchedHouses.length < 1 ? "You contacted all houses! Add Houses or activate Wima at existing houses" :
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
                    <>
                      <h5>Enter your email</h5>
                      <input onInput={(e) => setSelectedEmail(e.target.value)}></input>
                    </>
                  }

                  <br></br>
                  {fetchedHouses.length < 1 ? "" :

                    <button className='btn btn-secondary mt-3' onClick={() => sendEmails()}>Send Emails from "{selectedEmail}"</button>
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
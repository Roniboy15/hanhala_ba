import React, { useEffect, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom';
import PagesComp from '../../../general_comps/pagesComp';
import useWindowWidth from '../../../general_comps/useWidth';
import { API_URL, doApiGet, doApiMethod } from '../../../services/apiServices'
import AddApplicantModal from './addApplicantModal';
import AddHouseModal from './addHouseModal';
import './sumaCSS/sumaHome.css'

export default function HousesSuma() {

  {/*TODO: 
  -Add edit houses
*/}
  const [addHouseModalOpen, setAddHouseModalOpen] = useState(false);
  const [addHouseModalEditOpen, setAddHouseModalEditOpen] = useState(false);
  const [house, setHouse] = useState({});


  const [getQuery] = useSearchParams();
  const [houses, setHouses] = useState([]);
  const [loading, setLoading] = useState(false);
  let width = useWindowWidth();

  const doApi = async () => {

    let url = `${API_URL}/houses/all/?machane=suma&sort=suma_position`;

    try {
      let data = await doApiGet(url);
      //console.log("data", data);
      setHouses(data)
      setLoading(false)
    }
    catch (err) {
      console.log("err Houses", err)
      alert("There problem , come back late")
    }
  }

  const renumber = async () => {
    const promises = houses.map((house, i) => {
      return doApiMethod(`${API_URL}/houses/position/?_id=${house._id}&position=${i + 1}&key=suma_position`, "PATCH", {});
    });
    await Promise.all(promises);
    console.log("success");
  };

  useEffect(() => {
    doApi()
  }, []);

  useEffect(() => {
    renumber();
  }, [houses]);


  const changeHousePriority = async (houseId, housePos, direction) => {
    console.log("pos:", housePos)
    if (direction === "up" && housePos > 1) {
      const otherHouse = houses[housePos - 2]._id;
      const newPos = housePos - 1;
      console.log("new pos:", newPos);
      console.log("other ID:", otherHouse);
      try {
        await doApiMethod(API_URL + '/houses/position/?_id=' + houseId + '&position=' + newPos + '&key=suma_position', "PATCH", {})
        await doApiMethod(API_URL + '/houses/position/?_id=' + otherHouse + '&position=' + housePos + '&key=suma_position', "PATCH", {})
      }
      catch (err) {
        console.log("pos-err", err);
      }
    } else if (direction === "down" && houses.length > housePos) {
      const otherHouse = houses[housePos]._id;
      const newPos = housePos + 1;
      console.log("new pos:", newPos);
      console.log("other ID:", otherHouse);
      try {
        await doApiMethod(API_URL + '/houses/position/?_id=' + houseId + '&position=' + newPos + '&key=suma_position', "PATCH", {})
        await doApiMethod(API_URL + '/houses/position/?_id=' + otherHouse + '&position=' + housePos + '&key=suma_position', "PATCH", {})
      }
      catch (err) {
        console.log("pos-err, houses", err);
      }
    }
    doApi()
  };

  const handleAddHouse = async (newHouse) => {
    console.log("add House", newHouse)
    try {
      const data = await doApiMethod(API_URL + '/houses/newHouse', "POST", newHouse);
      setHouses([...houses, data]);

    }
    catch (err) {
      console.log("new house", err)
    }
    setAddHouseModalOpen(false);
  };

  const handleEditHouse = async (newHouse) => {
    try {
      await doApiMethod(API_URL + '/houses/edit/' + house._id, "PUT", newHouse);
      setHouse({});
    }
    catch (err) {
      console.log("edit house", err)
    }
    setAddHouseModalEditOpen(false);
    doApi()
  };

  const changeStatus = async (_id, color) => {
    try {
      await doApiMethod(API_URL + '/houses/interest/?_id=' + _id + '&interest=' + color, "PATCH", {});
    }
    catch (err) {
      console.log("patch status:", err);
    }
    doApi();
  }

  const deleteHouse = async (_delId) => {

    let url = API_URL + "/houses/delete/" + _delId;
    try {
      let data = await doApiMethod(url, "DELETE");
      if (data.deletedCount) {
        alert("Huus glöscht!");
        doApi();
      }
    }
    catch (err) {
      console.log(err)
      alert("Problemi")
    }

  }

  return (
    <div className='col-11 col-md-10 mt-2 bg-dark-subtle bg-opacity-25 rounded'>
      <h3 className='p-2'>Suma Hüser</h3>
      <h5><option className='bg-success btn p-0'>⇧</option> promising</h5>
      <h5><option className='bg-warning btn p-0'>⇨</option> pending</h5>
      <h5><option className='bg-danger btn p-0'>⇩</option> negative</h5>
      <div className='houseList'>
        <table style={{ borderSpacing: "10px" }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Priority</th>
              <th>Status</th>
              <th>Website</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Info</th>
              <th>Actions</th>
              <th>Place</th>
            </tr>
          </thead>
          <tbody>
            {houses.map((item, i) => {
              //let myDate = item.date.substring(0,10);

              return (
                <tr key={item._id}>
                  <td>{item.name}</td>
                  <td>
                    <button className="btn" onClick={() => changeHousePriority(item._id, item.suma_position, "up")}>&uarr;</button>
                    <button className="btn" onClick={() => changeHousePriority(item._id, item.suma_position, "down")}>&darr;</button>

                  </td>
                  <td>
                    <select value={item.interest} className="btn m-2" style={{ backgroundColor: `${item.interest}` }} onChange={(event) => {
                      changeStatus(item._id, event.target.value);

                    }}>
                      <option value="green">⇧</option>
                      <option value="orange">⇨</option>
                      <option value="red">⇩</option>
                    </select>

                  </td>
                  <td style={{ maxWidth: "30vw", overflowX: "scroll" }}>
                    <a href={item.url} target='_blank'>{item.url.slice(0, 20)}</a>
                  </td>
                  <td><a className='unstyled' target={'_blank'} href={`mailto:${item.email}`}>{item.email}</a></td>
                  <td><a className='unstyled' target={'_blank'} href={`tel:${item.phone}`}>{item.phone}</a></td>
                  {width < 600 ? <td title={item.info}>{item.info.substring(0, 10)}...</td> : <td> {item.info}</td>
                  }
                 



                  <td>
                    <button className="btn btn-danger m-2" onClick={() => {
                      if (window.confirm("Überleg nomal!")) {
                        deleteHouse(item._id)
                      }
                    }}>X</button>

                    <button className="btn btn-warning m-2" onClick={() => {
                      setHouse(item);
                      setAddHouseModalEditOpen(true);
                    }}>Edit</button>

                  </td>
                  <td>{item.place}</td>

                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
      <button className="btn btn-warning m-2" onClick={() => {
        setTimeout(() => {
          window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });

        }, 300)
        setAddHouseModalOpen(true);
      }}>Add House</button>

      {addHouseModalOpen && (

        <AddHouseModal onSave={handleAddHouse} onClose={() => setAddHouseModalOpen(false)} />
      )}
    </div>

  )
}

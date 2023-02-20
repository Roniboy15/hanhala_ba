import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import PagesComp from '../../../general_comps/pagesComp';
import useWindowWidth from '../../../general_comps/useWidth';
import { API_URL, doApiGet, doApiMethod } from '../../../services/apiServices'
import './sumaCSS/sumaHome.css'

export default function HousesSuma() {

  {/*TODO: 
  -Save the order of the applicants! until now its just locally.
  -Add buttons to change color of applicants ( status )
  -Add button to edit applicant and houses
  -Add option for adding House! like applicant.
*/}


  const [getQuery] = useSearchParams();
  const [ar, setArr] = useState([]);
  const [loading,setLoading] = useState(false);
  let width = useWindowWidth();

  useEffect(() => {
    setLoading(true);
    doApi();
  }, [getQuery])

  const doApi = async () => {
    let perPage = getQuery.get("perPage") || 5;
    let page = getQuery.get("page") || 1;

    let url = `${API_URL}/houses/all?page=${page}&perPage=${perPage}&machane=suma`;
    
    try {
      let data = await doApiGet(url);
      console.log(data);
      setArr(data);
      setLoading(false)
    }
    catch (err) {
      console.log(err)
      alert("There problem , come back late")
    }
  }

  const onXClick = async(_delId) => {
    if(!window.confirm("Delete House?")){
      return ;
    }
    let url = API_URL + "/houses/delete/"+_delId;
    try{
      let data = await doApiMethod(url, "DELETE");
      if(data.deletedCount){
        alert("Huus glöscht!");
        doApi();
      }
    }
    catch(err){
      console.log(err)
      alert("There problem , come back late")
    }
    
  }

  return (
    <div className='col-11 col-md-10 p-2 mt-2 bg-dark-subtle bg-opacity-25 rounded'>
      <h3>Suma Hüser</h3>
      {/* apiPages-> בקשה כדי שיחזיר כמות ומספר עמודים */}
      <PagesComp apiPages={API_URL+"/houses/count?perPage=5"} linkTo={"/admin/sommermachane?page="} linkCss={"btn btn-warning me-2"} />
      {loading && <h3>Loading...</h3>}
      <div className='HouseList'>

      <table className='table table-striped '>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Info</th>
            <th>Website</th>
          </tr>
        </thead>
        <tbody>
          {ar.map((item,i) => {
            //let myDate = item.date.substring(0,10);
          
            return (
              <tr key={item._id}>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                {width < 600 ? <td title={item.info}>{item.info.substring(0,10)}...</td> : <td> {item.info}</td>
          }
                <td>{item.url}</td>
                <td>
                  <button onClick={() => {
                    onXClick(item._id);
                  }} className='bg-danger btn text-white'>X</button>
                </td>
              </tr>
            )
          })}
        </tbody>
      </table>
      </div>
    </div>
  )
}

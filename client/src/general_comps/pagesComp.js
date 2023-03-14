import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import { doApiGet } from '../services/apiServices'

export default function PagesComp(props) {
  // TODO: להבין כמה עמודים יש לי בפרוייקט
  const [pages,setPages] = useState();

  useEffect(() => {
    doApi();
  },[])

  const doApi = async() => {
    let resp = await doApiGet(props.apiPages);
   // console.log(resp);
    setPages(resp.pages);
  }


  return (
    <div>
      <span>Page: </span>
      {[...Array(pages)].map((item,i) => {
        return(
          <Link to={props.linkTo+(i+1)} key={i} className={props.linkCss}>{i+1}</Link>
        )
      })}
    </div>
  )
}

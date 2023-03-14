import React from 'react';
import img from '../images/loading.png';

const LoadingIcon = () => {
  return (
    <div className='container justify-content-center text-center'>
      <h2 className="loading-icon p-4">Chli Geduld...</h2>
      <img alt='loading_img' style={{height:"350px", borderRadius:"150px"}} src={img}/>
    </div>
  );
};

export default LoadingIcon;

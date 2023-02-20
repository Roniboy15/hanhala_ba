import React, { useState, useEffect } from 'react';

const SumaSheet = () => {
 

  return (
    <div className='col-11 col-md-10 p-2 mt-3 bg-dark-subtle bg-opacity-25 rounded'>
      <h3 >Antworten von Google Forms</h3>
     <iframe style={{height:"30vh"}} className='w-100 p-2 border rounded shadow' src="https://docs.google.com/spreadsheets/d/e/2PACX-1vQtMBwIT80vS6DcvvWJGICp3uJvRpMpb8PvRIryRIgoxSL7XXnXLbStUqehtZ5Ejj-Vjh9gfaHEJU4N/pubhtml?widget=true&amp;headers=false"></iframe>
    </div>
  );
}

export default SumaSheet;

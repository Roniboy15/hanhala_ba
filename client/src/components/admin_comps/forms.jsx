import React, { useEffect, useState } from 'react'
import { API_URL, doApiGet, doApiMethod } from '../../services/apiServices'

const Forms = () => {

    const [suma, setSuma] = useState({});
    const [wima, setWima] = useState({});
    const [sayarim, setSayarim] = useState({});
    const [israel, setIsrael] = useState({});

    const getData = async (_machane) => {
        try {
            const dataSuma = await doApiGet(API_URL+'/daten/suma');
            console.log(dataSuma)
            setSuma(dataSuma);
            console.log(suma)
            //     wima = await doApiGet('/daten/wima');
            //     sayarim = await doApiGet('/daten/sayarim');
            //     israel = await doApiGet('/daten/israel');
        }
        catch (err) {
            console.log(err)
        }
    }

    const updateMachane = async (_machane) => {
        let url;
        let newObject = {};
        if (_machane == "suma") {
            url = API_URL + '/daten/' + suma._id;
            newObject = suma;
        }
        if (_machane == "wima") {
            url = API_URL + '/daten/' + wima._id;
            newObject = wima;
        }
        if (_machane == "sayarim") {
            url = API_URL + '/daten/' + sayarim._id;
            newObject = sayarim;
        }
        if (_machane == "israel") {
            url = API_URL + '/daten/' + israel._id;
            newObject = israel;
        }

        try {
            let data = await doApiMethod(url, "PUT", newObject)
            console.log(data);
        }
        catch (err) {
            console.log(err)
        }

    }

    useEffect(() => {
        getData();
    }, [])

    return (
        <div className='container'>
            <div className='row'>
                <h2>Update vo de Google Forms</h2>
                <div className='col-12 col-md-10'>

                    <h3>Summermachane</h3>
                    <h2>IS {suma._id}</h2>

                    <label htmlFor="isActive">Select status:</label>
                    <select
                        id="isActive"
                        value={suma.active}
                        onChange={(e) => {
                            if (suma.active == false) suma.active = true;
                            else suma.active = false;
                            updateMachane("suma")
                        }
                        }
                    >
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>

                    <br />

                    <label htmlFor="formsLink">Google Forms link:</label>
                    <input
                        id="formsLink"
                        type="text"
                        value={suma.formsLink}
                        onChange={(e) => {
                            suma.formsLink = e.target.value;
                            updateMachane("suma")
                        }
                        } />

                    <br />

                    <label htmlFor="spreadsheetLink">Google Spreadsheet link:</label>
                    <input
                        id="spreadsheetLink"
                        type="text"
                        value={suma.spreadLink}
                        onChange={(e) => {}}
                    />
                </div>

            </div>

        </div>
    )
}

export default Forms
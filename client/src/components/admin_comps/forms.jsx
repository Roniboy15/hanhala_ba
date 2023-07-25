import React, { useEffect, useState } from 'react';
import { API_URL, doApiGet, doApiMethod } from '../../services/apiServices';

const Forms = () => {

    const [suma, setSuma] = useState({});
    const [wima, setWima] = useState({});
    const [sayarim, setSayarim] = useState({});
    const [israel, setIsrael] = useState({});

    const [sumaID, setSumaID] = useState('');
    const [wimaID, setWimaID] = useState('');
    const [sayarimID, setSayarimID] = useState('');
    const [israelID, setIsraelID] = useState('');

    const getData = async () => {
        try {
            const dataSuma = await doApiGet(`${API_URL}/daten/Suma`);
            setSumaID(dataSuma._id);

            const filteredData = {
                name: dataSuma.name,
                datum: dataSuma.datum,
                formsLink: dataSuma.formsLink,
                spreadLink: dataSuma.spreadLink,
                active: dataSuma.active
            };

            setSuma(filteredData);

            const dataWima = await doApiGet(`${API_URL}/daten/Wima`);
            //console.log(dataWima);
            setWimaID(dataWima._id);

            const filteredDataWima = {
                name: dataWima.name,
                datum: dataWima.datum,
                formsLink: dataWima.formsLink,
                spreadLink: dataWima.spreadLink,
                active: dataWima.active
            };

            setWima(filteredDataWima);

            const dataSayarim = await doApiGet(`${API_URL}/daten/Sayarim`);
            //console.log(dataSayarim)
            setSayarimID(dataSayarim._id);

            const filteredDataSayarim = {
                name: dataSayarim.name,
                datum: dataSayarim.datum,
                formsLink: dataSayarim.formsLink,
                spreadLink: dataSayarim.spreadLink,
                active: dataSayarim.active
            };

            setSayarim(filteredDataSayarim);

            const dataIsrael = await doApiGet(`${API_URL}/daten/israel`);
           // console.log(dataIsrael);
            setIsraelID(dataIsrael._id);

            const filteredDataIsrael = {
                name: dataIsrael.name,
                datum: dataIsrael.datum,
                formsLink: dataIsrael.formsLink,
                spreadLink: dataIsrael.spreadLink,
                active: dataIsrael.active
            };

            setIsrael(filteredDataIsrael);

        } catch (err) {
            console.log('forms suma', err);
        }
    };

    const updateMachane = async (_machane) => {
        let url;
        let newObject = {};

        if (_machane === 'suma') {
            url = `${API_URL}/daten/${sumaID}`;
            newObject = suma;
        }
        if (_machane === 'wima') {
            url = `${API_URL}/daten/${wimaID}`;
            newObject = wima;
        }
        if (_machane === 'sayarim') {
            url = `${API_URL}/daten/${sayarimID}`;
            newObject = sayarim;
        }
        if (_machane === 'israel') {
            url = `${API_URL}/daten/${israelID}`;
            newObject = israel;
        }

        try {
            await doApiMethod(url, 'PUT', newObject);
           // console.log(data);
            getData();
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="container p-2 mt-4">
            <h2>Update Google Forms</h2>

            <div className="row justify-content-center p-1">
                <div className="col-12 col-md-10 bg-secondary bg-opacity-25 p-3 rounded m-2">
                    <h3>Summermachane</h3>

                    <div className="form-group">
                        <label htmlFor="isActive">Select status:</label>
                        <select
                            className={suma.active?"form-control w-auto m-2 bg-success" : "form-control w-auto m-2 bg-danger"}
                            id="isActive"
                            value={suma.active ? 'active' : 'inactive'}
                            onChange={(e) => {
                                if (suma.active === false) {
                                    suma.active = true;
                                } else {
                                    suma.active = false;
                                }
                                updateMachane('suma');

                            }}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="formsLink">Google Forms link:</label>
                        <input
                            className="form-control m-2"
                            id="formsLink"
                            type="text"
                            value={suma.formsLink}
                            onChange={(e) => {
                                setSuma({ ...suma, formsLink: e.target.value });
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="spreadsheetLink">Google Spreadsheet link:</label>
                        <input
                            className="form-control m-2"
                            id="spreadsheetLink"
                            type="text"
                            value={suma.spreadLink}
                            onChange={(e) => {
                                setSuma({ ...suma, spreadLink: e.target.value });
                            }}
                        />
                    </div>

                    <button
                        className="btn btn-primary m-2"
                        onClick={() => {
                            updateMachane('suma');
                        }}
                    >
                        Change Links
                    </button>
                </div>

                <div className="col-12 col-md-10 bg-secondary bg-opacity-25 p-3 rounded m-2">
                    <h3>Wintermachane</h3>

                    <div className="form-group">
                        <label htmlFor="isActive">Select status:</label>
                        <select
                            className={wima.active?"form-control w-auto m-2 bg-success" : "form-control w-auto m-2 bg-danger"}
                            id="isActive"
                            value={wima.active ? 'active' : 'inactive'}
                            onChange={(e) => {
                                if (wima.active === false) {
                                    wima.active = true;
                                } else {
                                    wima.active = false;
                                }
                                updateMachane('wima');

                            }}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="formsLink">Google Forms link:</label>
                        <input
                            className="form-control m-2"
                            id="formsLink"
                            type="text"
                            value={wima.formsLink}
                            onChange={(e) => {
                                setWima({ ...wima, formsLink: e.target.value });
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="spreadsheetLink">Google Spreadsheet link:</label>
                        <input
                            className="form-control m-2"
                            id="spreadsheetLink"
                            type="text"
                            value={wima.spreadLink}
                            onChange={(e) => {
                                setWima({ ...wima, spreadLink: e.target.value });
                            }}
                        />
                    </div>

                    <button
                        className="btn btn-primary m-2"
                        onClick={() => {
                            updateMachane('wima');
                        }}
                    >
                        Change Links
                    </button>
                </div>

                <div className="col-12 col-md-10 bg-secondary bg-opacity-25 p-3 rounded m-2">
                    <h3>Sayarim</h3>

                    <div className="form-group">
                        <label htmlFor="isActive">Select status:</label>
                        <select
                            className={sayarim.active?"form-control w-auto m-2 bg-success" : "form-control w-auto m-2 bg-danger"}
                            id="isActive"
                            value={sayarim.active ? 'active' : 'inactive'}
                            onChange={(e) => {
                                if (sayarim.active === false) {
                                    sayarim.active = true;
                                } else {
                                    sayarim.active = false;
                                }
                                updateMachane('sayarim');

                            }}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="formsLink">Google Forms link:</label>
                        <input
                            className="form-control m-2"
                            id="formsLink"
                            type="text"
                            value={sayarim.formsLink}
                            onChange={(e) => {
                                setSayarim({ ...sayarim, formsLink: e.target.value });
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="spreadsheetLink">Google Spreadsheet link:</label>
                        <input
                            className="form-control m-2"
                            id="spreadsheetLink"
                            type="text"
                            value={sayarim.spreadLink}
                            onChange={(e) => {
                                setSayarim({ ...sayarim, spreadLink: e.target.value });
                            }}
                        />
                    </div>

                    <button
                        className="btn btn-primary m-2"
                        onClick={() => {
                            updateMachane('sayarim');
                        }}
                    >
                        Change Links
                    </button>
                </div>

                <div className="col-12 col-md-10 bg-secondary bg-opacity-25 p-3 rounded m-2">
                    <h3>Israel Reis</h3>

                    <div className="form-group">
                        <label htmlFor="isActive">Select status:</label>
                        <select
                            className={israel.active?"form-control w-auto m-2 bg-success" : "form-control w-auto m-2 bg-danger"}
                            id="isActive"
                            value={israel.active ? 'active' : 'inactive'}
                            onChange={(e) => {
                                if (israel.active === false) {
                                    israel.active = true;
                                } else {
                                    israel.active = false;
                                }
                                updateMachane('israel');

                            }}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                    </div>

                    <div className="form-group">
                        <label htmlFor="formsLink">Google Forms link:</label>
                        <input
                            className="form-control m-2"
                            id="formsLink"
                            type="text"
                            value={israel.formsLink}
                            onChange={(e) => {
                                setIsrael({ ...israel, formsLink: e.target.value });
                            }}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="spreadsheetLink">Google Spreadsheet link:</label>
                        <input
                            className="form-control m-2"
                            id="spreadsheetLink"
                            type="text"
                            value={israel.spreadLink}
                            onChange={(e) => {
                                setIsrael({ ...israel, spreadLink: e.target.value });
                            }}
                        />
                    </div>

                    <button
                        className="btn btn-primary m-2"
                        onClick={() => {
                            updateMachane('israel');
                        }}
                    >
                        Change Links
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Forms;

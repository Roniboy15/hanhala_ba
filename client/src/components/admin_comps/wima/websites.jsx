import React, { useEffect, useState } from 'react';
import { API_URL, doApiGet, doApiMethod } from '../../../services/apiServices';
const Websites = () => {

    const [websites, setWebsites] = useState([]);
    const [newWebsite, setNewWebsite] = useState({});

    const fetchWebsites = async () => {
        try {
            const data = await doApiGet(API_URL + '/websites/all');
            setWebsites(data);
        }
        catch (err) {
            console.log("websites get", err)
        }
    }

    useEffect(() => {
        fetchWebsites();
    }, [])

    const handleDelete = async (id) => {
        try {
            await doApiMethod(API_URL + '/websites/delete/' + id, "DELETE", {});
            fetchWebsites();
        }
        catch (err) {
            console.log("website delete", err);
        }
    }
    const handleAdd = async (e) => {
        e.preventDefault();
        try {
            const data = await doApiMethod(API_URL + '/websites/newWebsite', "POST", newWebsite);
        }
        catch (err) {
            console.log("website add", err);
        }
        fetchWebsites();
    }

    return (
        <div className='col-11 col-md-12 mt-2 bg-dark-subtle bg-opacity-25 rounded'>

            <div className="container p-2">
                <div className="row">
                    <div className="col">
                        <h3>Websites vo Hüüser</h3>
                        <ul className="list-group mt-3">
                            {websites.map(w => (
                                <li style={{overflowX: "hidden" }} className="list-group-item d-flex justify-content-between align-items-center p-1" key={w._id}>
                                    <a style={{maxWidth:"30vw"}} href={w.url} target="_blank" rel="noopener noreferrer">{w.url.slice(0, 20)+"..."}</a>
                                    <button className="btn btn-danger" onClick={() => {
                                    if (window.confirm("Sicher?")) {
                                        handleDelete(w._id);
                                    }
                                } }>Delete</button>
                                </li>
                                
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="row mt-2">
                    <div className="col">
                        <form onSubmit={handleAdd}>
                            <div className="form-group">
                                <label htmlFor="url">URL</label>
                                <input type="text" className="form-control p-1" id="url" onChange={(e) => setNewWebsite({ url: e.target.value })} placeholder="Enter the URL of the website" />
                            </div>
                            <button className="btn btn-primary p-1 mt-2" type="submit">Add Website</button>
                        </form>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Websites;

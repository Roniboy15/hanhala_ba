import axios from "axios";
import React, { useState, useEffect, useRef } from "react";
import { API_URL } from "../../../services/apiServices";
import { doApiGet, doApiMethod } from "../../../services/apiServices";
import AddApplicantModal from "./addApplicantModal";
import EditApplicantModal from "./editApplicantModal";
import './sumaCSS/sumaHome.css'



const ApplicantsSuma = () => {
    const [applicants, setApplicants] = useState([]);
    const [addApplicantModalOpen, setAddApplicantModalOpen] = useState(false);
    const [addApplicantModalEditOpen, setAddApplicantModalEditOpen] = useState(false);
    const [applicant, setApplicant] = useState({});
    const [loading, setLoading] = useState(false);

    const applicantsListRef = useRef(null);


    const fetchApplicants = async () => {
        try {
            const data = await doApiGet(API_URL + '/applicants/allApplicants/?camp=suma&sort=suma_position');
            setApplicants(data);
        } catch (err) {
            console.log("applicants", err);
        }
    };


    const renumber = async () => {
        const promises = applicants.map((applicant, i) => {
            return doApiMethod(`${API_URL}/applicants/position/?_id=${applicant._id}&position=${i + 1}&key=suma_position`, "PATCH", {});
        });
        await Promise.all(promises);
        console.log("success");
    };
    useEffect(() => {
        fetchApplicants();
    }, []);

    useEffect(() => {
        renumber();
    }, [applicants]);

   

    const deleteApplicant = async (applicantId) => {
        try {
            await doApiMethod(API_URL + "/applicants/" + applicantId, "DELETE");

        }
        catch (err) {
            console.log("applicants delete", err)
        }
        const updatedApplicants = applicants.filter((applicant) => applicant._id !== applicantId);
        setApplicants(updatedApplicants);
    };

    const changeApplicantPriority = async (applicantId, applicantPos, direction) => {
        console.log("pos:", applicantPos)
        if (direction === "up" && applicantPos > 1) {
            const otherApplicant = applicants[applicantPos - 2]._id;
            const newPos = applicantPos - 1;
            console.log("new pos:", newPos);
            console.log("other ID:", otherApplicant);
            try {
                await doApiMethod(API_URL + '/applicants/position/?_id=' + applicantId + '&position=' + newPos + '&key=suma_position', "PATCH", {})
                await doApiMethod(API_URL + '/applicants/position/?_id=' + otherApplicant + '&position=' + applicantPos + '&key=suma_position', "PATCH", {})
            }
            catch (err) {
                console.log("pos-err", err);
            }
        } else if (direction === "down" && applicants.length > applicantPos) {
            const otherApplicant = applicants[applicantPos]._id;
            const newPos = applicantPos + 1;
            console.log("new pos:", newPos);
            console.log("other ID:", otherApplicant);
            try {
                await doApiMethod(API_URL + '/applicants/position/?_id=' + applicantId + '&position=' + newPos + '&key=suma_position', "PATCH", {})
                await doApiMethod(API_URL + '/applicants/position/?_id=' + otherApplicant + '&position=' + applicantPos + '&key=suma_position', "PATCH", {})
            }
            catch (err) {
                console.log("pos-err", err);
            }
        }
        fetchApplicants();
    };

    const handleAddApplicant = async (newApplicant) => {
        console.log(newApplicant)

        try {
            const data = await doApiMethod(API_URL + '/applicants', "POST", newApplicant);
            setApplicants([...applicants, data]);

        }
        catch (err) {
            console.log("new applicant", err)
        }
        setAddApplicantModalOpen(false);
       
    };


    const handleEditApplicant = async (newApplicant) => {
        try {
            await doApiMethod(API_URL + '/applicants/' + applicant._id, "PUT", newApplicant);
            setApplicant({});
        }
        catch (err) {
            console.log("edit applicant", err)
        }
        setAddApplicantModalEditOpen(false);
        fetchApplicants()
    };

    const changeStatus = async (_id, color) => {
        try {
            await doApiMethod(API_URL + '/applicants/interest/?_id=' + _id + '&interest=' + color, "PATCH", {});
        }
        catch (err) {
            console.log("patch status:", err);
        }
        fetchApplicants();
    }

    const scrollToBottom = () => {
        applicantsListRef.current.scrollIntoView({ behavior: "smooth" });
    };

    return (
        <div className='col-11 col-md-10 mt-2 bg-dark-subtle bg-opacity-25 rounded'>

            <h3 className="p-2">Konkrete Kandidaten</h3>
            <div className="applicantsList" >
                <table style={{ borderSpacing: "10px" }}>
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Priority</th>
                            <th>Status</th>
                            <th>Age</th>
                            <th>Phone</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {applicants.map((applicant) => (
                            <tr key={applicant._id}>
                                <td>{applicant.name}</td>
                                <td>
                                    <button className="btn" onClick={() => changeApplicantPriority(applicant._id, applicant.suma_position, "up")}>&uarr;</button>
                                    <button className="btn" onClick={() => changeApplicantPriority(applicant._id, applicant.suma_position, "down")}>&darr;</button>

                                </td>
                                <td>
                                    <select value={applicant.interest} className="btn m-2" style={{ backgroundColor: `${applicant.interest}` }} onChange={(event) => {
                                        changeStatus(applicant._id, event.target.value);

                                    }}>
                                        <option value="green">⇧</option>
                                        <option value="orange">⇨</option>
                                        <option value="red">⇩</option>
                                    </select>

                                </td>
                                <td>{applicant.age}</td>
                                <td>
                                    <a className='unstyled' target={'_blank'} href={`tel:${applicant.phone}`}>{applicant.phone}
                                    </a>
                                </td>
                                <td style={{ maxWidth: "30px", overflowX: "scroll" }}>
                                    <a className='unstyled' target={'_blank'} href={`mailto:${applicant.email}`}>{applicant.email}
                                    </a>
                                </td>

                                <td>
                                    <button className="btn btn-danger m-2" onClick={() => {
                                        if (window.confirm("Überleg nomal!")) {
                                            deleteApplicant(applicant._id)
                                        }
                                    }}>X</button>

                                    <button className="btn btn-warning m-2" onClick={() => {
                                        setTimeout(() => {
                                            window.scrollTo({ top: 1000, behavior: 'smooth' });

                                        }, 300)
                                        setApplicant(applicant);
                                        setAddApplicantModalEditOpen(true);
                                    }}>Edit</button>


                                </td>

                            </tr>
                        ))}


                    </tbody>
                </table>
                {addApplicantModalEditOpen && (

                    <EditApplicantModal app={applicant} onSave={handleEditApplicant} onClose={() => setAddApplicantModalEditOpen(false)} />
                )}
            </div>

            <button className="btn btn-warning btn-sm mb-2 ml-2" onClick={() => {
                setAddApplicantModalOpen(true);
                setTimeout(()=>{
                    scrollToBottom();
                },1000)
            }}>Add Applicant</button>

            {addApplicantModalOpen && (

                <AddApplicantModal ref={applicantsListRef}  onSave={handleAddApplicant} onClose={() => setAddApplicantModalOpen(false)} />
            )}
        </div>
    );
};

export default ApplicantsSuma;

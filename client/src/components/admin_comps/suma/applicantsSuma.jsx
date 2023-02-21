import React, { useState, useEffect, useRef } from "react";
import { API_URL } from "../../../services/apiServices";
import { doApiGet, doApiMethod } from "../../../services/apiServices";
import AddApplicantModal from "./addApplicantModal";
import './sumaCSS/sumaHome.css'



const ApplicantsSuma = () => {
    const [applicants, setApplicants] = useState([]);
    const [addApplicantModalOpen, setAddApplicantModalOpen] = useState(false);


    const fetchApplicants = async () => {
        try {
            const data = await doApiGet(API_URL + '/applicants/allApplicants');
            console.log(data)
            setApplicants(data);
        }
        catch (err) {
            console.log("applicants", err);
        }

    };



    const deleteApplicant = async (applicantId) => {
        await doApiMethod(API_URL + "/applicants/" + applicantId, "DELETE");
        const updatedApplicants = applicants.filter((applicant) => applicant._id !== applicantId);
        setApplicants(updatedApplicants);
    };

    const changeApplicantPriority = async (applicantId, direction) => {
        const updatedApplicants = [...applicants];
        const currentIndex = updatedApplicants.findIndex((applicant) => applicant._id === applicantId);


        if (direction === "up" && currentIndex > 0) {
            const tempApplicant = updatedApplicants[currentIndex];
            updatedApplicants[currentIndex] = updatedApplicants[currentIndex - 1];
            updatedApplicants[currentIndex - 1] = tempApplicant;
        } else if (direction === "down" && currentIndex < updatedApplicants.length - 1) {
            const tempApplicant = updatedApplicants[currentIndex];
            updatedApplicants[currentIndex] = updatedApplicants[currentIndex + 1];
            updatedApplicants[currentIndex + 1] = tempApplicant;
        }

        setApplicants(updatedApplicants);
        // const newPriority = direction === "up" ? priority - 1 : priority + 1;
        // const data = { ...applicant, priority: newPriority };
        // try {
        //     let newOrder = updatedApplicants.map((applicant, index) => ({ ...applicant, priority: index }));
        //     await doApiMethod(API_URL +'/applicants/update', "PUT", newOrder);
        // }
        // catch (err) {
        //     console.error(err);
        // }
    };

    const handleAddApplicant = async (newApplicant) => {
        const data = await doApiMethod(API_URL + '/applicants', "POST", newApplicant);
        console.log(data)
        setApplicants([...applicants, data]);
        setAddApplicantModalOpen(false);
    };

    useEffect(() => {
        fetchApplicants();
    }, []);

    return (
        <div className='col-11 col-md-10 p-2 mt-2 bg-dark-subtle bg-opacity-25 rounded'>

            <h3>Konkrete Kandidaten</h3>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Age</th>
                        <th>Phone</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {applicants.map((applicant) => (
                        <tr key={applicant._id}>
                            <td>{applicant.name}</td>
                            <td>{applicant.age}</td>
                            <td>{applicant.phone}</td>
                            <td>
                                <button className="btn btn-danger m-2" onClick={() => {
                                    if (window.confirm("Are you sure you want to delete this item?")) {
                                        deleteApplicant(applicant._id)
                                    }
                                }}>X</button>
                                <button className="btn" onClick={() => changeApplicantPriority(applicant._id, "up")}>&uarr;</button>
                                <button className="btn" onClick={() => changeApplicantPriority(applicant._id, "down")}>&darr;</button>
                            </td>
                        </tr>
                    ))}

                </tbody>
            </table>
            <button className="btn btn-warning m-2" onClick={() => {
                setTimeout(() => {
                    window.scrollTo(0, document.body.scrollHeight);
                }, 100);
                setAddApplicantModalOpen(true);

            }}>Add Applicant</button>
            {addApplicantModalOpen && (

                <AddApplicantModal onSave={handleAddApplicant} onClose={() => setAddApplicantModalOpen(false)} />
            )}
        </div>
    );
};

export default ApplicantsSuma;

import React, { useState, useEffect } from "react";
import { API_URL } from "../../services/apiServices";
import { doApiGet, doApiMethod } from "../../services/apiServices"
import AddApplicantModal from "./addApplicantModal";

const ApplicantsSuma = () => {
    const [applicants, setApplicants] = useState([]);
    const [addApplicantModalOpen, setAddApplicantModalOpen] = useState(false);

    const fetchApplicants = async () => {
        const data = await doApiGet(API_URL + '/applicants/allApplicants');
        console.log(data)
        setApplicants(data);
    };

    useEffect(() => {
        fetchApplicants();
    }, []);

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
    };

    const handleAddApplicant = async (newApplicant) => {
        const data = await doApiMethod(API_URL + '/applicants', "POST", newApplicant);
        console.log(data)
        setApplicants([...applicants, data]);
        setAddApplicantModalOpen(false);
    };

    return (
        <div>
            <button onClick={() => {
                setAddApplicantModalOpen(true)}}>Add Applicant</button>
            {addApplicantModalOpen && (
                <AddApplicantModal onSave={handleAddApplicant} onClose={() => setAddApplicantModalOpen(false)} />
            )}
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
                                <button onClick={() => {
                                    if (window.confirm("Are you sure you want to delete this item?")) {
                                        deleteApplicant(applicant._id)
                                    }
                                }}>Delete</button>
                                <button onClick={() => changeApplicantPriority(applicant._id, "up")}>&uarr;</button>
                                <button onClick={() => changeApplicantPriority(applicant._id, "down")}>&darr;</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ApplicantsSuma;

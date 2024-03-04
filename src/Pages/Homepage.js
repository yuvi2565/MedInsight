import React, { useState } from "react";
import Navbar from './Navbar';
import Footer from './Footer';
import './homepage.css';

function MedicalForm() {
    const [formData, setFormData] = useState({
        // name: "",
        // email: "",
        // gender: "",
        pregnancies: 3.845052,
        glucose: 120.894531,
        bloodPressure: 69.105469,
        skinThickness: 20.536458,
        insulin: 79.799479,
        bmi: 31.992578,
        dpf: 0.471876,
        age: 33.240885
        // file: null
    });

    const handleInputChange = (e) => {

        const { name, value } = e.target;
        let roundedValue = value;

        // Round numeric values to the nearest integer, excluding BMI field
        if (name !== "bmi" && name!=="name" && name!=="email" && name!=="gender" && name!=="file" && !isNaN(value) && value !== "") {
            roundedValue = Math.round(parseFloat(value));
        }

        setFormData({
            ...formData,
            [name]: roundedValue
        });
        console.log(formData);
    };
    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFormData({
            ...formData,
            file: file
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch("http://127.0.0.1:5000/", {
                method: "POST",
                body: JSON.stringify(formData),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                // Handle success
                console.log("Form data sent successfully");
            } else {
                // Handle errors
                console.error("Failed to send form data");
            }
        } catch (error) {
            console.error("Error sending form data:", error);
        }
    };

    return (
        <div>
            <Navbar />
            <div>
                <form className="medical-form" onSubmit={handleSubmit}>
                    <div className="container">
                        <h1>Medical Report Summariser</h1>
                        <h2>Enter your details</h2>
                    </div>
                    <label htmlFor="name">Name:</label>
                    <input type="text" id="name" name="name" required onChange={handleInputChange} />

                    <label htmlFor="email">Email:</label>
                    <input type="email" id="email" name="email" required onChange={handleInputChange} />

                    <label htmlFor="gender">Gender:</label>
                    <select id="gender" name="gender" required onChange={handleInputChange}>
                        <option value="">Select</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="other">Other</option>
                    </select>

                    <label htmlFor="pregnancies">Pregnancies:</label>
                    <input type="number" id="pregnancies" name="pregnancies" onChange={handleInputChange} />

                    <label htmlFor="glucose">Glucose:</label>
                    <input type="number" step="0.01" id="glucose" name="glucose" onChange={handleInputChange} />

                    <label htmlFor="bloodPressure">Blood Pressure:</label>
                    <input type="number" step="0.01" id="bloodPressure" name="bloodPressure" onChange={handleInputChange} />

                    <label htmlFor="skinThickness">Skin Thickness:</label>
                    <input type="number" step="0.01" id="skinThickness" name="skinThickness" onChange={handleInputChange} />

                    <label htmlFor="insulin">Insulin:</label>
                    <input type="number" step="0.01" id="insulin" name="insulin" onChange={handleInputChange} />

                    <label htmlFor="bmi">BMI:</label>
                    <input type="number" step="0.01" id="bmi" name="bmi" onChange={handleInputChange} />

                    <label htmlFor="age">Age:</label>
                    <input type="number" id="age" name="age" required onChange={handleInputChange} />

                    <label htmlFor="file-upload">Upload Medical Report:</label>
                    <input type="file" id="file-upload" name="file" accept=".pdf, .doc, .docx" onChange={handleFileChange} />

                    <div className="button-container">
                        <button type="submit" style={{ backgroundColor: "rgb(87, 239, 165)" }}>Submit</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default MedicalForm;

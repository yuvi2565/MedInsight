import React, { useState } from "react";
import Navbar from './Navbar';
import Footer from './Footer';
import './homepage.css';

function MedicalForm() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        gender: "",
        pregnancies: 3.845052,
        glucose: 120.894531,
        bloodPressure: 69.105469,
        skinThickness: 20.536458,
        insulin: 79.799479,
        bmi: 31.992578,
        dpf: 0.471876,
        age: 33.240885,
        file: null
    });

    const handleInputChange = (e) => {

        const { name, value } = e.target;
        let roundedValue = value;

        // Round numeric values to the nearest integer, excluding BMI field
        if (name !== "bmi" && name !== "name" && name !== "email" && name !== "gender" && name !== "file" && !isNaN(value) && value !== "") {
            roundedValue = Math.round(parseFloat(value));
        }

        setFormData({
            ...formData,
            [name]: roundedValue
        });
        // console.log(formData);
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
        let my_data = 0

        try {
            console.log('sending data');
            console.log(formData);
            const response = await fetch("http://127.0.0.1:5000/", {
                method: "POST",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                const data = await response.json();
                console.log("Received data from backend:", data);
                // Display an alert with the received data
                my_data=JSON.stringify(data)
                my_data*=100
                my_data=Math.floor(my_data)
                if(my_data<=25) {
                    alert("Percentage of you having diabetes is : " + my_data+ "% \n Maintain a healthy lifestyle by incorporating regular exercise and a balanced diet rich in fruits, vegetables, and whole grains. Schedule regular check-ups with your healthcare provider to monitor your health status and discuss any concerns or changes in symptoms.");
                }
                else if(my_data>25 && my_data<=50){
                    alert("Percentage of you having diabetes is : " + my_data+ "% \n Increase awareness about diabetes symptoms and risk factors. Consider lifestyle modifications such as weight loss (if overweight), reducing sugar intake, and avoiding sedentary behaviors. Consult with a healthcare professional for personalized advice and screening tests.");
                }
                else if(my_data>50 && my_data<=75){
                    alert("Percentage of you having diabetes is : " + my_data+ "% \n Take proactive steps to manage and reduce risk factors associated with diabetes, such as controlling blood sugar levels, maintaining a healthy weight, and managing stress.Monitor blood glucose levels regularly, especially if there's a family history of diabetes or other risk factors present.Discuss with a healthcare provider about starting preventive measures or medications to lower the risk of developing diabetes.");
                }
                else{
                    alert("Percentage of you having diabetes is : " + my_data+ "% \n Prioritize comprehensive diabetes prevention strategies, including close monitoring of blood sugar levels, adherence to a diabetic-friendly diet, regular exercise, and weight management.Work closely with healthcare professionals, including endocrinologists, dietitians, and diabetes educators, to develop a personalized management plan.Consider genetic counseling to understand the hereditary risk factors and potential preventive measures.");
                }
                
            } else {
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

                    <label htmlFor="glucose">Glucose level : (in mg/dL)</label>
                    <input type="number" step="0.01" id="glucose" name="glucose" onChange={handleInputChange} />

                    <label htmlFor="bloodPressure">Blood Pressure: (in mm Hg)</label>
                    <input type="number" step="0.01" id="bloodPressure" name="bloodPressure" onChange={handleInputChange} />

                    <label htmlFor="skinThickness">Skin Thickness: (in mm)</label>
                    <input type="number" step="0.01" id="skinThickness" name="skinThickness" onChange={handleInputChange} />

                    <label htmlFor="insulin">Insulin: (in IU/ml)</label>
                    <input type="number" step="0.01" id="insulin" name="insulin" onChange={handleInputChange} />

                    <label htmlFor="bmi">BMI:</label>
                    <input type="number" step="0.01" id="bmi" name="bmi" onChange={handleInputChange} />

                    <label htmlFor="age">Age: (in years)</label>
                    <input type="number" id="age" name="age" required onChange={handleInputChange} />

                    <label htmlFor="file-upload">Upload Medical Report:</label>
                    <input type="file" id="file-upload" name="file" accept=".pdf, .doc, .docx" onChange={handleFileChange} />

                    <div className="button-container">
                        <button type="submit" className="submitbutton"> SUBMIT</button>
                    </div>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default MedicalForm;

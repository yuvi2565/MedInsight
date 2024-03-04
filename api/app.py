from flask import Flask, request, jsonify
from flask_cors import CORS,cross_origin
import joblib
import pandas as pd

app = Flask(__name__)
CORS(app)
import json
@app.route('/', methods=["POST"])
@cross_origin()
def index():
    if request.method == "POST":
        data = request.form
        print("DATA RECEIVED SUCCESSFULLLY")
        print(data)
        Glucose = data.get("glucose")
        print(type(Glucose))
        Pregnancies=data.get("pregnancies")
        BloodPressure=data.get( 'bloodPressure') 
        SkinThickness=data.get( 'skinThickness') 
        Insulin=data.get( 'insulin') 
        BMI=data.get( 'bmi') 
        print(type(BMI))
        DiabetesPedigreeFunction=data.get( 'dpf') 
        Age=data.get( 'age')

        data_list=[Pregnancies, Glucose, BloodPressure, SkinThickness, Insulin,BMI, DiabetesPedigreeFunction, Age]  
        pipeline = joblib.load('diabetes.pkl')
        columns = ["Pregnancies", "Glucose", "BloodPressure", "SkinThickness", "Insulin", "BMI", "DiabetesPedigreeFunction", "Age"]
        df = pd.DataFrame([data_list], columns=columns)
        preprocessed_data = pipeline['scaler'].transform(df)
        prediction = pipeline['model'].predict_proba(preprocessed_data)
        print(prediction)

        return jsonify(prediction)

if __name__ == "__main__":
    app.run(debug=True)

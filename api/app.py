from flask import Flask, request, jsonify
from flask_cors import CORS,cross_origin
import sklearn
import joblib
import pandas as pd
import json

app = Flask(__name__)
CORS(app,origins= '*')
@app.route('/', methods=["POST"])
@cross_origin()
def index():
    if request.method == "POST":
        # print("scikit-learn version:", scikit_learn.__version__)
        print(request.data)
        data=request.data
        print(data)
        data_dict = json.loads(data)

        # Access object properties
        name = data_dict['name']
        email = data_dict['email']
        gender = data_dict['gender']
        pregnancies = data_dict['pregnancies']
        glucose = data_dict['glucose']
        bloodPressure = data_dict['bloodPressure']
        skinThickness = data_dict['skinThickness']
        insulin = data_dict['insulin']
        bmi = data_dict['bmi']
        dpf = data_dict['dpf']
        age = data_dict['age']
        file = data_dict['file']
        print(name, email, gender, pregnancies, glucose, bloodPressure, skinThickness, insulin, bmi, dpf, age, file)
        bmi=float(bmi)
        data_list=[pregnancies, glucose, bloodPressure, skinThickness, insulin, bmi, dpf, age]
        print(data_list)
        pipeline = joblib.load('diabetes.pkl')
        columns = ["Pregnancies", "Glucose", "BloodPressure", "SkinThickness", "Insulin", "BMI", "DiabetesPedigreeFunction", "Age"]
        df = pd.DataFrame([data_list], columns=columns)
        preprocessed_data = pipeline['scaler'].transform(df)
        prediction = pipeline['model'].predict_proba(preprocessed_data)
        print(prediction)

        answer=prediction[0][1]

        return jsonify(answer)

if __name__ == "__main__":
    app.run(debug=True)
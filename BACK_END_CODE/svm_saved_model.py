#!C:/Users/Syed Hasnain Meesam/AppData/Local/Programs/Python/Python37/python.exe
print ("Content-Type: text/html\n")

import numpy
import os
from urllib.parse import urlparse
from urllib.parse import parse_qs
import json
import pickle

import config

def save_model(myarray):
    with open(config.svm_model_pkl, 'rb') as file:  
        model = pickle.load(file)
    predicted = model.predict(myarray)
    return predicted

url = os.environ['REQUEST_URI']
parsed = urlparse(url)
queryArray = parse_qs(parsed.query)
data = {k: v[0] for k, v in queryArray.items()}
age = data['age']
age = int(age)
sex = data['sex']
sex = int(sex)
chestPain = data['chestPain']
chestPain = int(chestPain)
restingBloodPressure = data['restingBloodPressure']
restingBloodPressure = int(restingBloodPressure)
cholestoral = data['cholestoral']
cholestoral = int(cholestoral)
fastingBloodSugar = data['fastingBloodSugar']
fastingBloodSugar = int(fastingBloodSugar)
electrocardiographic = data['electrocardiographic']
electrocardiographic = int(electrocardiographic)
heartRate = data['heartRate']
heartRate = int(heartRate)
exerciseInducedAngina = data['exerciseInducedAngina']
exerciseInducedAngina = int(exerciseInducedAngina)
oldPeak = data['oldPeak']
oldPeak = float(oldPeak)
slope = data['slope']
slope = int(slope)
vessels = data['vessels']
vessels = int(vessels)
thal = data['thal']
thal = int(thal)
hr = data['heartRate']
allList = [[age, sex, chestPain, restingBloodPressure, cholestoral, fastingBloodSugar, electrocardiographic, heartRate, exerciseInducedAngina, oldPeak, slope, vessels, thal]]
myarray = numpy.array(allList)
myarray = myarray.astype(numpy.float)
predicted = save_model(myarray)
print("heartRate", predicted)
response=int(predicted[0])
thisdict = {"response" : response}
json_object = json.dumps(thisdict)  
print(json_object)
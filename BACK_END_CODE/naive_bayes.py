#!C:/Users/Syed Hasnain Meesam/AppData/Local/Programs/Python/Python37/python.exe
print ("Content-Type: text/html\n")

import numpy
import csv
import random
from sklearn.naive_bayes import GaussianNB
from sklearn.model_selection import train_test_split
import copy
import config
import os
from urllib.parse import urlparse
from urllib.parse import parse_qs
import json
import pickle

def file_reader():
    #create reduced feature matrix
    csv_reader = csv.reader(open(config.new_data_set,"r"),delimiter=",")
    training_data = list(csv_reader)
    training_data = numpy.array(training_data)
    training_data = training_data.astype(numpy.float)
    training_data=numpy.random.permutation(training_data)
    return training_data

def train_Test_Split(training_data):
    all_target_data = [] 
    training_data_train = []
    all_attributes_data=[]
    print("training_data:::", training_data)
    last_attribute_index = training_data.shape[1]
    for index in range(0, training_data.shape[0]):
        all_target_data.append(copy.deepcopy(training_data[index][last_attribute_index-1]))
        training_data_train.append(training_data[index])
    
    all_target_data=numpy.array(all_target_data)
    all_target_data=all_target_data.astype(numpy.int)
    all_target_data=all_target_data.ravel()
    #print("all_target_data:",all_target_data)
    all_attributes_data = training_data_train
    all_attributes_data = numpy.delete(all_attributes_data, last_attribute_index-1, axis=1)
    #print("all_attributes_data",all_attributes_data)
    extracted_training_data, extracted_testing_data, extracted_training_target, extracted_testing_target = train_test_split( all_attributes_data, all_target_data, test_size=0.1 )
    training_set_count = extracted_training_data.shape[0]
    testing_set_count = extracted_testing_data.shape[0]
    return extracted_training_data, extracted_testing_data, extracted_training_target, extracted_testing_target, training_set_count, testing_set_count

def train_model(extracted_training_data, extracted_training_target):
    """Function to train our Naive Bayes model"""
    gaussian_naive_bayes = GaussianNB()
    model =  gaussian_naive_bayes.fit(extracted_training_data, extracted_training_target)
    return model

def print_training_set_details(model, extracted_training_data, extracted_training_target, training_set_count):
    #model.fit(training_data_train, target_output_train)
    """Print Training Set details"""
    print("..................................Training set................................")
    print("Modal pridiction", model.predict(extracted_training_data))
    score = model.score(extracted_training_data, extracted_training_target)
    print ("Training Set size = ", training_set_count)
    print ("Training Set accuracy = ", score*100)
    print ("Training Set error = ", (1-score)*100)


def print_test_set_details(model, extracted_testing_data, extracted_testing_target, testing_set_count):
    """Print Test Set details"""
    print("..................................Test set...................................")
    print(" testing prediction ", model.predict(extracted_testing_data))
    score = model.score(extracted_testing_data, extracted_testing_target)
    print ("Test Set size = ", testing_set_count)
    print ("Test Set accuracy = ", score*100)
    print ("Test Set error = ",(1-score)*100)
    
def save_model(myarray):
    with open(config.adaboost_model_pkl, 'rb') as file:  
        model = pickle.load(file)
    predicted = model.predict(myarray)
    print("..................................Trained Model Result set...................................")
    print(" trained testing prediction ", predicted)
    return predicted

# training_data = file_reader()
# extracted_training_data, extracted_testing_data, extracted_training_target, extracted_testing_target, training_set_count, testing_set_count = train_Test_Split(training_data)
# model = train_model(extracted_training_data, extracted_training_target)
# print_training_set_details(model, extracted_training_data, extracted_training_target, training_set_count)
# print_test_set_details(model, extracted_testing_data, extracted_testing_target, testing_set_count)


url = os.environ['REQUEST_URI']
parsed = urlparse(url)
queryArray = parse_qs(parsed.query)
data = {k: v[0] for k, v in queryArray.items()}
print('le:',data['age'])
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
print(allList)
print(int(hr))
myarray = numpy.array(allList)
myarray = myarray.astype(numpy.float)
print(myarray)
predicted = save_model(myarray)
print(predicted[0])
response=int(predicted[0])
thisdict = {"response" : response}
json_object = json.dumps(thisdict)  
print(json_object)


# url = os.environ['REQUEST_URI']
# parsed = urlparse(url)
# print(parsed)
# queryArray = parse_qs(parsed.query)
# print(queryArray)
# hr = type(queryArray['heartRate'])
# training_data = list(queryArray['foo'])
# print(training_data)
# print(hr)
# myarray = numpy.array(training_data)
# thisdict = {"response" : 0}
# json_object = json.dumps(thisdict)  
# print(json_object)




# print(myarray.json()) 
# print(queryArray['foo'].split(','))

#print("count: ",extracted_training_data.shape)
#print("extracted_training_data",extracted_training_data)
#print("extracted_training_target",extracted_training_target)
#print("extracted_testing_data",extracted_testing_data)
#print("extracted_testing_target",extracted_testing_target)


#print( "tradadadad::", extracted_trainig_data)
#print("extracted_target_data:",extracted_target_data)
#user data
#reader=csv.reader(open("user_data.csv","r"),delimiter=",")
#Z=list(reader)
#Z=numpy.array(Z)
#Z=Z.astype(numpy.float)
#Z_test =[Z]

#print("..................................user Test...................................")
#print
#print(clf.predict(Z_test))

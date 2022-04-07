import numpy
import csv
import random
from sklearn.ensemble import AdaBoostClassifier
from sklearn.model_selection import train_test_split
import copy

import config

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
    adaboost = AdaBoostClassifier(n_estimators=30, learning_rate=1.0)
    model =  adaboost.fit(extracted_training_data, extracted_training_target)
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

training_data = file_reader()
extracted_training_data, extracted_testing_data, extracted_training_target, extracted_testing_target, training_set_count, testing_set_count = train_Test_Split(training_data)
model = train_model(extracted_training_data, extracted_training_target)
print_training_set_details(model, extracted_training_data, extracted_training_target, training_set_count)
print_test_set_details(model, extracted_testing_data, extracted_testing_target, testing_set_count)

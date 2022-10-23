import numpy as np 
import pandas as pd
import flask
import pickle
from flask import Flask, render_template, request
import json

app = Flask(__name__)

@app.route('/')
def index():
 return flask.render_template('index.html')

def ValuePredictor(to_predict_list):

 print("This is the prediction numpy array:",to_predict_list)
 loaded_model = pickle.load(open('model.sav','rb'))
 to_predict = np.asarray(to_predict_list, dtype=np.float32)
 print('to_predict:',to_predict)
 result = loaded_model.predict(to_predict)
 print('result:',result)
 rmse = pickle.load(open('rmse.sav','rb'))
 
 return f'${round((result[0] - rmse)[0])} - ${round((result[0] + rmse)[0])}'

@app.route('/predict',methods = ['POST'])
def result():

 if request.method == 'POST':

    to_predict_list = request.form.to_dict()
    print('to_predict_list:', request.form)
    to_predict_list=list(to_predict_list.values())
    print('to_predict_list:', to_predict_list)
    to_predict_list = list(map(float, to_predict_list))
    print('to_predict_list:', to_predict_list)

    data_json = json.load(open('data.json'))
    

    for a in data_json:
      if a['listing_id'] == to_predict_list[0]:
         airbnb = a
         break
      
    val_list = list()
    for key in airbnb.keys():
      if key in ['city', 'zipcode', 'latitude', 'longitude', 'accommodates', 'bathrooms', 'bedrooms', 'beds', 'review_scores_rating', 'month']:
         val_list.append(airbnb[key])
    val_list.append(to_predict_list[1])
   
    scaled = pickle.load(open("scaler.sav", "rb"))
    enc = pickle.load(open('enc.sav','rb'))
    df = pickle.load(open('df.sav','rb'))

    print("HERE IS THE DF:",df.head())
    print("HERE IS THE list:", val_list)
    df.loc[len(df.index)] = val_list
    
    df['bedrooms']=df['bedrooms'].apply(np.sqrt)
    df['bathrooms'] = df['bathrooms'].apply(lambda x: pow(x,1/3))
    df['accommodates']=df['accommodates'].apply(np.log10)
    

    
    encode_df = pd.DataFrame(enc.fit_transform(df[['city','zipcode','month']]))
    encode_df.columns = enc.get_feature_names(['city','zipcode','month'])
   
    df = df.merge(encode_df, left_index=True, right_index=True)
    df.drop(columns=['city','zipcode','month'], inplace=True)
    
    print("HERE ARE THE COLUMNS:", df.columns)

    vals = df.iloc[-1].values
    vals = vals.reshape(1,-1)
    vals = scaled.transform(vals)
    
    result = ValuePredictor(vals)

    prediction = str(result)
 return render_template('index.html',prediction=prediction)

if __name__ == "__main__":
 app.run(debug=True)

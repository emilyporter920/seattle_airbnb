# Final Project

## Group Members
* Emily Porter
* Christine Wells
* John Hendricks
* Graham Burch

## Selected Topic
* Airbnb Pricing in Seattle.

## Source Data
* Access our source data <a href="https://www.kaggle.com/datasets/airbnb/seattle" target="_blank">here</a>.

## Questions We Hope To Answer
* When is the most affordable time to go to Seattle?
* How much is your favorite Airbnb at a specific time of year?

## Communication
* In order to keep teammates updated - google hangouts, slack, and regular zoom meetings were utilized.
* Our tracker list created using google sheets can be accessed <a href="https://docs.google.com/spreadsheets/d/1tLIKKyJ99hu_YNYIIDx7AmVLVdwfLJwwXPZTy9znj38/edit?usp=sharing" target="_blank">here</a>.

## Tools Used
* Creating Database
    * PostgreSQL
    * Amazon Web Services (AWS)
* Connecting to Database
    * SQLAlchemy
* Analyzing & Cleaning Data
    * Pandas
* Supervised Machine Learning
    * Keras/Tensorflow
* Dashboard
    * HTML
    * CSS
    * Javascript
    * Git Hub Pages
    * Tableau
* Other Tools
    * Jupyter Notebook
    * Visual Studio Code

## Data Cleaning
* The two CSV files were loaded into Jupyter Notebooks for data preparation and cleaning. All NA values were dropped in both CSV files using **.dropna()** and necessary columns were extracted from the original dataframe using **.copy()**. Since machine learning models require integers the use of Pandas allowed the use of .str.replace to remove the dollar signs from the prices and **.astype()** was used to convert the object data type into an int32. The dates were also assessed and were converted to only include the month of the entry. This was performed using **.to_datetime()**, **dt.to_period()**, and **dt.month**. The outliers included in the data were kept for further data analysis because it did not appear to be entry error.

<p align="center">
  <img 
    src=Resources/images/data_cleaning_1.png
  >
</p>

<p align="center">
  <img 
    src=Resources/images/data_cleaning_2.png
  >
</p>

## Exploratory Data
* .

## Machine Learning Model
* Sequential model.
* ReLU activation function.
* 3 hidden layers, 500 epochs.

### Reason for Choosing Machine Learning Model
* Our data had several features.
* None of the models we had learned in this course could perform regression except for neural networks.
* Comfortability with Tensorflow.
* Limitations: 
  * Requires large amounts of data to train.
  * Data takes 5 minutes to run.
* Other benefits: 
  * High accuracy.
    * Accuracy: **95%**
    * R-value: **0.97**
  * Easily modifiable.

### Processing Description
* Certain variables, such as bed rooms, were transformed, e.g. square root on each data point.
* Applied one-hot encoding on each categorical feature, e.g. zipcode.
* Normalized data such that each feature had mean of 0 and standard deviation of 1.

### Feature Selection
* Features were chosen based on their relevance to price.
  * An airbnb with a large number of bedrooms would likely cost more.
* Data was split randomly between training and testing groups, with 25% of data as testing.

## Database

### ERD Diagram
* This diagram was created to help visualize the connections between the different CSV files that were utilized.

<p align="center">
  <img 
    src=Resources/images/ERD_2_clean.png
  >
</p>

## Project Website Creation
* This was created using HTML, CSS, and Javascript. Data stored in the CSV was converted to JSON and stored in data.js. A filter was created for user input which includes the listing ID and the month.

* Based on the user input a popup containing information on how many bedrooms, bathrooms, and an estimated price range for the Airbnb listing will appear on the interactive map integrated into the website. 

## Presentation
* Access our presentation slides <a href="https://docs.google.com/presentation/d/1icmLt7eO1Spff29124g_vV3Oj6s1S81FOCbXvFXCNaw/edit?usp=sharing" target="_blank">here</a>.

## Dashboard
* Access our dashboard <a href="https://emilyporter920.github.io/seattle_airbnb/templates/index.html" target="_blank">here</a>.
* Access our live dashboard demo here (ADD LINK).

## Tableau Integration
* Below is a tableau dashboard that shows the prices based on latitude and longitude using both a scatter plot and a map with a filter based on the price per night. There is also a scatter plot showing a steady increase in price based on the number of bedrooms for each listing with a filter based on the price per night. The website application is embedded into the dashboard.

<p align="center">
  <img 
    src=Resources/images/tableau_dashboard.png
  >
</p>

* Access the Tableau dashboard <a href="https://public.tableau.com/app/profile/emily.porter7135/viz/Dashboard_16656930095490/AirbnbPriceTrends?publish=yes" target="_blank">here</a>.

## R Integration
* 

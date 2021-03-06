## Divvy Rental Bike Project </br>

1. create "resources"  in project route </br>
2. extract file from "https://s3.amazonaws.com/divvy-data/tripdata/Divvy_Trips_2019_Q2.zip"  </br>
3. put in resources folder and set "TRIP_FILE_PATH" in init.js
 ssh

</br>
Before running server </br>
Set the token in env variable.</br>
token=[sample token: pXeEcUxxJNPgBz3&T7UMBzmW*] </br>

**Docker Commands:** </br>
1. docker build -t divvy_app:latest . </br>
2. docker run -it -p 3000:3000 --env token='enter you token here' divvy_app /bin/bash </br>
3. docker run  -p 3000:3000 -d --env token='enter your token here' divvy_app </br>

**API END POINTS**


**station_info_by_station_id**
----
  Return the information for one station given a station id

* **URL**

  /station/:station_id

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
     
     'None'
 
*  **Header Params**
   
   **Required:**
   
   'Type': 'Bearer Token'
   `token=[sample token: pXeEcUxxJNPgBz3&T7UMBzmW*]`
   
*  **Query Params**
   
   **Required:**
   
    `station_id=[integer]`
    'sample station_id=2'
   
   
* **Data Params**
 
  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
                      "stations_id": "2",
                      "status": "success",
                      "data": [
                          {
                              "short_name": "15541",
                              "eightd_has_key_dispenser": false,
                              "station_id": "2",
                              "rental_uris": {
                                  "android": "https://chi.lft.to/lastmile_qr_scan",
                                  "ios": "https://chi.lft.to/lastmile_qr_scan"
                              }
							  
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER <br />
    **Content:** `{ error : "failed" }`

  OR

  * **Code:** 400 NOT FOUND <br />
    **Content:** `{ error : "no station_id provided" }`

**numbers_riders_based_age_groups**
----
  Given one or more stations, return the number of riders in the following age groups, [0-20,21-30,31-40,41-50,51+, unknown], who ended their trip at that station for a given day.

* **URL**

  /riders

* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
     
     'None'
 
*  **Header Params**
   
   **Required:**
   
   'Type': 'Bearer Token'
   `token=[sample token: pXeEcUxxJNPgBz3&T7UMBzmW*]`
   
*  **Query Params**
   
   **Required:**
   
    `station_id=[integer]`
    'sample station_id=2'
    `day =date`
    `sample day = 2019-04-02`
 
* **Data Params**
 
  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** '{
                      "stations_id": [
                          56,
                          59
                      ],
                      "day": "2019-04-02T00:00:00.000Z",
                      "status": "success",
                      "data": {
                          "0-20": 0,
                          "21-30": 19,
                          "31-40": 37,
                          "41-50": 10,
                          "51+": 9,
                          "unknown": 11
                      }
                  }'
* **Error Response:**

  * **Code:** 500 INTERNAL SERVER <br />
    **Content:** `{ error : "failed" }`

  OR

  * **Code:** 400 NOT FOUND <br />
    **Content:** `{ error : "no station_id provided" }`

**stations_ended_20_trips_in_single_day**
----
  Given one or more stations, return the last 20 trips that ended at each station for a single day

* **URL**

  /trips
  


* **Method:**

  `GET`
  
*  **URL Params**

   **Required:**
     
     'None'
 
*  **Header Params**
   
   **Required:**
   
   'Type': 'Bearer Token'
   `token=[sample token: pXeEcUxxJNPgBz3&T7UMBzmW*]`
   
*  **Query Params**
   
   **Required:**
   
    `station_id=[integer]`
    'sample station_id=2'
    `day =date`
    `sample day = 2019-04-02`
 
* **Data Params**
 
  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** '{
                      "stations_id": [
                          56,
                          59
                      ],
                      "day": "2019-04-02T00:00:00.000Z",
                      "status": "success",
                      "data": {
                          "56": [
                              {
                                  "01 - Rental Details Rental ID": "22186353",
                                  "01 - Rental Details Local Start Time": "2019-04-01 18:51:06",
                                  "01 - Rental Details Local End Time": "2019-04-01 19:00:36",
                                  "01 - Rental Details Bike ID": "5064",
                                  "01 - Rental Details Duration In Seconds Uncapped": "570.0",
                                  "03 - Rental Start Station ID": "77",
                                  "03 - Rental Start Station Name": "Clinton St & Madison St",
                                  "02 - Rental End Station ID": "56",
                                  "02 - Rental End Station Name": "Desplaines St & Kinzie St",
                                  "User Type": "Subscriber",
                                  "Member Gender": "Male",
                                  "05 - Member Details Member Birthday Year": "1984"
                              }
                            

  * **Code:** 500 INTERNAL SERVER <br />
    **Content:** `{ error : "failed" }`

  OR

  * **Code:** 400 NOT FOUND <br />
    **Content:** `{ error : "no station_id provided" }`
	
	
	



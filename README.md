Setup Instructions

Installation
Clone the Repository
git clone https://github.com/AdiGreen8/home-assignment.git
cd home-assignment

Install Dependencies
npm install

Intialize the DataFile
node server.js

Start the Server 
npm start

Run the frontend
cd my-app
npm start

Api Endpoints
Endpoint: /data
Method: GET
Purpose: Fetches surgical data entries either by a specific date or by a specific month and year.

Data Processing and Metrics Calculation
The application processes surgical data files to compute utilization and staff metrics:

Utilization Calculation:
Daily utilization is calculated by dividing the total used room time by the available time (from 07:00 to 23:00)
and then devided by the number of ORs (32) available in the data provided.
Monthly averages are calculated by aggregating daily data and averaging it over 27 days 
(I assumed according to the provided data that the ORs doesnt works on Sundays).

Staff Calculation:
Monthly averages are computed similar to utilization.

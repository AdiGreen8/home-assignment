### Setup Instructions

#### Installation
###### Clone the Repository
git clone https://github.com/AdiGreen8/home-assignment.git
cd home-assignment

###### Install Dependencies
npm install

###### Intialize the DataFile
node server.js

###### Start the Server 
npm start

###### Run the frontend
cd my-app
npm start

#### Api Endpoints
Endpoint: /data
Method: GET
Purpose: Fetches surgical data entries either by a specific date or by a specific month and year.

#### Data Processing and Metrics Calculation
The application processes surgical data files to compute utilization and staff metrics:

###### Utilization Calculation:
Daily utilization is calculated by dividing the total used room time by the available time (from 07:00 to 23:00)
and then devided by the number of ORs (32) available in the data provided.
Monthly averages are calculated by aggregating daily data and averaging it over 27 days 
(I assumed according to the provided data that the ORs doesnt works on Sundays).

###### Staff Calculation:
Monthly averages are computed similar to utilization.

### Testing Documenataion

##### Install Dependencies:
###### Navigate to your project directory in the terminal and run:
npm install

##### Execute the Tests:
###### Run the following command to execute all tests:
npx playwright test

##### To run a specific test file, use:
npx playwright test path/to/test-file.spec.js

Ensure your local development server is running at "http://localhost:3000" for the frontend 
and "http://localhost:3002/data" for the backend API endpoints, as the tests expect these endpoints.

### Tests Description

##### Date Picker Tests (date-picker.spec.js):
###### Test Title Presence: 
Validates that the application's main page has the correct title containing "Surgical Metrics".
###### Test Month Navigation: 
Ensures the date picker correctly navigates and displays the expected month when navigating backwards.
###### Test Day Selection: 
Checks the functionality of selecting a specific day via the date picker and verifies the displayed date.

##### Frontend Rendering Tests (frontend-test.spec.js):
###### Metric Display Check: 
Verifies that the metrics for utilization and staff amounts are correctly displayed and are not zero, 
which indicates the calculations was made.

##### Utilization Calculation Tests:
###### Daily Utilization (utilization-test.spec.js): 
Confirms that the daily utilization percentage is calculated and displayed accurately.

###### Monthly Average Utilization (monthly-utilization-test.spec.js): 
Tests the accuracy of the monthly average utilization calculation.

##### Staff Amount Calculation Tests:
###### Daily Staff Amount (staffAmount-test.spec.js): 
Ensures that the number of unique staff on a given day is calculated and displayed correctly.
###### Monthly Average Staff Amount (monthly-staffAmount-test.spec.js): 
Verifies the monthly average calculation for the number of staff.

###### Dynamic Data Update Tests (rendering-on-change.spec.js):
Checks that the displayed data updates correctly when the user selects a different date.

###### No Data Alert Tests (noData-message.spec.js):
Tests that an alert for "No Data" appears and disappears appropriately based on the selected dates.

import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import styles from '../styles/styles.css';
import { calculateStaffPerDay } from '../functions/calculateStaffPerDay';
import { calculateUtilization } from '../functions/calculateDailyUtil';
import { calculateMonthlyStaff } from '../functions/calculateMonthlyStaff';
import { calculateMonthlyUtilization } from '../functions/calculateMonthlyUtil';

function Metrics() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [data, setData] = useState([]);
  const [utilization, setUtilization] = useState(0);
  const [staffCount, setStaffCount] = useState(0);
  const [monthlyUtilization, setMonthlyUtilization] = useState(0);
  const [monthlyStaff, setMonthlyStaff] = useState(0);
  const [message, setMessage] = useState('');

  const fetchDataByDate = (date) => {
    const formattedDate = date.toISOString().split('T')[0];

    axios.get(`http://localhost:3002/data?date=${formattedDate}`)
      .then(response => {
        const dailyData = response.data;
        setData(dailyData);

        if (dailyData.length === 0) {
          setMessage('There is no daily data for this date! please choose again.');
          setUtilization(0);
          setStaffCount(0);
        }
        else {
          setMessage('');
          const util = calculateUtilization(dailyData);
          setUtilization(util);
          const staff = calculateStaffPerDay(dailyData);
          setStaffCount(staff);
        }
      })
      .catch(error => console.error('There was an error fetching the data!', error));
  };

  const fetchDataByMonth = (year, month) => {
    axios.get(`http://localhost:3002/data?year=${year}&month=${month}`)
      .then(response => {
        const monthlyData = response.data;
        const monthlyUtil = calculateMonthlyUtilization(monthlyData);
        setMonthlyUtilization(monthlyUtil);
        const monthlyStaff = calculateMonthlyStaff(monthlyData);
        setMonthlyStaff(monthlyStaff);
      })
      .catch(error => console.error('Error fetching monthly data:', error));
  };

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'long',
      day: '2-digit'
    }).format(date);
  };

  const handleDateChange = date => {
    setSelectedDate(date);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    fetchDataByDate(date);
    fetchDataByMonth(year, month);
  };

  return (
    <div>
      <DatePicker
        showIcon
        selected={selectedDate}
        onChange={handleDateChange}
        className='date-picker'
        value='Choose Date'
      />
      <h1 data-testid='chosen-date'>{formatDate(selectedDate)}</h1>
      {message && <div className="alert">{message}</div>}
      <div className='four-small-box'>
        <div className='small-box-container'>
          <h2 data-testid="utilization-display">Daily Utilization<br></br></h2>
          <div class="line"></div>
          <h2 data-testid="utilization-num"> {utilization}%</h2>
        </div>
        <div className='small-box-container'>
          <h2 data-testid="staff-amount">Staff Number<br></br></h2>
          <div class="line"></div>
          <h2 data-testid="staff-amount-num">{staffCount}</h2>
        </div>
        <div className='small-box-container'>
          <h2 data-testid="monthly-utilization-display">Monthly Average Utilization<br></br></h2>
          <div class="line"></div>
          <h2 data-testid="monthly-utilization-num">{monthlyUtilization}%</h2>
        </div>
        <div className='small-box-container'>
          <h2 data-testid="monthly-staff-amount">Monthly Average Staff Number<br></br></h2>
          <div class="line"></div>
          <h2 data-testid="monthly-staff-num">{monthlyStaff}</h2>
        </div>
      </div>
    </div>
  );
}

export default Metrics;

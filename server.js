const express = require('express');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3002;

app.use(cors());

// Helper function to filter data by date
const filterByDate = (entries, date) => {
    return entries.filter(entry => entry.start.split('T')[0] === date);
};

// Helper function to filter data by month
const filterByMonth = (entries, year, month) => {
    return entries.filter(entry => {
        const entryDate = new Date(entry.start);
        return entryDate.getFullYear() === parseInt(year) && entryDate.getMonth() === parseInt(month) - 1;
    });
};

app.get('/data', (req, res) => {
    const { date, year, month } = req.query; 
    console.log("Querying data for:", date, year, month);  // Log the requested parameters for debugging

    fs.readFile('data.json', (err, data) => {
        if (err) {
            res.status(500).send('Error reading data file');
            return;
        }

        let entries = JSON.parse(data);
        if (date) {
            entries = filterByDate(entries, date);
        } else if (year && month) {
            entries = filterByMonth(entries, year, month);
        }

        res.json(entries);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});

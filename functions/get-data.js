const https = require('https');
require('dotenv').config();

exports.handler = async (event, context) => {
  try {
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SPREADSHEET_ID}/values/${process.env.RANGE}?key=${process.env.API_KEY}`;

    const options = {
      hostname: 'sheets.googleapis.com',
      path: `/v4/spreadsheets/${process.env.SPREADSHEET_ID}/values/${process.env.RANGE}?key=${process.env.API_KEY}`,
      method: 'GET',
    };

    const promise = new Promise((resolve, reject) => {
      const req = https.request(options, (res) => {
        let data = '';
        res.on('data', (chunk) => {
          data += chunk;
        });
        res.on('end', () => {
          try {
            resolve(JSON.parse(data));
          } catch (error) {
            reject(error);
          }
        });
      });

      req.on('error', (error) => {
        reject(error);
      });

      req.end();
    });

    const response = await promise;
    return {
      statusCode: 200,
      body: JSON.stringify(response),
    };
  } catch (error) {
    console.error('Error fetching data:', error);
    return {
      statusCode: 500,
      body: 'Failed to fetch data',
    };
  }
};

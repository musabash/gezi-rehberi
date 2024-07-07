const https = require('https');

exports.handler = async (event, context) => {
  try {
    // Construct the API endpoint URL
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${process.env.SPREADSHEET_ID}/values/${process.env.RANGE}?key=${process.env.API_KEY}`;

    // Define request options
    const options = {
      hostname: 'sheets.googleapis.com',
      path: `/v4/spreadsheets/${process.env.SPREADSHEET_ID}/values/${process.env.RANGE}?key=${process.env.API_KEY}`,
      method: 'GET',
    };

    // Make the request
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

    // Handle response or error
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

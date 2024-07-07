const axios = require('axios');
// require('dotenv').config();

// exports.handler = async (event, context) => {
//     try {
//         const response = await axios.get(`https://sheets.googleapis.com/v4/spreadsheets/${Netlify.env.SPREADSHEET_ID}/values/${Netlify.env.RANGE}?key=${Netlify.env.API_KEY}`);
//         return {
//             statusCode: 200,
//             body: JSON.stringify(response.data),
//         };
//     } catch (error) {
//         console.error('Error fetching data:', error);
//         return {
//             statusCode: 500,
//             body: 'Failed to fetch data',
//         };
//     }
// };

export default async (req, context) => {
  return new Response("Hello, world!");
};



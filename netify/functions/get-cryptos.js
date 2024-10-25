const fetch = require('node-fetch');

exports.handler = async function(event, context) {
  const apiUrl = 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest';
  
  try {
    const response = await fetch(apiUrl, {
      headers: {
        'X-CMC_PRO_API_KEY': '021de370-ae36-437b-93fd-ece705da9ed0',
      },
    });

    if (!response.ok) {
      console.error(`Error: ${response.status} ${response.statusText}`);
      return { 
        statusCode: response.status, 
        body: JSON.stringify({ error: 'Error fetching data' }) 
      };
    }

    const data = await response.json();
    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Server error:', error);
    return { 
      statusCode: 500, 
      body: JSON.stringify({ error: 'Internal server error' }) 
    };
  }
};

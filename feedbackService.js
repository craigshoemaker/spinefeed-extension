const appConfig = require('./config');
const axios = require('axios').default; 

module.exports = {
    get: async (content) => {
        const url = `${appConfig.spinefeedUrl}?&output=string`;
		const requestConfig = {
			headers: { 'Content-Type': 'application/json' }
		};
		
        const response = await axios.post(url, content, requestConfig);
        return response.data.details.string;
    }
};
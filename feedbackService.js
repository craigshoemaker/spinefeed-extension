const appConfig = require('./config');
const axios = require('axios').default; 

module.exports = {
    get: async (content, type) => {
        const url = `${appConfig.spinefeedUrl}?type=${type}&output=string`;
		const requestConfig = {
			headers: { 'Content-Type': 'application/json' }
		};
		
        const response = await axios.post(url, content, requestConfig);
        return response.data.details;
    },

    isValidType: (type) => {
        const types = {
            quickstart: true,
            tutorial: true,
            overview: true,
        }

        return !!types[type];
    }
};
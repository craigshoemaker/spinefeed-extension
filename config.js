const SERVER_LOCATION = 'https://spinefeed.azurewebsites.net'; //'http://localhost:7071'

const config = {
    spinefeedUrl: `${SERVER_LOCATION}/api/article`,
    messages: {
        invalidArticleType: 'Invalid article type. Spinefeed only provides feedback for Quickstarts, Tutorials, and Overview articles.\n\nYou can change the article type by updating the "ms.topic" field in the article metadata.'
    }
};

module.exports = config;
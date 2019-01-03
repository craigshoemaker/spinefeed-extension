const SERVER_LOCATION = 'https://spinefeed.azurewebsites.net'; //'http://localhost:7071'

const config = {
    spinefeedUrl: `${SERVER_LOCATION}/api/article`,
    messages: {
        invalidArticleType: 'Invalid article type. Spinefeed only provides feedback for Quickstarts, Tutorials, and Overview articles. You can change the article type by updating the "ms.author" field in the article metadata.'
    }
};

module.exports = config;
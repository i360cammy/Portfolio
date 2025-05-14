const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
    
    eleventyConfig.addPassthroughCopy('./blog/style.css');
    eleventyConfig.addPassthroughCopy('./blog/assets');

    eleventyConfig.addFilter('postDate', (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    })

    return {
        dir: {
            input: 'blog',
            output: 'public'
        }
    }
}
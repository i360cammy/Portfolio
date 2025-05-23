const { DateTime } = require("luxon");

module.exports = function (eleventyConfig) {
    
    eleventyConfig.addPassthroughCopy('./src/styles/style.css');
    eleventyConfig.addPassthroughCopy('./src/styles/homepage.css');
    eleventyConfig.addPassthroughCopy('./src/styles/blog.css');
    eleventyConfig.addPassthroughCopy('./src/assets');
    eleventyConfig.addPassthroughCopy('./src/admin');
    eleventyConfig.addPassthroughCopy('./src/script.js');

    eleventyConfig.addFilter('postDate', (dateObj) => {
        return DateTime.fromJSDate(dateObj).toLocaleString(DateTime.DATE_MED);
    })

    return {
        dir: {
            input: 'src',
            output: 'public'
        }
    }
}
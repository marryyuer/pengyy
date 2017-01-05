exports.getWeatherData = function() {
    return {
        locations: [{
            name: 'Porland',
            forecastUrl: 'http://www.wunderground.com/US/OR/Parland.html',
            iconUrl: 'http://icons-ak.wxug.com/i/c/k/cloudy.gif',
            weather: 'Overcast',
            temp: '54.1 F (12.3 C)'
        },{
            name: 'Bend',
            forecastUrl: 'http://www.wunderground.com/US/OR/Bend.html',
            iconUrl: 'http://icons-ak.wxug.com/i/c/k/partlycloudy.gif',
            weather: 'Pratly Cloudy',
            temp: '55.1 F (12.8 C)'
        },{
            name: 'New York',
            forecastUrl: 'http://www.wunderground.com/US/OR/Newyork.html',
            iconUrl: 'http://icons-ak.wxug.com/i/c/k/rain.gif',
            weather: 'Rain',
            temp: '52.1 F (10.3 C)'
        },]
    };
}
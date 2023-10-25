import chalk from 'chalk';
import dedent from 'dedent';

const printError = (err) => {
	console.log(chalk.redBright('Error:') + ' ' + err);
};

const printSuccess = (message) => {
	console.log(chalk.greenBright('Success:') + ' ' + message);
};

const printHelp = () => {
	console.log(dedent`
        ${chalk.bgYellow('HELP PART')}
        -s for save city
        -h for get help
        -t for save token ( API_KEY )
    `);
};

const printWeather = (resp, icon) => {
	console.log(dedent`
        ${chalk.bgCyan('Weather')} City name: ${resp.name}
        Status: ${icon}  ${resp.weather[0].description.toUpperCase()}
        Temperature: ${Math.trunc(resp.main.temp)}°C
        Humidity: ${resp.main.humidity}%
        Wind speed: ${resp.wind.speed}s
    `);
};

export { printError, printSuccess, printHelp, printWeather };

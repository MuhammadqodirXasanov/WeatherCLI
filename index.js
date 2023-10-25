import getArgs from './helpers/args.js';
import { getWeather, getIcon } from './services/apiService.js';
import {
	printError,
	printSuccess,
	printHelp,
	printWeather,
} from './services/logService.js';
import {
	saveKeyValue,
	getKeyValue,
	TOKEN_DICTIONARY,
} from './services/storageService.js';

const saveToken = async (token) => {
	if (!token.length) {
		printError("Token doesn't exist");
		return;
	}

	try {
		await saveKeyValue(TOKEN_DICTIONARY.token, token);
		printSuccess('Token is saved');
	} catch (err) {
		printError(err.message);
	}
};

const saveCity = async (city) => {
	if (!city.length) {
		printError("City doesn't exist");
		return;
	}

	try {
		await saveKeyValue(TOKEN_DICTIONARY.city, city);
		printSuccess('City is saved');
	} catch (err) {
		printError(err.message);
	}
};

const getForecast = async () => {
	try {
		const city = process.env.CITY ?? (await getKeyValue(TOKEN_DICTIONARY.city));
		const response = await getWeather(city);
		printWeather(response, getIcon(response.weather[0].icon));
	} catch (err) {
		if (err?.message?.status == 404) {
			printError('City not found!');
		} else if (err?.response?.status == 401) {
			printError('Invalid token!');
		} else {
			printError(err.message);
		}
	}
};

const startCLI = () => {
	const args = getArgs(process.argv); // node index [ ..values.. ]

	if (args.h) {
		return printHelp();
	}
	if (args.s) {
		return saveCity(args.s);
	}
	if (args.t) {
		return saveToken(args.t);
	}

	return getForecast();
};

startCLI();

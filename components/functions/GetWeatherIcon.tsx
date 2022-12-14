import NightCloudyIcon from "../Icons/NightCloudyIcon";
import NightIcon from "../Icons/NightIcon";
import SunIcon from "../Icons/SunIcon";
import CloudyIcon from "../Icons/CloudyIcon";
import RainyIcon from "../Icons/RainyIcon";
import Snowy from "../Icons/Snowy";
import PartlyCloudy from "../Icons/PartlyCloudy";

export interface GetWeatherIconProps {
	weather: {
		cloudcover: number;
		sunset: string | Date;
		datetime: string | Date;
		preciptype: string[];
		precip: number;
		snow: number;
	};
	little?: boolean;
}

export const GetWeatherIcon = ({
	weather,
	little = false,
}: GetWeatherIconProps) => {
	let cloudcover = weather?.cloudcover;
	let sunsetData = weather?.sunset;
	let datetime = Date.now();
	const date = new Date(datetime)
		.toLocaleString("en-EN", options)
		.replace(/,/g, "");
	const sunset = Date.parse(`${date} ${sunsetData} GMT+0100`);

	if (!little) {
		if (cloudcover > 50 && datetime > sunset) {
			return little ? <NightCloudyIcon little /> : <NightCloudyIcon />;
		}
		if (datetime > sunset) {
			return little ? <NightIcon little /> : <NightIcon />;
		}
	}

	if (weather?.preciptype === null && cloudcover <= 25) {
		return little ? <SunIcon little /> : <SunIcon />;
	}
	if (weather?.preciptype === null && cloudcover > 25 && cloudcover < 60) {
		return little ? <PartlyCloudy little /> : <PartlyCloudy />;
	}
	if (weather?.preciptype === null && cloudcover >= 60) {
		return little ? <CloudyIcon little /> : <CloudyIcon />;
	}
	if (
		(weather?.preciptype?.includes("rain") || weather?.precip > 0.1) &&
		cloudcover > 40
	) {
		return little ? <RainyIcon little /> : <RainyIcon />;
	}
	if (weather?.preciptype?.includes("snow") || weather?.snow > 0) {
		return little ? <Snowy little /> : <Snowy />;
	}
};

export const options: Intl.DateTimeFormatOptions = {
	weekday: "short",
	year: "numeric",
	month: "short",
	day: "numeric",
};

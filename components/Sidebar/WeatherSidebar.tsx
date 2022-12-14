import React, { useEffect, useState } from "react";
import { useCurrentWeather } from "../../services/api/weather";
import { capitalizeFirstLetter } from "../functions/CapitalizeFirstLetter";
import { GetWeatherIcon } from "../functions/GetWeatherIcon";
import Text from "../Typography/Text";

export default function WeatherSidebar() {
	return (
		<div className='h-screen p-5 pt-6 min-w-[360px] bg-blue-700 border-l border-stroke-blue'>
			<DateTime />
			<Weather />
		</div>
	);
}

function DateTime() {
	const [currentDateTime, setCurrentDateTime] = useState(new Date());

	useEffect(() => {
		const intervalId = setInterval(() => {
			setCurrentDateTime(new Date());
		}, 1000);

		return () => clearInterval(intervalId);
	}, []);

	let options: Intl.DateTimeFormatOptions = {
		weekday: "long",
		year: "numeric",
		month: "long",
		day: "numeric",
	};

	return (
		<div className='border-b border-stroke-blue pb-4'>
			<h1 className='text-[42px] font-black text-grey-text-active leading-10'>
				{currentDateTime.getHours()}:
				{currentDateTime.getMinutes() < 9
					? `0${currentDateTime.getMinutes()}`
					: `${currentDateTime.getMinutes()}`}
			</h1>

			<p className='text-18 ml-1 mt-1 font-regular text-grey-text-active'>
				{" "}
				{capitalizeFirstLetter(
					currentDateTime.toLocaleDateString("fr-FR", options)
				)}
			</p>
		</div>
	);
}

const Weather = () => {
	const [weather, setWeather] = useState(null);

	useEffect(() => {
		async function getWeather() {
			let res = await fetch(
				"https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/lille/next7days?unitGroup=metric&elements=datetime%2Cdescription%2Cprecip%2Cprecipprob%2Cprecipcover%2Ctempmax%2Ctempmin%2Ctemp%2Cpreciptype%2Csnow%2Cwindspeed%2Ccloudcover%2Csunset%2Csunelevation&include=current&elements=description&key=2CBRZML3U6EQ9CEMBDTR2PK9Y&contentType=json"
			);
			let response = await res.json();
			setWeather(response);
		}
		getWeather();
	}, []);

	const options: Intl.DateTimeFormatOptions = {
		weekday: "short",
		month: "short",
		day: "numeric",
	};

	return (
		<div className='mt-6'>
			<div className='flex gap-5 items-center'>
				<GetWeatherIcon weather={weather?.currentConditions} />
				<p className='text-[32px] font-sb text-grey-text-active leading-10'>
					{weather?.currentConditions.temp}°C
				</p>
			</div>
			<div className='flex flex-col divide-y divide-stroke-blue mt-6'>
				{weather?.days.slice(1, 6).map((day, index) => {
					const date = new Date(day.datetime);
					return (
						<div
							key={index}
							className={"flex items-center justify-between py-2"}>
							<div className={"flex items-center gap-2"}>
								<GetWeatherIcon little weather={day} />
								<p className='text-[16px] font-regular text-grey-text-active '>
									{day.temp}°C
								</p>
							</div>
							<Text color={"placeholder"} regular size={"14"}>
								{" "}
								{capitalizeFirstLetter(
									date.toLocaleDateString("fr-FR", options)
								)}{" "}
							</Text>
						</div>
					);
				})}
			</div>
		</div>
	);
};

import { useEffect, useState } from "react";
import { getMovies } from "../services/api/Movies/Movies";
import { getApiPaths } from "../services/api/routes";

export function UseFetchCategory(status, path, type = "") {
	const [filterData, setFilterdata] = useState({
		datas: null,
		label: "",
	});
	const [showFilteredData, setShowFilteredData] = useState(false);

	useEffect(() => {
		async function getTicketByCategory() {
			if (status !== "" && status !== "Tout") {
				setShowFilteredData(true);
				const data = await getMovies(getApiPaths(path, status, type));
				if (!data.error) {
					setFilterdata({ datas: data.data, label: status });
				} else {
					console.log("Erreur status", data);
				}
			} else {
				setShowFilteredMovies(false);
			}
		}
		getTicketByCategory();
	}, [status]);

	return [filterData, showFilteredData];
}

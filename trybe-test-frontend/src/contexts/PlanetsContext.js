import React, { useState, useEffect, createContext } from "react";
import api from "../services/api";


export const PlanetsContext = createContext({});


export function PlanetsProvider({ children }) {

	
	const [data, setData] = useState([]);

	//filtros de busca
	const [filters, setFilters] = useState({
		filterByName: {
			name: ""
		},
		filterByNumericValues: [
		],
		order: {
			column: "name",
			sort: "ASC",
		}
	});

	useEffect(() => {
		api.get("planets/")
			.then(response => {
				if (response.status === 200) {
					setData(response.data.results);
				}
			}).catch(erro => console.log(erro.message));
	}, []);

	return (
		<PlanetsContext.Provider value={[{ data, setData }, { filters, setFilters }]}>
			{children}
		</PlanetsContext.Provider>
	);
}
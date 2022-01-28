import React from "react";
import { formatDate } from "../services/formatDate";
import { usePlanets } from "../hooks/usePlanets";


function makeComparation(column, comparation, value) {

	const numColumn = Number(column);
	const numValue = Number(value);

	if (comparation === "maior que") return numColumn > numValue;
	if (comparation === "menor que") return numColumn < numValue;
	if (comparation === "igual a") return numColumn === numValue;

	return numColumn > numValue;
}


export default function Table() {

	const [{ data }, { filters }] = usePlanets();

	const nameFilter = filters.filterByName.name.toLowerCase(); 
	const numericFilters = filters.filterByNumericValues;
	const sortColumn = filters.order.column;
	const sortMethod = filters.order.sort;


	const planetsNameFiltred = data.filter(planet => {
		const planetName = planet.name.toLowerCase(); 

		if (planetName.includes(nameFilter)) return true;
		return false;
	});

	
	const planetsNumericFiltred = planetsNameFiltred.filter(planet => {
		if (numericFilters.length > 0) {
			
			for (let index = 0; index < numericFilters.length; index++) {
				const numericFilter = numericFilters[index];
				const columnName = numericFilter.column;
				const comparation = numericFilter.comparison;
				const valueToCompare = Number(numericFilter.value); 
				if (!makeComparation(planet[columnName], comparation, valueToCompare)) {
					return false;
				}
			}
			return true;
		} else {
			return true;
		}
	});


	const planets = planetsNumericFiltred.sort((actual, next) => {
		const actualValue = actual[sortColumn];
		const nextValue = next[sortColumn];

		
		if (sortMethod === "ASC") {
			return actualValue.localeCompare(nextValue, undefined, { numeric: true, sensitive: "base" });
		}
		return nextValue.localeCompare(actualValue, undefined, { numeric: true, sensitive: "base" });
	});

	return (
		<table className="table table-striped table-bordered table-hover">
			<thead>
				<tr>
					<th>Nome</th>
					<th>Filmes</th>
					<th>Clima</th>
					<th>Diâmetro</th>
					<th>Gravidade</th>
					<th>População</th>
					<th>Água da Superfície</th>
					<th>Terreno</th>
					<th>Periodo de Rotação</th>
					<th>Periodo de Órbita</th>
					<th>Criado em</th>
					<th>Editado em</th>
					<th>URL</th>
				</tr>
			</thead>
			<tbody>
				{
					planets.map((planet, id) => (
						<tr key={id}>
							<td> {planet.name}</td>
							<td>
								{
									planet.films.map(film => {
										const filmId = film.split("/")[5];
										return (
											<React.Fragment key={filmId} >
												<a href={film} target='_blank' rel="noreferrer">{"Filme: " + filmId}</a>{" "}
											</React.Fragment>
										);
									})
								}
							</td>
							<td> {planet.climate}</td>
							<td> {planet.diameter}</td>
							<td> {planet.gravity}</td>
							<td> {planet.population}</td>
							<td> {planet.surface_water}</td>
							<td> {planet.terrain}</td>
							<td> {planet.rotation_period}</td>
							<td> {planet.orbital_period}</td>
							<td> {formatDate(planet.created)}</td>
							<td> {formatDate(planet.edited)}</td>
							<td><a href={planet.url}>GO</a> </td>
						</tr>
					))
				}
			</tbody>
		</table >
	);
}
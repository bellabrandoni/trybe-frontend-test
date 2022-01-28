import React from "react";
import NameFilter from "./NameFilter";
import NumericFilter from "./NumericFilter";
import OrderFilter from "./OrderFilter";


export default function HoldFilter() {

	return (
		<div className="btn-group">
			<NameFilter />
			<NumericFilter />
			<OrderFilter />
		</div>
	);
}
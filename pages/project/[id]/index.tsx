import React from "react";
import Layout from "../../../components/Layout/Layout";
import Heading from "../../../components/Typography/Heading";

export default function Project() {
	return (
		<Layout title='Project'>
			<div className='p-5'>
				<Heading> Select a widget </Heading>
			</div>
		</Layout>
	);
}

Project.auth = true;

import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineTaskAlt } from "react-icons/md";
import { HiOutlineTicket } from "react-icons/hi";

export function getIcon(id) {
	switch (id) {
		case 1:
			// Notes
			return <span> &#128221;</span>;
		case 2:
			// Tasks
			return <span> &#128736;</span>;
		case 3:
			// Tickets
			return <span className='pb-1'> &#127915;</span>;
	}
}

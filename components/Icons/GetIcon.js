import React from "react";
import { AiOutlineEdit } from "react-icons/ai";
import { MdOutlineTaskAlt } from "react-icons/md";
import { HiOutlineTicket } from "react-icons/hi";

export function getIcon(id) {
	switch (id) {
		case 1:
			return <AiOutlineEdit />;
		case 2:
			return <MdOutlineTaskAlt />;
		case 3:
			return <HiOutlineTicket />;
	}
}

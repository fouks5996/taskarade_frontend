import { useState } from "react";
import ReactModal from "react-modal";
ReactModal.setAppElement("#__next");

interface ModalTemplateProps {
	children: React.ReactNode;
	IsOpen: boolean;
	onRequestClose: Function;
	maxHeight?: string;
	minWidth?: string;
	maxWidth?: string;
	width?: string;
}

export default function ModalTemplate({
	children,
	IsOpen,
	onRequestClose,
	maxHeight = "90%",
	minWidth = "40%",
	maxWidth = "600px",
	width = "85%",
}) {
	const customStyles = {
		content: {
			top: "50%",
			left: "50%",
			transform: "translate(-50%, -50%)",
			backgroundColor: "#131925",
			borderColor: "#2D343F",
			maxHeight: maxHeight,
			width: width,
			height: "fit-content",
			minWidth: minWidth,
			maxWidth: maxWidth,
			padding: "0",
			borderRadius: "14px",
		},
		overlay: {
			backgroundColor: "rgba(0, 0, 0, 0.30)",
			zIndex: "9999999999999999",
		},
	};

	return (
		<ReactModal
			closeTimeoutMS={500}
			isOpen={IsOpen}
			onRequestClose={onRequestClose}
			style={customStyles}>
			{children}
		</ReactModal>
	);
}

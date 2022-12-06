export default function getMinId(datas:datasTypes) {
	const ids = datas.map((widget: { id: number; }) => {
		return widget.id;
	});
	const minId = Math.min(...ids);
	return minId;
}

interface datasTypes{
	[x: string]: any;
	datas:{
		id: number
	}[]
}

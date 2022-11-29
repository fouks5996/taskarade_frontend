export default function getMinId(datas) {
	const ids = datas.map((widget) => {
		return widget.id;
	});
	const minId = Math.min(...ids);
	return minId;
}

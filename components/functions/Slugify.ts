export default function string_to_slug(str: string) {
	const slug = str?.replace(/[^a-zA-Z0-9\s]/g, '').replace(/\s+/g, '-').toLowerCase();
	return slug;
}

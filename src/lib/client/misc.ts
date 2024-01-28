export function removeHTMLFromString(input: string): string {
	return input.replace(/<[^>]*>/g, '');
}

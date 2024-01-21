export default function() {
	if (import.meta.hot) {
		import.meta.hot.on('vite:beforeFullReload', () => {
			throw '(skipping full reload)';
		});
	}
}

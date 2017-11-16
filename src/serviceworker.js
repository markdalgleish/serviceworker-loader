
export default function serviceWorker(publicPath, file) {
	return `

export class ServiceWorkerNoSupportError extends Error {

	constructor() {
		super('ServiceWorker is not supperted.');
	}
}

export default function registerServiceWorkerIfSupported(options) {

	if ('serviceWorker' in navigator) {
		return navigator.serviceWorker.register(${publicPath} + ${file}, options);
	}

	return Promise.reject(new ServiceWorkerNoSupportError());
}

`;
}

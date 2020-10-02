importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.9.4/firebase-messaging.js');

firebase.initializeApp({
	messagingSenderId: '218318671899',
});

const messaging = firebase.messaging();

messaging.setBackgroundMessageHandler(function (payload) {
	const { title, body, icon } = JSON.parse(payload.data.notification);
	const options = {
		body,
		icon,
	};

	const promiseChain = clients
		.matchAll({
			type: 'window',
			includeUncontrolled: true,
		})
		.then((windowClients) => {
			for (let i = 0; i < windowClients.length; i++) {
				const windowClient = windowClients[i];
				windowClient.postMessage(payload);
			}
		})
		.then(() => {
			return self.registration.showNotification(title);
		});
	return promiseChain;
});

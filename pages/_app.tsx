import React from 'react';
import Head from 'next/head';
import { Provider } from 'mobx-react';
import stores from '../src/stores';
import App from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'styles/Default.scss';
import 'react-toastify/scss/main.scss';

export default class MyApp extends App {
	componentDidMount() {
		navigator.serviceWorker
			.register('/firebase-messaging-sw.js')
			.catch((err) => {
				console.error('Service worker registration failed', err);
			});
	}

	render() {
		const { Component, pageProps } = this.props;

		return (
			<Provider store={stores}>
				<Head>
					<link rel="shortcut icon" href="/assets/icon/shortcut.PNG" />
					<title>YLog</title>
				</Head>
				<ToastContainer pauseOnHover={false} />
				<Component {...pageProps} />
			</Provider>
		);
	}
}

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
		navigator.serviceWorker.register('/firebase-messaging-sw.js');
	}

	render() {
		const { Component, pageProps } = this.props;

		return (
			<Provider store={stores}>
				<Head>
					<meta
						name="viewport"
						content="width=device-width, initial-scale=1.0"
					/>
					<link rel="shortcut icon" href="/assets/icon/shortcut.PNG" />
					<title>YLog</title>
				</Head>
				<ToastContainer pauseOnHover={false} />
				{typeof window !== 'undefined' && <Component {...pageProps} />}
			</Provider>
		);
	}
}

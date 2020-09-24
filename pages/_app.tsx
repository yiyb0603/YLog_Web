import React from 'react';
import Head from 'next/head';
import { Provider } from 'mobx-react';
import stores from '../src/stores';
import App from 'next/app';
import { ToastContainer } from 'react-toastify';
import 'styles/Default.scss';
import 'react-toastify/scss/main.scss';

export default class MyApp extends App {
	render() {
		const { Component, pageProps } = this.props;

		return (
			<Provider store={stores}>
				<Head>
					<link rel="shortcut icon" href="/icon/shortcut.PNG" />
					<title>YLog</title>
				</Head>
				<ToastContainer pauseOnHover={false} />
				<Component {...pageProps} />
			</Provider>
		);
	}
}

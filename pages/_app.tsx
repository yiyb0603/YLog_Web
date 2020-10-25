import React, { Component } from 'react';
import Head from 'next/head';
import { Provider } from 'mobx-react';
import stores from '../src/stores';
import axios from 'axios';
import { ToastContainer } from 'react-toastify';
import 'styles/AllStyles.scss';
import 'react-toastify/scss/main.scss';

export default class MyApp extends Component {
	componentDidMount() {
		navigator.serviceWorker.register('/firebase-messaging-sw.js');
	}

	static async getInitialProps(context: any) {
		const { ctx, Component } = context; // next에서 넣어주는 context
		let pageProps = {};
		if (Component.getInitialProps) {
			pageProps = await Component.getInitialProps(ctx);
		}

		return { pageProps };
	}

	render() {
		const { Component, pageProps }: any = this.props;

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
				<Component {...pageProps} />
			</Provider>
		);
	}
}

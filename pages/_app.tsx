import React, { Component } from 'react';
import Head from 'next/head';
import { Provider } from 'mobx-react';
import stores from '../src/stores';
import axios from 'axios';
import { getCookie } from 'lib/Cookie';
import Constants from 'Constants';
import { clearStorage } from 'lib/Storage';
import 'styles/AllStyles.scss';

export default class MyApp extends Component {
	componentDidMount() {
		navigator.serviceWorker.register('/firebase-messaging-sw.js');
		
		const { USER_TOKEN, ADMIN_TOKEN } = Constants;
		if (!getCookie(USER_TOKEN) && !getCookie(ADMIN_TOKEN)) {
			clearStorage();
		}
	}

	static async getInitialProps(context: any) {
		const { ctx, Component } = context;
		const isServer: boolean = typeof window === 'undefined';
		let pageProps = {};

		if (isServer) {
			if (ctx.req.headers) {
				const cookie: string = ctx.req.headers.cookie ? ctx.req.headers.cookie : null;
				axios.defaults.headers.cookie = cookie;
			}
		}
		

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
						name='viewport'
						content='width=device-width, initial-scale=1.0'
					/>
					<link rel='shortcut icon' href='/assets/icon/shortcut.PNG' />
					<title>YLog</title>
				</Head>
				<Component {...pageProps} />
			</Provider>
		);
	}
}

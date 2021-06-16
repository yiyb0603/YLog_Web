import axios, { AxiosResponse } from 'axios';
import { SERVER } from 'config/config.json';

export const getResponse = async (
	url: string,
	token?: string | null | undefined
) => {
	try {
		const { data }: AxiosResponse = await axios.get(`${SERVER}${url}`, {
			headers: token && {
				'ylog-token': token,
			},
		});
		return data;
	} catch (error) {
		throw error;
	}
};

export const postRequest = async (
	url: string,
	request: any,
	token?: string | null | undefined
) => {
	try {
		const { data }: AxiosResponse = await axios.post(
			`${SERVER}${url}`,
			request,
			{
				headers: token && {
					'ylog-token': token,
				},
			}
		);
		return data;
	} catch (error) {
		throw error;
	}
};

export const modifyRequest = async (
	url: string,
	request: any,
	token?: string | null
) => {
	try {
		const { data }: AxiosResponse = await axios.put(
			`${SERVER}${url}`,
			request,
			{
				headers: token && {
					'ylog-token': token,
				},
			}
		);
		return data;
	} catch (error) {
		throw error;
	}
};

export const deleteRequest = async (url: string, token?: string | null) => {
	try {
		const { data }: AxiosResponse = await axios.delete(`${SERVER}${url}`, {
			headers: token && {
				'ylog-token': token,
			},
		});
		return data;
	} catch (error) {
		throw error;
	}
};

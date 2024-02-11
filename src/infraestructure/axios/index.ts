import axios from 'axios'
import { useErrorHandling } from '@/Share/utils/errorHandling'
import messageState from '@/application/messageState';

const axiosInstance = axios.create({
	baseURL: import.meta.env.VITE_API_BASE_URL,
	timeout: import.meta.env.VITE_API_TIMEOUT
})

const { setError, clearErrors} = useErrorHandling();
const { resetMessageState } = messageState();

export const get = (url: string) => {
	return axiosInstance.get(`${axiosInstance.defaults.baseURL}/${url}`, {   })
}

export const deleteItem = (url: string) => {
	return axiosInstance.delete(`${axiosInstance.defaults.baseURL}/${url}`, {   })
}

export const post = (url: string, body:any) => {
	return axiosInstance.post(`${axiosInstance.defaults.baseURL}/${url}`, body, {  })
}

export const put = (url: string, body:any) => {
	return axiosInstance.put(`${axiosInstance.defaults.baseURL}/${url}`, body, {   })
}

export const postForm = (url: string, body:any) => {
	return axiosInstance.postForm(`${axiosInstance.defaults.baseURL}/${url}`, body, {  })
}

export const putForm = (url: string, body:any) => {
	return axiosInstance.putForm(`${axiosInstance.defaults.baseURL}/${url}`, body, { })
}


function parseDates(obj: any) {
	for (const key in obj) {
	if (typeof obj[key] === 'string' && isIsoDateString(obj[key])) {
		const date = Date.parse(obj[key]);

		if (!isNaN(date)) {
		obj[key] = new Date(date);
		}
	} else if (typeof obj[key] === 'object') {
		parseDates(obj[key]);
	}
	}
}

function parseNull(obj: any) {
	for (const key in obj) {
		if (obj[key] === null || obj[key] === "") {
			obj[key] = undefined;
		}else if (typeof obj[key] === 'object') {
			parseNull(obj[key]);
		}
	}
}


function isIsoDateString(str: string) {
	const isoDatePattern = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(\.\d+)?(([+-]\d{2}:\d{2})|Z)?$/;
	return isoDatePattern.test(str);
}
  

axiosInstance.interceptors.response.use(
	(response) => {
		clearErrors();
		parseDates(response.data);
		return response;
	},
	(error) => {
		// Si hay un error en la respuesta, maneja los errores aquí
		clearErrors();
		if (error.response && error.response.data.errors) {
		  const errors = error.response.data.errors;
		  for (const field in errors) {
			setError(field, errors[field]);
		  }
		}
		// Rechaza la promesa con el objeto de error
		return Promise.reject(error);
	});


axiosInstance.interceptors.request.use((request) => {
	resetMessageState();
	parseNull(request.data);
	return request;
});
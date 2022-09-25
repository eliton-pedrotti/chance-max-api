import { UnauthorizedException } from '@nestjs/common';
import axios, { AxiosResponse } from 'axios';
import { AmountCapturePayment, PagseguroPayment } from 'src/@types/pagseguro.types';

require('dotenv').config();
const { PAGSEGURO_TOKEN, BASE_URL_SPORTMONKS, BASE_URL_PAGSEGURO  } = process.env;
export class Axios {

    constructor() { }

    public async get(endpoint: string, pagination?: Boolean): Promise<any> {
        if (pagination) {
            return (await axios.get<AxiosResponse<any>>(`${BASE_URL_SPORTMONKS}${endpoint}`)).data;
        }
        const { data } = await (await axios.get<AxiosResponse<any>>(`${BASE_URL_SPORTMONKS}${endpoint}`)).data;
        return data;
    }

    public async post(endpoint: string, payload: PagseguroPayment | AmountCapturePayment) {
        try {
            return (await axios.post(`${BASE_URL_PAGSEGURO}${endpoint}`,
                payload,
                {
                    headers: {
                        'Authorization': `Bearer ${PAGSEGURO_TOKEN}`,
                    }
                }
            )).data;
        } catch (error) {
            const err = {
                description: error.response.data.error_messages[0].description,
                message: error.response.data.error_messages[0].message,
                parameter_name: error.response.data.error_messages[0].parameter_name
            }
            throw new UnauthorizedException(err);
        }
    }
}
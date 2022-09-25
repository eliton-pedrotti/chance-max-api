import * as joi from 'joi';
import { messagesPtBr } from 'src/constants/messages';

export const userSchema = joi.object({
    name: joi.string().required().messages(messagesPtBr),
    email: joi.string().required().messages(messagesPtBr),
    password: joi.string().required().messages(messagesPtBr),
    cpf: joi.string().required().messages(messagesPtBr),
    birthday: joi.string().required().messages(messagesPtBr),
    phone: joi.string().required().messages(messagesPtBr),
    address: joi.object({
        CEP: joi.string().required().messages(messagesPtBr),
        street: joi.string().required().messages(messagesPtBr),
        district: joi.string().required().messages(messagesPtBr),
        number_address: joi.string().required().messages(messagesPtBr),
        complement: joi.string().required().messages(messagesPtBr),
        city: joi.string().required().messages(messagesPtBr),
        state: joi.string().required().messages(messagesPtBr),
    }).required().messages(messagesPtBr),
    card: joi.object({
        card_number: joi.string().required().messages(messagesPtBr),
        card_name: joi.string().required().messages(messagesPtBr),
        exp_month: joi.string().required().messages(messagesPtBr),
        exp_year: joi.string().required().messages(messagesPtBr),
        security_code: joi.string().required().messages(messagesPtBr),
    }).required().messages(messagesPtBr),
    plan: joi.string().required().valid("1", "2", "3").messages(messagesPtBr),

})
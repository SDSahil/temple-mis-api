import Joi from "joi";
import { ALPHABETICAL_STRING, EMAIL, PASSWORD, PHONE } from "../configs/regex.js";

const phoneNumber = Joi.extend(joi => ({
    type: 'mobile',
    base: joi.string(),
    coerce: val => ({ value: '' + val })
}));

const userCreation = Joi.object({
    name: Joi.object().required().keys({
        firstName: Joi.string().required().pattern(ALPHABETICAL_STRING),
        lastName: Joi.string().required().pattern(ALPHABETICAL_STRING),
        middleName: Joi.string().allow('').pattern(ALPHABETICAL_STRING),
    }),
    email: Joi.string().pattern(EMAIL),
    // phone: Joi.string().required().pattern(PHONE),
    phone: phoneNumber.mobile().required().pattern(PHONE),
    password: Joi.string().required().pattern(PASSWORD),
    role: Joi.string().pattern(ALPHABETICAL_STRING)
});

export { userCreation };
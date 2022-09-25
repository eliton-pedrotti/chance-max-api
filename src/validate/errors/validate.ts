import { ObjectSchema } from 'joi';
import { EntityErrorCreator } from './entity-error';
import { ResponseCreator } from './response';
export function validate<T>(data: T, schema: ObjectSchema): T {
    const result = schema.validate(data, { abortEarly: false });
    if (result.error) {
        throw ResponseCreator.errorValidate(EntityErrorCreator.allOf(result.error.details));
    }
    return data;
}
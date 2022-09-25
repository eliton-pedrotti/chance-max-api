import { Entity } from "./entity";
import { EntityError } from "./entity-error";

export class Response<T> {
  constructor(
    public entity?: Entity<T>,
  ) { }
}

export class ResponseCreator {
  public static errorValidate<T>(errors: EntityError[]): Response<T> {
    return new Response({
      errors: errors && errors.length ? errors : undefined,
    });
  }
}

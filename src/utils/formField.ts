interface DefaultField<Value> {
  state: 'default';
  value: Value;
}
interface ValidField<Value, Data> {
  state: 'valid';
  value: Value;
  validatedValue: Data;
}
interface InvalidField<Value> {
  state: 'invalid';
  value: Value;
  error: string;
}

export type Field<Value, Data> =
  | DefaultField<Value>
  | ValidField<Value, Data>
  | InvalidField<Value>;

export const defaultField = <Value>(value: Value): DefaultField<Value> => ({
  state: 'default',
  value
});

export const validField = <Value, Data>(
  value: Value,
  validatedValue: Data
): ValidField<Value, Data> => ({
  state: 'valid',
  value,
  validatedValue
});

export const invalidField = <Value>(
  value: Value,
  error: string
): InvalidField<Value> => ({
  state: 'invalid',
  value,
  error
});

export const isValid = <Value, Data>(
  field: Field<Value, Data>
): field is ValidField<Value, Data> => field.state === 'valid';

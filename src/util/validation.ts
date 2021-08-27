import { parseTimeString } from './time-string';

interface ValidatorPassResult {
  valid: true
}

interface ValidatorFailResult {
  valid: false
  errors: string[]
}

interface Validator {
  (value: unknown): ValidatorPassResult | ValidatorFailResult
}

export const objectValidator = <T extends Record<string, unknown>>(
  prefix: string,
  fieldValidators: Record<keyof T, Validator>
): Validator => 
    value => {
      const errors: string[] = [];
      if (typeof value !== `object`) errors.push(`expected type 'object', got '${typeof value}'`);
      if (typeof value === null) errors.push(`${prefix}: expected type 'object', got 'null'`);
      if (errors.length > 0) return { valid: false, errors };

      for (const [field, isValid] of Object.entries(fieldValidators)) {
        // @ts-expect-error allow value[field]
        const fieldValue = value[field];
        const result = isValid(fieldValue);
        if (!result.valid) {
          const isObject = () => typeof fieldValue === `object` && fieldValue !== null;
          const isArray = () => Array.isArray(fieldValue);
          if (isObject() && !isArray()) errors.push(...result.errors.map(error => `${prefix}${error}`));
          else if (isArray()) errors.push(...result.errors.map(error => `${prefix}.${field}${error}`));
          else errors.push(`${prefix}.${field} ${result.errors}`);
        }
      }
      if (errors.length > 0) return { valid: false, errors };
      
      return { valid: true };
    };

const scalarValidatorFactory = (type: `string` | `number` | `boolean`): Validator =>
  value =>
    typeof value === type
      ? { valid: true }
      : { valid: false, errors: [`expected type '${type}', got '${typeof value}'`] };

export const validString: Validator = scalarValidatorFactory(`string`);
export const validNumber: Validator = scalarValidatorFactory(`number`);
export const validBoolean: Validator = scalarValidatorFactory(`boolean`);

export const validEnum = <T>(targetEnum: T): Validator =>
  value => {
    if (typeof value !== `string`) return { valid: false, errors: [`expected one of [${Object.values(targetEnum).join(`, `)}], got type '${typeof value}'`] };
    if (!Object.values(targetEnum).includes(value)) return { valid: false, errors: [`expected one of [${Object.values(targetEnum).join(`, `)}], got '${value}'`] };
    return { valid: true };
  };

export const validTimeString: Validator = value =>
  typeof value === `string` && parseTimeString(value)?.seconds !== undefined
    ? { valid: true }
    : { valid: false, errors: [`expected time string matching (\\d+h)?(\\d+m)?(\\d+s)? with at least one component (e.g. 5m30s), got '${value}'`] };

export const validArray = (elementValidator: Validator): Validator =>
  value => {
    if (!Array.isArray(value)) return { valid: false, errors: [`expected type 'array', got '${typeof value}'`] };
    const elementValidationResults = value.map((element, idx) => ({ result: elementValidator(element), idx }));
    const failedResults = elementValidationResults.filter((elementResult): elementResult is { result: ValidatorFailResult, idx: number } => !elementResult.result.valid);
    if (failedResults.length > 0) return { valid: false, errors: failedResults.flatMap(({ idx, result: { errors } }) => errors.map(error => `[${idx}] ${error}`)) };
    return { valid: true };
  };

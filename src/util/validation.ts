import * as t from 'io-ts';
import { fold } from 'fp-ts/lib/Either';
import { Reporter } from 'io-ts/lib/Reporter';

const REPORTER_EXCLUDE_NAME = `@REPORTER_EXCLUDE`;

export const typeUnion = (codecs: [t.Mixed, t.Mixed, ...t.Mixed[]]) =>  t.union(codecs, REPORTER_EXCLUDE_NAME);

export const typeWithOptionals = (requiredProps: t.Props, optionalProps: t.Props) => t.intersection([
  t.type(requiredProps, REPORTER_EXCLUDE_NAME),
  t.partial(optionalProps, REPORTER_EXCLUDE_NAME),
]);

export const fromEnum = <T>(theEnum: Record<string, string | number>, name?: string) => {
  const isEnumValue = (input: unknown): input is T => Object.values<unknown>(theEnum).includes(input);

  return new t.Type<T>(
    name ?? ``,
    isEnumValue,
    (input, context) => (isEnumValue(input) ? t.success(input) : t.failure(input, context)),
    t.identity
  );
};

const getContextPath = (context: t.Context) => context
  .filter(({ type }) => type.name !== REPORTER_EXCLUDE_NAME)
  .map(({ key }) => key)
  .join(`.`)
  .replace(/\.(\d+)(\.?)/g, `[$1]$2`)
  .replace(/^\./, ``);

const getExpectedType = (context: t.Context) => {
  const name = context.slice().reverse().find(() => true)?.type.name || `unknown`;
  if (name.includes(`@REPORTER_EXCLUDE`)) return `unknown`;
  return name.length < 50 ? name : `object`;
};

export const PathReporter: Reporter<Array<string>> = {
  report: fold(
    errors => errors.map(error => error.message ?? `Invalid value ${JSON.stringify(error.value)} for ${getContextPath(error.context) || `unknown`} expected type ${getExpectedType(error.context)}`), 
    () => []
  ),
};

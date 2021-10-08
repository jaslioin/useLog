import { useEffect, useRef } from 'react';
type LoggerType =
  | 'debug'
  | 'error'
  | 'info'
  | 'log'
  | 'warn'
  | 'dir'
  | 'dirxml'
  | 'table'
  | 'trace'
  | 'group'
  | 'groupCollapsed'
  | 'groupEnd'
  | 'clear'
  | 'count'
  | 'countReset'
  | 'assert'
  | 'profile'
  | 'profileEnd'
  | 'time'
  | 'timeLog'
  | 'timeEnd'
  | 'timeStamp';

type WithLoggerType = {
  loggerType: LoggerType;
  previousStateLoggerType?: LoggerType;
};
type WithLogger = {
  logger: (value: any) => void;
  previousStateLogger?: (value: any) => void;
};
type CommonOptions = {
  logPreviousValue?: boolean;
};
type Options = CommonOptions & (WithLogger | WithLoggerType);
const fallbackLog = (v: any) =>
  console.log(
    '%c%s',
    `
  color:white;
  background-color:green; 
  border-radius:2px;
  padding:1px;
`,
    ' current  ',
    v
  );
const fallbackPrevLog = (v: any) =>
  console.log(
    '%c%s',
    `
  color:white;
  background-color:brown; 
  border-radius:2px;
  padding:1px;
`,
    ' previous ',
    v
  );
const isUseLoggerType = (options: any): options is WithLoggerType => {
  return !!options?.loggerType;
};
/**
 *
 * @param state
 * @param options
 * @example
 * ```ts
 *  // when using `options.loggerType`, pass a string representing logging functions under `console`
 *  useLog(state,{
 *    loggerType:"table"
 *  })
 *  // when using `options.logger`,pass a `function` wrapping the native logging api
 *  useLog(state,{
 *    logger:(v:any)=>console.log("%c%s","color:red",v)
 *  })
 * ```
 */
export const useLog = <T extends unknown>(state: T, options?: Options) => {
  const prev = useRef<T>();
  const logPreviousValue =
    options?.logPreviousValue === null ||
    options?.logPreviousValue === undefined
      ? true
      : options.logPreviousValue;

  useEffect(() => {
    const logger = isUseLoggerType(options)
      ? console[options?.loggerType]
      : options?.logger || fallbackLog;
    const prevLogger = isUseLoggerType(options)
      ? options?.previousStateLoggerType
        ? console[options?.previousStateLoggerType]
        : fallbackPrevLog
      : options?.logger
      ? options?.logger
      : fallbackPrevLog;
    if (logPreviousValue) {
      prevLogger(prev.current);
    }
    logger(state);

    prev.current = state;
  }, [state, options]);
};

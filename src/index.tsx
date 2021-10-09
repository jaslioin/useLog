import { useEffect, useRef } from 'react';
import { Options } from './types';
import {
  fallbackPrevLog,
  isUseLoggerType,
  fallbackLog,
  isNil,
  isUseLogger,
} from './utils';

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
export const useLog = <T extends unknown>(
  state: T,
  label?: string,
  options?: Options
) => {
  const prev = useRef<T>();

  useEffect(() => {
    const logPreviousValue = isNil(options?.logPreviousValue)
      ? true
      : options?.logPreviousValue;

    const logger = isUseLoggerType(options)
      ? options.loggerType
        ? console[options.loggerType]
        : fallbackLog
      : isUseLogger(options)
      ? options?.logger || fallbackLog
      : fallbackLog;

    const prevLogger = isUseLoggerType(options)
      ? options.previousStateLoggerType
        ? console[options.previousStateLoggerType]
        : fallbackPrevLog
      : isUseLogger(options)
      ? options?.logger || fallbackPrevLog
      : fallbackPrevLog;

    if (options?.isGrouped) console.group(label);

    if (logPreviousValue) {
      prevLogger(prev.current, label);
    }
    logger(state, label);

    if (options?.isGrouped) console.groupEnd();

    prev.current = state;
  }, [state, options, label]);
};

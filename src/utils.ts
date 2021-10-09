import { WithLogger, WithLoggerType } from './types';

export const fallbackLog = (v: any, label: string) =>
  console.log(
    `%c Current  %c ${label} `,
    `
    color:white;
    background-color:green; 
    border-radius:2px;
    `,
    `
    color:white;
    background-color:blue; 
    border-radius:2px;
    `,
    v
  );
export const fallbackPrevLog = (v: any, label: string) =>
  console.log(
    `%c Previous %c ${label} `,
    `
    color:white;
    background-color:brown; 
    border-radius:2px;
    `,
    `
    color:white;
    background-color:blue; 
    border-radius:2px;
    `,
    v
  );
export const isUseLoggerType = (options: any): options is WithLoggerType => {
  return !!options?.loggerType;
};
export const isUseLogger = (options: any): options is WithLogger => {
  return !!options?.logger;
};
export const isNil = (val: unknown): val is null | undefined =>
  val === null || val === undefined;

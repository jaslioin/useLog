export type LoggerType =
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

export type WithLoggerType = {
  loggerType?: LoggerType;
  previousStateLoggerType?: LoggerType;
};
export type WithLogger = {
  logger?: (value: any, label?: string) => void;
  previousStateLogger?: (value: any, label?: string) => void;
};
export type CommonOptions = {
  logPreviousValue?: boolean;
  isGrouped?: boolean;
};
export type Options = CommonOptions & (WithLogger | WithLoggerType | {});

# use-log

A React Hook shortcut to log state changes inside react component

Also a project to try out `tsdx`, a typescript library development tool

## Usage

### Basic

will execute the default styled `console.log(state)` upon state change

```ts
  const App = ()=>{
    const [state,setState] = useState({a:1})

    useLog(state)

    return </>
  }

```

### Options

```ts
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
```

- `Options.loggerType`

  when using `options.loggerType`, pass a string representing logging functions under `console`

```ts
useLog(state, {
  loggerType: 'table',
});
```

- `Options.logger`

  when using `options.logger`, pass a `function` wrapping the native logging api

```ts
useLog(state, {
  logger: (v: any) => console.log('%c%s', 'color:red', v),
});
```

## Caveat

**do not directly pass `console.*` as `logger`**

- react will override it into `disabledLog` to prevent it from logging

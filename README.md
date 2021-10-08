# use-log

A React Hook shortcut to log state changes inside react component

Also a project to try out `tsdx`, a typescript library development tool

## Usage

### Basic

```ts
  const App = ()=>{
    const [state,setState] = useState({a:1})

    // will execute the default styled console.log(state) upon state change
    useLog(state)

    return </>
  }

```

### Options

- `Options.loggerType`

  when using `options.loggerType`, pass a string representing logging functions under `console`

```ts
useLog(state, {
  loggerType: 'table',
});
```

- `Options.logger`
- when using `options.logger`, pass a `function` wrapping the native logging api

```ts
useLog(state, {
  logger: (v: any) => console.log('%c%s', 'color:red', v),
});
```

## Caveat

**do not directly pass `console.*` as `logger`**

- react will override it into `disabledLog` to prevent it from logging

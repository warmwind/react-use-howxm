# react-use-howxm

> Adds Howxm capabilities as custom hooks&quot;

[![NPM](https://img.shields.io/npm/v/react-use-howxm.svg)](https://www.npmjs.com/package/react-use-howxm) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-use-howxm
```

## Usage

```tsx
const App = () => {
  const appId = 'YOUR_APP_ID';
  const myLogger = console.info; // optional

  const {initHowxm, identifyHowxm} = useHowxm()
  useEffect(() => {
    const isReady = initHowxm(appId, myLogger);
    if (isReady) {
      identifyHowxm({'uid': 'my-uid'});
    }
  }, [initHowxm, identifyHowxm]);

  return (
    <div>
      <h1>Howxm Example</h1>
    </div>
  )
}
export default App

```

## License

MIT © [warmwind](https://github.com/warmwind)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).

This hook is inspired by [react-use-hotjar](https://github.com/olavoparno/react-use-hotjar).

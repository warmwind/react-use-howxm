# react-use-howxm

> Adds Howxm capabilities as custom hooks

[![NPM](https://img.shields.io/npm/v/react-use-howxm.svg)](https://www.npmjs.com/package/react-use-howxm) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save react-use-howxm
```

## Usage

```tsx
const App = () => {
  const { initHowxm, identifyHowxm, openHowxm, checkOpenHowxm } = useHowxm()
  const campaignId = '<Your Campaign ID>'
  const appId = '<Your App ID>'
  const uid = 'my-uid'
  useEffect(() => {
    const isReady = initHowxm(appId)
    if (isReady) {
      identifyHowxm({ uid })
    }
  }, [initHowxm, identifyHowxm])

  const handleShowClick = () => {
    openHowxm(campaignId, { uid }, { age: 30 }, () => {
      console.log('openHowxm finished')
    })
  }

  const handleCheckClick = () => {
    checkOpenHowxm(
      campaignId,
      uid,
      () => {
        console.log('checkOpenHowxm success')
      },
      () => {
        console.log('checkOpenHowxm failed')
      }
    )
  }

  return (
    <>
      <h1>Howxm SDK Example</h1>
      <button onClick={handleShowClick}>Show</button>
      <button onClick={handleCheckClick}>Check</button>
    </>
  )
}
```

## License

MIT © [warmwind](https://github.com/warmwind)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).

This hook is inspired by [react-use-hotjar](https://github.com/olavoparno/react-use-hotjar).

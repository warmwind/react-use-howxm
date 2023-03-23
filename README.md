# react-use-howxm

> Adds [Howxm](https://howxm.com/) capabilities as custom hooks to your react project

[![NPM](https://img.shields.io/npm/v/react-use-howxm.svg)](https://www.npmjs.com/package/react-use-howxm)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)
[![npm downloads](https://img.shields.io/npm/dt/react-use-howxm.svg?style=flat-square)](https://www.npmjs.com/package/react-use-howxm)

## Install

```bash
npm install --save react-use-howxm
```

## Usage

- Initializing Howxm

```tsx
import React from 'react'
import { useHowxm } from 'react-use-howxm'

const myLogger = console.info

const HowxmReadyApp = () => {
  const { initHowxm } = useHowxm()
  const appId = '<Your App ID>'

  useEffect(() => {
    initHowxm(appId, myLogger)
  }, [initHowxm])

  return <App />
}
```

- Identifying Customer ([Identify API's rules](https://howxm.com/help/articles/x-sdk-api#part-2ae9459859b8f9f3))

```tsx
import React from 'react'
import { useHowxm } from 'react-use-howxm'

const myLogger = console.info

const MyCustomComponent = () => {
  const { identifyHowxm } = useHowxm()
  const customerInfo = {
    uid: '00000001', // 用户唯一ID, 默认字段, 必填，string 类型
  }

  const handleUserInfo = (userInfo) => {
    identifyHowxm(customerInfo)
  }
}
```

- Check Open Campaign ([Check Open API's rules](https://howxm.com/help/articles/web-sdk-intro#4-checkopen))

```tsx
import React from 'react'
import { checkOpenHowxm } from 'react-use-howxm'

const myLogger = console.info

const MyCustomComponent = () => {
  const { checkOpenHowxm } = useHowxm()
  const campaignId = '<You Campaign ID>'
  const uid = '00000001'

  const handlecCheckOpenCampaign = () => {
    checkOpenHowxm(
      campaignId,
      customerInfo,
      () => {
        myLogger('checkOpenHowxm success')
      },
      (data) => {
        myLogger('checkOpenHowxm faield', data)
      }
    )
  }
}
```

- Open Campaign (Not recommended. [Open API's rules](https://howxm.com/help/articles/web-sdk-intro#3-open))

```tsx
import React from 'react'
import { useHowxm } from 'react-use-howxm'

const myLogger = console.info

const MyCustomComponent = () => {
  const { openHowxm } = useHowxm()
  const campaignId = '<You Campaign ID>'
  const customerInfo = {
    uid: '00000001', // 用户唯一ID, 默认字段, 必填，string 类型
  }
  const extra = {
    plan: 'free',
  }

  const handleOpenCampaign = () => {
    openHowxm(campaignId, customerInfo, extra, () => {
      myLogger('openHowxm finished')
    })
  }
}
```

- Send Event ([Event API's rules](https://howxm.com/help/articles/web-sdk-intro#2-event))

```tsx
import React from 'react'
import { eventHowxm } from 'react-use-howxm'

const myLogger = console.info

const MyCustomComponent = () => {
  const { eventHowxm } = useHowxm()
  const eventCode = '<event code>'
  const eventAttrs = {
    plan: 'free',
    age: 17,
  }

  const handleTriggerEvent = () => {
    eventHowxm(eventCode, eventAttrs, () => {
      myLogger('triggerEvent success')
    })
  }
}
```

- Set extra attributes to scalable (Not recommended.[setExtraAttributes API's rules](https://howxm.com/help/articles/web-sdk-intro#5-setextraattributes))

```tsx
import React from 'react'
import { setExtraAttributes } from 'react-use-howxm'

const myLogger = console.info

const MyCustomComponent = () => {
  const { setExtraAttributes } = useHowxm()
  const extraAttrs = {
    plan: 'basic',
    vip_level: '1',
  }

  const handleTriggerEvent = () => {
    setExtraAttributes(eventAttrs, myLogger)
  }
}
```

## License

MIT © [warmwind](https://github.com/warmwind)

---

This hook is created using [create-react-hook](https://github.com/hermanya/create-react-hook).

This hook is inspired by [react-use-hotjar](https://github.com/olavoparno/react-use-hotjar).

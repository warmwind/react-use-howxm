import { renderHook } from '@testing-library/react-hooks'
import useHowxm from '../index'
import { IWindowHowxmEmbedded } from '../types'

const fakeHowxmFunction = jest.fn(() => {
  return null
})

const mockAppId = 'abc-123-def'
const mockCustomer = {
  name: 'andy',
  address: 'streets of GaoXin 5rd',
}

describe('useHowxm hook', () => {
  beforeAll(() => {
    ;(window as unknown as IWindowHowxmEmbedded)._howxm = fakeHowxmFunction
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should return all methods', () => {
    const { result } = renderHook(() => useHowxm())
    expect(result.current).toBeTruthy()
    expect(result.current.initHowxm).toBeTruthy()
    expect(result.current.identifyHowxm).toBeTruthy()
    expect(result.current.readyState).toBeTruthy()
    expect(result.current.checkOpenHowxm).toBeTruthy()
    expect(result.current.openHowxm).toBeTruthy()
    expect(result.current.eventHowxm).toBeTruthy()
    expect(result.current.setExtraAttributes).toBeTruthy()
  })

  it('should initHowxm when howxm script not exited', () => {
    const { result } = renderHook(() => useHowxm())
    const initHowxmSpy = jest.spyOn(result.current, 'initHowxm')
    const { initHowxm } = result.current
    initHowxm(mockAppId)
    expect(initHowxmSpy).toHaveBeenCalledWith(mockAppId)
  })

  it('should updateHowxm when script exited and init with different appId', () => {
    const { result } = renderHook(() => useHowxm())
    const initHowxmSpy = jest.spyOn(result.current, 'initHowxm')
    const { initHowxm } = result.current
    initHowxm(mockAppId)
    expect(initHowxmSpy).toHaveBeenCalledWith(mockAppId)

    initHowxm('new-app-id')
    expect(initHowxmSpy).toHaveBeenCalledWith('new-app-id')
  })

  it('should initHowxm with logCallback', () => {
    const { result } = renderHook(() => useHowxm())
    const initHowxmSpy = jest.spyOn(result.current, 'initHowxm')
    const consoleInfoSpy = jest.spyOn(console, 'info')
    const { initHowxm } = result.current

    const logCallback = console.info

    initHowxm(mockAppId, logCallback)

    expect(initHowxmSpy).toHaveBeenCalledWith(mockAppId, logCallback)
    expect(consoleInfoSpy).toHaveBeenCalledWith('Howxm ready: true')
  })

  it('should identifyHowxm with pure object', () => {
    const { result } = renderHook(() => useHowxm())
    const identifyHowxmSpy = jest.spyOn(result.current, 'identifyHowxm')
    const { identifyHowxm } = result.current

    identifyHowxm(mockCustomer)
    expect(identifyHowxmSpy).toHaveBeenCalledWith(mockCustomer)
  })

  it('should identifyHowxm with broken logCallback', () => {
    console.error = jest.fn()
    const { result } = renderHook(() => useHowxm())
    const identifyHowxmSpy = jest.spyOn(result.current, 'identifyHowxm')
    const consoleErrorSpy = jest.spyOn(console, 'error')
    const { identifyHowxm } = result.current

    const brokenLogCallback = () => {
      throw Error('test')
    }

    identifyHowxm(mockCustomer, brokenLogCallback as (...data: unknown[]) => void)

    expect(identifyHowxmSpy).toHaveBeenCalledWith(mockCustomer, brokenLogCallback)
    expect(consoleErrorSpy).toHaveBeenCalledWith(`Howxm error: ${Error('test').message}`)
  })

  it('should identifyHowxm withCallback', () => {
    const { result } = renderHook(() => useHowxm())
    const identifyHowxmSpy = jest.spyOn(result.current, 'identifyHowxm')
    const consoleInfoSpy = jest.spyOn(console, 'info')
    const { identifyHowxm } = result.current

    const logCallback = console.info

    identifyHowxm(mockCustomer, logCallback)

    expect(identifyHowxmSpy).toHaveBeenCalledWith(mockCustomer, logCallback)
    expect(consoleInfoSpy).toHaveBeenCalledWith('Howxm identified')
  })

  it('should checkOpenHowxm ', () => {
    const { result } = renderHook(() => useHowxm())
    const checkOpenHowxmSpy = jest.spyOn(result.current, 'checkOpenHowxm')
    const { checkOpenHowxm } = result.current
    const campaignId = 'abc'
    const uid = '123'
    const onSuccess = jest.fn()
    const onFailed = jest.fn()
    checkOpenHowxm(campaignId, uid, onSuccess, onFailed)
    expect(checkOpenHowxmSpy).toHaveBeenCalledWith(campaignId, uid, onSuccess, onFailed)
  })

  it('should openHowxm with campaignId', () => {
    const { result } = renderHook(() => useHowxm())
    const openHowxmSpy = jest.spyOn(result.current, 'openHowxm')
    const { openHowxm } = result.current
    const campaignId = 'abc'
    openHowxm(campaignId)
    expect(openHowxmSpy).toHaveBeenLastCalledWith(campaignId)
  })

  it('should eventHowxm with eventCode', () => {
    const { result } = renderHook(() => useHowxm())
    const eventHowxmSpy = jest.spyOn(result.current, 'eventHowxm')
    const { eventHowxm } = result.current
    const eventCode = 'abc'
    eventHowxm(eventCode)
    expect(eventHowxmSpy).toHaveBeenLastCalledWith(eventCode)
  })

  it('should eventHowxm with logCallback', () => {
    const { result } = renderHook(() => useHowxm())
    const eventHowxmSpy = jest.spyOn(result.current, 'eventHowxm')
    const { eventHowxm } = result.current

    const logCallback = console.info

    const eventCode = 'abc'
    eventHowxm(eventCode, {}, logCallback)
    expect(eventHowxmSpy).toHaveBeenLastCalledWith(eventCode, {}, logCallback)
  })

  it('should setExtraAttributes to eventAttrs', () => {
    const { result } = renderHook(() => useHowxm())
    const setExtraAttributesSpy = jest.spyOn(result.current, 'setExtraAttributes')
    const { setExtraAttributes } = result.current
    const eventAttrs = {
      name: 'andy',
      address: 'streets of GaoXin 5rd',
    }
    setExtraAttributes(eventAttrs)
    expect(setExtraAttributesSpy).toHaveBeenLastCalledWith(eventAttrs)
  })

  it('should setExtraAttributes to eventAttrs with logCallback', () => {
    const { result } = renderHook(() => useHowxm())
    const setExtraAttributesSpy = jest.spyOn(result.current, 'setExtraAttributes')
    const { setExtraAttributes } = result.current

    const logCallback = console.info

    const eventAttrs = {
      name: 'andy',
      address: 'streets of GaoXin 5rd',
    }
    setExtraAttributes(eventAttrs, logCallback)
    expect(setExtraAttributesSpy).toHaveBeenLastCalledWith(eventAttrs, logCallback)
  })
})

describe('Tests Howxm without being loaded into window', () => {
  beforeAll(() => {
    // @ts-ignore
    ;(window as unknown as IWindowHowxmEmbedded)._howxm = undefined
    console.error = jest.fn()
  })

  it('should not init howxm and throw errors', () => {
    const { result } = renderHook(() => useHowxm())
    const { identifyHowxm } = result.current
    const consoleErrorSpy = jest.spyOn(console, 'error')

    identifyHowxm({ name: 'andy' })

    expect(consoleErrorSpy).toHaveBeenCalledWith(
      `Howxm error: ${Error('Howxm is not available! Is Howxm initialized?').message}`
    )
  })

  it('should identifyHowxm with pure object and throw errors', () => {
    const { result } = renderHook(() => useHowxm())
    const { identifyHowxm } = result.current
    const consoleErrorSpy = jest.spyOn(console, 'error')

    identifyHowxm(mockCustomer)

    expect(consoleErrorSpy).toHaveBeenCalledWith('Howxm error: Howxm is not available! Is Howxm initialized?')
  })

  it('should checkOpenHowxm throw errors', () => {
    const { result } = renderHook(() => useHowxm())
    const consoleErrorSpy = jest.spyOn(console, 'error')

    const { checkOpenHowxm } = result.current
    const campaignId = 'abc'
    const uid = '123'

    checkOpenHowxm(campaignId, uid)

    expect(consoleErrorSpy).toHaveBeenCalledWith('Howxm error: Howxm is not available! Is Howxm initialized?')
  })

  it('should openHowxm with campaign and throw errors', () => {
    const { result } = renderHook(() => useHowxm())
    const consoleErrorSpy = jest.spyOn(console, 'error')

    const { openHowxm } = result.current
    const campaignId = 'abc'

    openHowxm(campaignId)

    expect(consoleErrorSpy).toHaveBeenCalledWith('Howxm error: Howxm is not available! Is Howxm initialized?')
  })

  it('should eventHowxm with campaign and throw errors', () => {
    const { result } = renderHook(() => useHowxm())
    const consoleErrorSpy = jest.spyOn(console, 'error')

    const { eventHowxm } = result.current
    const campaignId = 'abc'

    eventHowxm(campaignId)

    expect(consoleErrorSpy).toHaveBeenCalledWith('Howxm error: Howxm is not available! Is Howxm initialized?')
  })

  it('should setExtraAttributes to eventAttrs', () => {
    const { result } = renderHook(() => useHowxm())
    const consoleErrorSpy = jest.spyOn(console, 'error')

    const { setExtraAttributes } = result.current

    setExtraAttributes(mockCustomer)

    expect(consoleErrorSpy).toHaveBeenCalledWith('Howxm error: Howxm is not available! Is Howxm initialized?')
  })
})

describe('Tests useHowxm init and its rejections', () => {
  beforeAll(() => {
    global.document.getElementById = () => {
      throw Error('Error')
    }
  })

  afterAll(() => {
    jest.clearAllMocks()
  })

  it('should fail on initializing Howxm', () => {
    const consoleSpy = jest.spyOn(console, 'error')

    const { result } = renderHook(() => useHowxm())
    const { initHowxm } = result.current

    const failedInitResult = initHowxm(mockAppId)

    expect(failedInitResult).toBeFalsy()
    expect(consoleSpy).toHaveBeenCalledWith('Howxm error: Howxm initialization failed!')
  })
})

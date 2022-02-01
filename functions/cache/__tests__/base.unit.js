/* eslint-env jest */
const { Driver } = require('../../__mocks__/cache')
const { Cache } = require('../base')

describe('Base cache', () => {
  let cache
  const key = 'key'
  const value = 'value'

  describe('without root path', () => {
    beforeEach(() => {
      cache = new Cache('', Driver)
    })

    it('#set', async () => {
      await cache.set(key, value)
      expect(cache.driver.MOCK[key].value).toBe(value)
    })

    it('#get', async () => {
      cache.driver.MOCK[key] = { value }
      expect(await cache.get(key, value)).toBe(value)
    })
  })

  describe('with simple root path', () => {
    const rootPath = 'root'
    const path = `${rootPath}/${key}`

    beforeEach(() => {
      cache = new Cache(rootPath, Driver)
    })

    it('#set', async () => {
      await cache.set(key, value)
      expect(cache.driver.MOCK[path].value).toBe(value)
    })

    it('#get', async () => {
      cache.driver.MOCK[path] = { value }
      expect(await cache.get(key, value)).toBe(value)
    })
  })

  describe('with complex root path', () => {
    const rootPath = 'root/level2'
    const path = `${rootPath}/${key}`

    beforeEach(() => {
      cache = new Cache(rootPath, Driver)
    })

    it('#set', async () => {
      await cache.set(key, value)
      expect(cache.driver.MOCK[path].value).toBe(value)
    })

    it('#get', async () => {
      cache.driver.MOCK[path] = { value }
      expect(await cache.get(key, value)).toBe(value)
    })
  })
})

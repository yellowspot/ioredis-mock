import Redis from 'ioredis'

describe('sunion', () => {
  it('should return the union between the first set and all the successive sets', () => {
    const redis = new Redis({
      data: {
        key1: new Set(['a', 'b', 'c', 'd']),
        key2: new Set(['c']),
        // key3: keys that do not exist are considered to be empty sets
        key4: new Set(['a', 'c', 'e']),
      },
    })

    return redis.sunion('key1', 'key2', 'key3', 'key4').then(result => {
      return expect(result).toEqual(['a', 'b', 'c', 'd', 'e'])
    })
  })

  it('should throw an exception if one of the keys is not a set', () => {
    const redis = new Redis({
      data: {
        foo: new Set(),
        bar: 'not a set',
      },
    })

    return redis.sunion('foo', 'bar').catch(err => {
      return expect(err.message).toBe('Key bar does not contain a set')
    })
  })
})
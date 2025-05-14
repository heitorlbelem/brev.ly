import { isLeft, isRight } from '@/shared/either'
import { makeShortenedUrl } from '@/test/factories/make-shortened-url'
import { describe, expect, it } from 'vitest'
import { getShortenedUrl } from './get-shortened-url'

describe('get shortened url', () => {
  it('should be able to get a shortened url', async () => {
    const shortenedUrl1 = await makeShortenedUrl()
    const sut = await getShortenedUrl({ shortenedUrl: shortenedUrl1.shortenedUrl })
    expect(isRight(sut)).toBe(true)
  })

  it('should not be able to get shortened url that does not exist', async () => {
    const shortenedUrl1 = await makeShortenedUrl()
    const sut = await getShortenedUrl({ shortenedUrl: shortenedUrl1.shortenedUrl.concat('invalid') })
    expect(isLeft(sut)).toBe(true)
  })
})
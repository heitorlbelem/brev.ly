import { makeShortenedUrl } from '@/test/factories/make-shortened-url'
import { beforeEach, describe, expect, it } from 'vitest'
import { getAllShortenedUrls } from './get-all-shortened-urls'
import { isRight, unwrapEither } from '@/shared/either'
import { db } from '@/infra/db'
import { schema } from '@/infra/db/schemas'

describe('get all shortened urls', () => {
  beforeEach(async () => {
    await db.delete(schema.shortenedUrls)
  })

  it('should be able to get the shortened urls', async () => {
    await makeShortenedUrl({ originalUrl: 'https://example.com/1'})
    const shortened2 = await makeShortenedUrl({ originalUrl: 'https://example.com/3' })
    await makeShortenedUrl({ originalUrl: 'https://example.com/2' })
    const shortened4 = await makeShortenedUrl({ originalUrl: 'https://example.com/4' })

    const sut = await getAllShortenedUrls({ pageSize: 2 })
    expect(isRight(sut)).toBeTruthy()
    expect(unwrapEither(sut).nextCursor).toEqual(shortened2.id)
    expect(unwrapEither(sut).urls).toHaveLength(2)

    const sut2 = await getAllShortenedUrls({ pageSize: 2, cursor: shortened2.id })
    expect(isRight(sut2)).toBeTruthy()
    expect(unwrapEither(sut2).nextCursor).toEqual(shortened4.id)
    expect(unwrapEither(sut2).urls).toHaveLength(2)
  })
})
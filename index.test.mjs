import { test } from 'node:test'
import assert from 'node:assert/strict'

import { Mimager } from './index.mjs'

test('fetch returns a unique id and marks it as used', () => {
	const mim = new Mimager()
	const id = mim.fetch()

	assert.equal(typeof id, 'string')
	assert.ok(id.length > 0)
	assert.equal(mim.checkId(id), true)
})

test('fetch skips ids that are already used', () => {
	const mim = new Mimager()
	const ids = new Set()

	for (let i = 0; i < 100; i += 1) {
		ids.add(mim.fetch())
	}

	assert.equal(ids.size, 100)
})

test('set registers an explicit id and rejects duplicates', () => {
	const mim = new Mimager()

	mim.set('existing-id')

	assert.equal(mim.checkId('existing-id'), true)
	assert.throws(
		() => mim.set('existing-id'),
		new Error('ID existing-id has already been used.')
	)
})

test('reset marks used ids as available again', () => {
	const mim = new Mimager()

	mim.set('existing-id')
	mim.reset()

	assert.equal(mim.checkId('existing-id'), false)
})

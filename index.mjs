import { nanoid } from 'nanoid'

export class Mimager {
	#ids = new Set()

	fetch() {
		let uuid = nanoid()
		while (this.#ids.has(uuid)) {
			uuid = nanoid()
		}

		this.#ids.add(uuid)

		return uuid
	}

	set(id) {
		if (this.#ids.has(id)) {
			throw new Error(`ID ${id} has already been used.`)
		}

		this.#ids.add(id)
	}

	checkId(id) {
		return this.#ids.has(id);
	}

	reset() {
		this.#ids.clear()
	}
}

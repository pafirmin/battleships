import { Ship } from '../Ship'

const ship = Ship(['A1', 'A2', 'A3'])

test('returns correct length', () => {
  expect(ship.size).toBe(3)
})

test('takes a hit', () => {
  ship.hit(1)
  expect(ship.coords).toEqual(['A1', 'x', 'A3'])
})

test('sinks', () => {
  ship.hit(0);
  ship.hit(1)
  ship.hit(2)
  expect(ship.isSunk()).toBe(true)
})
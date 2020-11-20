import GameBoard from "../GameBoard";

const board = GameBoard();

test("Adds a ship", () => {
  board.addShip(["A1", "A2", "A3"]);
  expect(board.ships.length).toBe(1);
});

test("ships get hit", () => {
  board.addShip(["A1", "A2", "A3"]);
  board.recieveHit("A1");
  expect(board.ships[0].coords).toEqual(["x", "A2", "A3"]);
});

test("misses ships", () => {
  board.addShip(["A1", "A2", "A3"]);

  expect(board.recieveHit("B1")).toBe(false);
});

test("sinks ships", () => {
  board.addShip(["A1", "A2", "A3"]);
  board.recieveHit("A1");
  board.recieveHit("A2");
  board.recieveHit("A3");

  expect(board.ships[0].isSunk()).toBe(true);
});

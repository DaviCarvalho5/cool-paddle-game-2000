import Brick from "./brick.js";

export function buildLevel (game, level) {
  let bricks = []

  level.forEach((row, rowIndex) => {
    row.forEach((brick, brickIndex) => {
      let space = brickIndex == 0 ? 0 : 8;

      if (brick === 1) {
        let position = {
          x: 20 + brickIndex * (120 + space),
          y: 120 + rowIndex * (30 + 8)
        }

        bricks.push(new Brick(game, position));
      }
    })
  })

  return bricks;
}

export const level1 = [
  [1, 1, 1, 1, 1, 1],
  [1, 1, 0, 0, 1, 1],
]

export const level2 = [
  [1, 1, 1, 1, 1, 1],
  [1, 1, 1, 1, 1, 1],
  [1, 0, 1, 1, 0, 1],
]

export const level3 = [
  [1, 1, 1, 1, 1, 1],
  [1, 0, 1, 1, 0, 1],
  [1, 0, 1, 1, 0, 1],
  [1, 1, 1, 1, 1, 1],
]
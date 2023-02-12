export default {
  game: {
    args: [64, 64] as [number, number],
    border: {
      tickness: 2,
      depth: 2,
      color: 0x000000,
    },
    grid: {
      gridSize: [9, 8] as [number, number],
      args: [64, 32] as [number, number],
    },
    fps: 60,
    paddle: {
      args: [100, 20] as [number, number],
      speed: 10,
    },
    ball: {
      radius: 10,
    },
    brick: {
      args: [6, 3] as [number, number],
    },
    lights: [
      {
        position: [10, 10, 10] as [number, number, number],
      },
      {
        position: [-10, 10, 10] as [number, number, number],
      },
    ],
  },
};

import { Color } from "three";

export default {
  game: {
    fps: 60,
    args: [64, 64] as [number, number],
    gravity: [0, -9.82] as [number, number],
    border: {
      tickness: 2,
      depth: 2,
      color: "#FFFFFF",
    },
    grid: {
      gridSize: [9, 8] as [number, number],
      args: [64, 32] as [number, number],
    },
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
    materials: {
      default: {
        id: 0,
        friction: 0,
        restitution: 1,
      },
      paddle: {
        id: 1,
        friction: 0,
        restitution: 1.3,
      },
      brick: {
        id: 2,
        friction: 0,
        restitution: 0.9,
      },
    },
  },
};

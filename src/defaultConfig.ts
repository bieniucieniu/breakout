const defaultConfig = {
  game: {
    lives: 3,
    tickRate: 60,
    args: [64, 64] as [number, number],
    gravity: [0, -9.82] as [number, number],
    camera: {
      position: {
        default: [0, 0, 80] as [number, number, number],
        "750": [0, 0, 100] as [number, number, number],
        "500": [0, 0, 140] as [number, number, number],
      },
      fov: 60,
    },
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
      args: [10, 1] as [number, number],
      defaultPosition: [0, -64 / 2] as [number, number],
      defaultaAngle: 0,
      speed: 60,
      angularSpeed: 2,
      maxAngle: Math.PI / 12,
      color: "#FF0000",
    },
    ball: {
      radius: 1,
      defaultPosition: [0, -1] as [number, number],
      defaultVelocity: [0, 0] as [number, number],
      color: "#FFFFFF",
    },
    brick: {
      args: [6, 3] as [number, number],
      colors: [
        "hsl(000, 100%, 50%)",
        "hsl(030, 100%, 50%)",
        "hsl(060, 100%, 50%)",
        "hsl(090, 100%, 50%)",
        "hsl(120, 100%, 50%)",
        "hsl(150, 100%, 50%)",
        "hsl(180, 100%, 50%)",
        "hsl(210, 100%, 50%)",
        "hsl(240, 100%, 50%)",
        "hsl(270, 100%, 50%)",
        "hsl(300, 100%, 50%)",
        "hsl(330, 100%, 50%)",
      ],
      maxPoints: 12,
    },
    lights: [
      {
        position: [10, 10, 10] as [number, number, number],
        intensity: 0.4,
      },
      {
        position: [-10, 10, 10] as [number, number, number],
        intensity: 0.4,
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
        restitution: 1,
      },
      brick: {
        id: 2,
        friction: 0,
        restitution: 1,
      },
      ball: {
        id: 3,
        friction: 0,
        restitution: 1,
      },
    },
  },
};

export default defaultConfig;

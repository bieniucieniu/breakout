const defaultConfig = {
  game: {
    lives: 3,
    tickRate: 30,
    args: [64, 64] as [number, number],
    gravity: [0, -9.82] as [number, number],
    camera: {
      position: [0, 0, 80] as [number, number, number],
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
      bounds: {
        x: [-32 + 10 / 2, 32 - 10 / 2] as [min: number, max: number],
        y: [-32 + 1 / 2, -10 - 1 / 2] as [min: number, max: number],
      },
      maxSpeed: {
        x: 30,
        y: 30,
      },

      acceleration: 50,
      maxSpeedG: {
        x: 5,
        y: 5,
      },
      angularSpeed: 2,
      maxAngle: Math.PI / 12,
      color: "#FF0000",
    },
    ball: {
      radius: 1,
      defaultPosition: [0, -10] as [number, number],
      defaultVelocity: [0, 0] as [number, number],
      color: "#FFFFFF",
      speed: 30,
      minAngle: Math.PI / 6,
    },
    brick: {
      args: [6.2, 3.1] as [number, number],
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
      bevel: {
        thickness: 0.5,
        size: 0.5,
      },
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
    timer: {
      classic: {
        start: 0,
        delta: 10,
      },
      time: {
        start: 300_000,
        end: 0,
        delta: -10,
      },
      gravity: {
        start: 0,
        delta: 10,
      },
    },
  },
};

export default defaultConfig;

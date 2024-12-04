const width = 20;
const height = 1;
const long = 12;

const longKey = long * 0.05;

// EL primer grupo de teclas va de -0.445 a 0.261, lon=0.706
// El segundo grupo de teclas va de 0.295 a 0.445, lon=0.15
// Espacio horizontal entre teclas = 0.010
// Teclas F1 width=0.034
// Teclas normales=0.040
const keys = [
  //* Primer fila
  {
    name: "Esc",
    position: [-width * 0.425, 0.4, -long * 0.3],
    size: [width * 0.04, 0.5, long * 0.03],
    symbol: "Esc",
  },
  {
    name: "F1",
    position: [-width * 0.378, 0.4, -long * 0.3],
    size: [width * 0.034, 0.5, long * 0.03],
    symbol: "F1",
  },
  {
    name: "F2",
    position: [-width * 0.334, 0.4, -long * 0.3],
    size: [width * 0.034, 0.5, long * 0.03],
    symbol: "F2",
  },
  {
    name: "F3",
    position: [-width * 0.29, 0.4, -long * 0.3],
    size: [width * 0.034, 0.5, long * 0.03],
    symbol: "F3",
  },
  {
    name: "F4",
    position: [-width * 0.246, 0.4, -long * 0.3],
    size: [width * 0.034, 0.5, long * 0.03],
    symbol: "F4",
  },
  {
    name: "F5",
    position: [-width * 0.202, 0.4, -long * 0.3],
    size: [width * 0.034, 0.5, long * 0.03],
    symbol: "F5",
  },
  {
    name: "F6",
    position: [-width * 0.158, 0.4, -long * 0.3],
    size: [width * 0.034, 0.5, long * 0.03],
    symbol: "F6",
  },
  {
    name: "F7",
    position: [-width * 0.114, 0.4, -long * 0.3],
    size: [width * 0.034, 0.5, long * 0.03],
    symbol: "F7",
  },
  {
    name: "F8",
    position: [-width * 0.07, 0.4, -long * 0.3],
    size: [width * 0.034, 0.5, long * 0.03],
    symbol: "F8",
  },
  {
    name: "F9",
    position: [-width * 0.026, 0.4, -long * 0.3],
    size: [width * 0.034, 0.5, long * 0.03],
    symbol: "F9",
  },
  {
    name: "F10",
    position: [width * 0.018, 0.4, -long * 0.3],
    size: [width * 0.034, 0.5, long * 0.03],
    symbol: "F10",
  },
  {
    name: "F11",
    position: [width * 0.062, 0.4, -long * 0.3],
    size: [width * 0.034, 0.5, long * 0.03],
    symbol: "F11",
  },
  {
    name: "F12",
    position: [width * 0.106, 0.4, -long * 0.3],
    size: [width * 0.034, 0.5, long * 0.03],
    symbol: "F12",
  },
  {
    name: "Ins",
    position: [width * 0.15, 0.4, -long * 0.3],
    size: [width * 0.034, 0.5, long * 0.03],
    symbol: "★",
  },
  {
    name: "Print",
    position: [width * 0.194, 0.4, -long * 0.3],
    size: [width * 0.034, 0.5, long * 0.03],
    symbol: "✂️",
  },
  {
    name: "Supr1",
    position: [width * 0.241, 0.4, -long * 0.3],
    size: [width * 0.04, 0.5, long * 0.03],
    symbol: "Supr",
  },
  {
    name: "Play",
    position: [width * 0.296, 0.4, -long * 0.3],
    size: [width * 0.034, 0.5, long * 0.03],
    symbol: "▶",
  },
  {
    name: "Stop",
    position: [width * 0.34, 0.4, -long * 0.3],
    size: [width * 0.034, 0.5, long * 0.03],
    symbol: "⬜",
  },
  {
    name: "Backw",
    position: [width * 0.384, 0.4, -long * 0.3],
    size: [width * 0.034, 0.5, long * 0.03],
    symbol: "↻◁|",
  },
  {
    name: "Forw",
    position: [width * 0.428, 0.4, -long * 0.3],
    size: [width * 0.034, 0.5, long * 0.03],
    symbol: "|▷↺",
  },

  //* Segunda fila
  {
    name: "|",
    position: [-width * 0.428, 0.4, -long * 0.2],
    size: [width * 0.034, 0.5, long * 0.06],
    symbol: "° |",
  },
  {
    name: "1",
    position: [-width * 0.381, 0.4, -long * 0.2],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "1",
  },
  {
    name: "2",
    position: [-width * 0.331, 0.4, -long * 0.2],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "2",
  },
  {
    name: "3",
    position: [-width * 0.281, 0.4, -long * 0.2],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "3",
  },
  {
    name: "4",
    position: [-width * 0.231, 0.4, -long * 0.2],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "4",
  },
  {
    name: "5",
    position: [-width * 0.181, 0.4, -long * 0.2],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "5",
  },
  {
    name: "6",
    position: [-width * 0.131, 0.4, -long * 0.2],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "6",
  },
  {
    name: "7",
    position: [-width * 0.081, 0.4, -long * 0.2],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "7",
  },
  {
    name: "8",
    position: [-width * 0.031, 0.4, -long * 0.2],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "8",
  },
  {
    name: "9",
    position: [width * 0.019, 0.4, -long * 0.2],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "9",
  },
  {
    name: "0",
    position: [width * 0.069, 0.4, -long * 0.2],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "0",
  },
  {
    name: "?",
    position: [width * 0.119, 0.4, -long * 0.2],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "?'",
  },
  {
    name: "¿",
    position: [width * 0.169, 0.4, -long * 0.2],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "¿¡",
  },
  {
    name: "Del",
    position: [width * 0.23, 0.4, -long * 0.2],
    size: [width * 0.062, 0.5, long * 0.06],
    symbol: "⌫",
  },

  {
    name: "Num\nLock",
    position: [width * 0.296, 0.4, -long * 0.2],
    size: [width * 0.034, 0.5, long * 0.06],
    symbol: "",
  },
  {
    name: "Div",
    position: [width * 0.34, 0.4, -long * 0.2],
    size: [width * 0.034, 0.5, long * 0.06],
    symbol: "÷",
  },
  {
    name: "Multiply",
    position: [width * 0.384, 0.4, -long * 0.2],
    size: [width * 0.034, 0.5, long * 0.06],
    symbol: "✖",
  },
  {
    name: "Substract",
    position: [width * 0.428, 0.4, -long * 0.2],
    size: [width * 0.034, 0.5, long * 0.06],
    symbol: "-",
  },

  //* Tercera fila
  {
    name: "Tab",
    position: [-width * 0.42, 0.4, -long * 0.12],
    size: [width * 0.048, 0.5, long * 0.06],
    symbol: "╰⪼",
  },
  {
    name: "Q",
    position: [-width * 0.364, 0.4, -long * 0.12],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "Q",
  },
  {
    name: "W",
    position: [-width * 0.314, 0.4, -long * 0.12],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "W",
  },
  {
    name: "E",
    position: [-width * 0.264, 0.4, -long * 0.12],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "E",
  },
  {
    name: "R",
    position: [-width * 0.214, 0.4, -long * 0.12],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "R",
  },
  {
    name: "T",
    position: [-width * 0.164, 0.4, -long * 0.12],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "T",
  },
  {
    name: "Y",
    position: [-width * 0.114, 0.4, -long * 0.12],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "Y",
  },
  {
    name: "U",
    position: [-width * 0.064, 0.4, -long * 0.12],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "U",
  },
  {
    name: "I",
    position: [-width * 0.014, 0.4, -long * 0.12],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "I",
  },
  {
    name: "O",
    position: [width * 0.034, 0.4, -long * 0.12],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "O",
  },
  {
    name: "P",
    position: [width * 0.084, 0.4, -long * 0.12],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "P",
  },
  {
    name: "Comillas",
    position: [width * 0.134, 0.4, -long * 0.12],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "¨´",
  },
  {
    name: "*",
    position: [width * 0.184, 0.4, -long * 0.12],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "*\n+",
  },
  {
    name: "Enter1",
    position: [width * 0.237, 0.4, -long * 0.11],
    size: [width * 0.048, 0.5, long * 0.08],
    symbol: "⤶",
  },

  {
    name: "Num7",
    position: [width * 0.296, 0.4, -long * 0.12],
    size: [width * 0.034, 0.5, long * 0.06],
    symbol: "7",
  },
  {
    name: "Num8",
    position: [width * 0.34, 0.4, -long * 0.12],
    size: [width * 0.034, 0.5, long * 0.06],
    symbol: "8",
  },
  {
    name: "Num9",
    position: [width * 0.384, 0.4, -long * 0.12],
    size: [width * 0.034, 0.5, long * 0.06],
    symbol: "9",
  },
  {
    name: "Plus1",
    position: [width * 0.428, 0.4, -long * 0.11],
    size: [width * 0.034, 0.5, long * 0.08],
    symbol: "\n✙",
  },

  //* Cuarta fila
  {
    name: "Mayus",
    position: [-width * 0.414, 0.4, -long * 0.04],
    size: [width * 0.06, 0.5, long * 0.06],
    symbol: "Mayus",
  },
  {
    name: "A",
    position: [-width * 0.354, 0.4, -long * 0.04],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "A",
  },
  {
    name: "S",
    position: [-width * 0.304, 0.4, -long * 0.04],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "S",
  },
  {
    name: "D",
    position: [-width * 0.254, 0.4, -long * 0.04],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "D",
  },
  {
    name: "F",
    position: [-width * 0.204, 0.4, -long * 0.04],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "F",
  },
  {
    name: "G",
    position: [-width * 0.154, 0.4, -long * 0.04],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "G",
  },
  {
    name: "H",
    position: [-width * 0.104, 0.4, -long * 0.04],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "H",
  },
  {
    name: "J",
    position: [-width * 0.054, 0.4, -long * 0.04],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "J",
  },
  {
    name: "K",
    position: [-width * 0.004, 0.4, -long * 0.04],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "K",
  },
  {
    name: "L",
    position: [width * 0.046, 0.4, -long * 0.04],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "L",
  },
  {
    name: "Ñ",
    position: [width * 0.096, 0.4, -long * 0.04],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "Ñ",
  },
  {
    name: "{",
    position: [width * 0.146, 0.4, -long * 0.04],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "[\n{",
  },
  {
    name: "}",
    position: [width * 0.196, 0.4, -long * 0.04],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "]\n}",
  },
  {
    name: "Enter2",
    position: [width * 0.246, 0.4, -long * 0.04],
    size: [width * 0.03, 0.5, long * 0.06],
    symbol: "",
  },

  {
    name: "Num4",
    position: [width * 0.296, 0.4, -long * 0.04],
    size: [width * 0.034, 0.5, long * 0.06],
    symbol: "4",
  },
  {
    name: "Num5",
    position: [width * 0.34, 0.4, -long * 0.04],
    size: [width * 0.034, 0.5, long * 0.06],
    symbol: "5",
  },
  {
    name: "Num6",
    position: [width * 0.384, 0.4, -long * 0.04],
    size: [width * 0.034, 0.5, long * 0.06],
    symbol: "6",
  },
  {
    name: "Plus2",
    position: [width * 0.428, 0.4, -long * 0.04],
    size: [width * 0.034, 0.5, long * 0.06],
    symbol: "",
  },

  //* Quinta fila
  {
    name: "Shift",
    position: [-width * 0.419, 0.4, long * 0.04],
    size: [width * 0.05, 0.5, long * 0.06],
    symbol: "⬆",
  },
  {
    name: "<",
    position: [-width * 0.369, 0.4, long * 0.04],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: ">\n<",
  },
  {
    name: "Z",
    position: [-width * 0.319, 0.4, long * 0.04],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "Z",
  },
  {
    name: "X",
    position: [-width * 0.269, 0.4, long * 0.04],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "X",
  },
  {
    name: "C",
    position: [-width * 0.219, 0.4, long * 0.04],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "C",
  },
  {
    name: "V",
    position: [-width * 0.169, 0.4, long * 0.04],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "V",
  },
  {
    name: "B",
    position: [-width * 0.119, 0.4, long * 0.04],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "B",
  },
  {
    name: "N",
    position: [-width * 0.069, 0.4, long * 0.04],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "N",
  },
  {
    name: "M",
    position: [-width * 0.019, 0.4, long * 0.04],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "M",
  },
  {
    name: ",",
    position: [width * 0.031, 0.4, long * 0.04],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: ";,",
  },
  {
    name: ".",
    position: [width * 0.081, 0.4, long * 0.04],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: ":.",
  },
  {
    name: "-",
    position: [width * 0.131, 0.4, long * 0.04],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "-_",
  },
  {
    name: "Shift2",
    position: [width * 0.211, 0.4, long * 0.04],
    size: [width * 0.1, 0.5, long * 0.06],
    symbol: "⬆",
  },

  {
    name: "Num1",
    position: [width * 0.296, 0.4, long * 0.04],
    size: [width * 0.034, 0.5, long * 0.06],
    symbol: "1",
  },
  {
    name: "Num2",
    position: [width * 0.34, 0.4, long * 0.04],
    size: [width * 0.034, 0.5, long * 0.06],
    symbol: "2",
  },
  {
    name: "Num3",
    position: [width * 0.384, 0.4, long * 0.04],
    size: [width * 0.034, 0.5, long * 0.06],
    symbol: "3",
  },
  {
    name: "Intro1",
    position: [width * 0.428, 0.4, long * 0.04],
    size: [width * 0.034, 0.5, long * 0.06],
    symbol: "",
  },

  //* Sexta fila
  {
    name: "Ctrl",
    position: [-width * 0.422, 0.4, long * 0.12],
    size: [width * 0.046, 0.5, long * 0.06],
    symbol: "Ctrl",
  },
  {
    name: "Fn",
    position: [-width * 0.369, 0.4, long * 0.12],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "Fn",
  },
  {
    name: "CMD",
    position: [-width * 0.319, 0.4, long * 0.12],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "💻",
  },
  {
    name: "Alt",
    position: [-width * 0.269, 0.4, long * 0.12],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "Alt",
  },
  {
    name: "Space",
    position: [-width * 0.119, 0.4, long * 0.12],
    size: [width * 0.24, 0.5, long * 0.06],
    symbol: "|────|",
  },
  {
    name: "AltGr",
    position: [width * 0.031, 0.4, long * 0.12],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "AltGr",
  },
  {
    name: "Ctrl2",
    position: [width * 0.081, 0.4, long * 0.12],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "Ctrl",
  },
  {
    name: "Left",
    position: [width * 0.131, 0.4, long * 0.12],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "⬅",
  },
  {
    name: "Up",
    position: [width * 0.186, 0.4, long * 0.104],
    size: [width * 0.05, 0.5, long * 0.02],
    symbol: "⬆",
  },
  {
    name: "Down",
    position: [width * 0.186, 0.4, long * 0.136],
    size: [width * 0.05, 0.5, long * 0.02],
    symbol: "⬇",
  },
  {
    name: "Right",
    position: [width * 0.241, 0.4, long * 0.12],
    size: [width * 0.04, 0.5, long * 0.06],
    symbol: "➡",
  },

  {
    name: "Num0",
    position: [width * 0.318, 0.4, long * 0.12],
    size: [width * 0.078, 0.5, long * 0.06],
    symbol: "0",
  },
  {
    name: "Supr2",
    position: [width * 0.384, 0.4, long * 0.12],
    size: [width * 0.034, 0.5, long * 0.06],
    symbol: "Supr",
  },
  {
    name: "Intro2",
    position: [width * 0.428, 0.4, long * 0.11],
    size: [width * 0.034, 0.5, long * 0.08],
    symbol: "Enter",
  },
];

export { width, height, long, keys };

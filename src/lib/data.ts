// Mock data & localStorage helpers for Linux Learning App
export type Difficulty = "Básico" | "Intermedio" | "Avanzado";

export interface Lesson {
  id: number;
  titulo: string;
  descripcion: string;
  dificultad: Difficulty;
  completada: boolean;
  progreso: number; // 0-100
  bloqueada?: boolean;
  contenido: string;
  ejemplo: string;
  conceptos: string[];
  ejercicioId?: number;
}

export interface Exercise {
  id: number;
  titulo: string;
  enunciado: string;
  descripcion: string;
  dificultad: Difficulty;
  respuestaCorrecta: string;
  intentos: number;
  completado: boolean;
  mejorPuntaje: number;
  puntos: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  progress: number;
  badges: string[];
  racha: number;
  activity: number[]; // last 7 days counts
}

const DEFAULT_USER: User = {
  id: 1,
  name: "Juan Pérez",
  email: "usuario@test.com",
  password: "password123",
  progress: 30,
  badges: ["Linux Rookie", "Command Master"],
  racha: 5,
  activity: [2, 4, 1, 3, 5, 2, 6],
};

const DEFAULT_LESSONS: Lesson[] = [
  {
    id: 1,
    titulo: "Introducción a Linux",
    descripcion: "Qué es Linux, historia y distribuciones populares.",
    dificultad: "Básico",
    completada: true,
    progreso: 100,
    contenido:
      "Linux es un sistema operativo de código abierto basado en Unix. Fue creado por Linus Torvalds en 1991 y hoy potencia desde servidores hasta dispositivos móviles.",
    ejemplo: "uname -a   # Muestra información del sistema",
    conceptos: ["Kernel", "Distribuciones", "Open Source", "Shell"],
    ejercicioId: 1,
  },
  {
    id: 2,
    titulo: "El sistema de archivos",
    descripcion: "Estructura jerárquica de directorios en Linux.",
    dificultad: "Básico",
    completada: true,
    progreso: 100,
    contenido:
      "Linux organiza los archivos en un árbol jerárquico que comienza en la raíz '/'. Directorios importantes: /home, /etc, /var, /usr, /bin.",
    ejemplo: "ls /\npwd\ncd /home",
    conceptos: ["Raíz /", "/home", "/etc", "Rutas absolutas y relativas"],
    ejercicioId: 2,
  },
  {
    id: 3,
    titulo: "Comandos básicos",
    descripcion: "ls, cd, pwd, mkdir, touch y más.",
    dificultad: "Básico",
    completada: true,
    progreso: 100,
    contenido:
      "Los comandos básicos te permiten navegar y manipular el sistema de archivos desde la terminal.",
    ejemplo: "ls -la\nmkdir proyecto\ntouch notas.txt",
    conceptos: ["ls", "cd", "pwd", "mkdir", "touch"],
    ejercicioId: 3,
  },
  {
    id: 4,
    titulo: "Permisos de archivos",
    descripcion: "Entiende rwx, chmod y propietarios.",
    dificultad: "Intermedio",
    completada: true,
    progreso: 100,
    contenido:
      "Cada archivo tiene permisos de lectura (r), escritura (w) y ejecución (x) para usuario, grupo y otros.",
    ejemplo: "chmod 755 script.sh\nchown user:group file",
    conceptos: ["rwx", "chmod", "chown", "Octal"],
    ejercicioId: 4,
  },
  {
    id: 5,
    titulo: "Edición con nano y vim",
    descripcion: "Editores de texto en la terminal.",
    dificultad: "Intermedio",
    completada: false,
    progreso: 40,
    contenido:
      "nano es un editor sencillo. vim es potente pero con curva de aprendizaje: modos normal, insertar y comando.",
    ejemplo: "nano archivo.txt\nvim notas.md",
    conceptos: ["Modos vim", "Guardar", "Salir", "Buscar"],
    ejercicioId: 5,
  },
  {
    id: 6,
    titulo: "Pipes y redirección",
    descripcion: "Combina comandos con |, >, >>, <.",
    dificultad: "Intermedio",
    completada: false,
    progreso: 0,
    contenido:
      "Los pipes pasan la salida de un comando como entrada del siguiente. La redirección guarda salida en archivos.",
    ejemplo: "ls -la | grep .txt\necho 'hola' > saludo.txt",
    conceptos: ["|", ">", ">>", "stdin/stdout"],
    ejercicioId: 6,
  },
  {
    id: 7,
    titulo: "Procesos y señales",
    descripcion: "ps, top, kill y gestión de procesos.",
    dificultad: "Intermedio",
    completada: false,
    progreso: 0,
    contenido:
      "Cada programa en ejecución es un proceso identificado por PID. Puedes monitorearlos y enviarles señales.",
    ejemplo: "ps aux\ntop\nkill -9 1234",
    conceptos: ["PID", "ps", "top", "kill"],
    ejercicioId: 7,
  },
  {
    id: 8,
    titulo: "Scripting Bash",
    descripcion: "Variables, condicionales y bucles en bash.",
    dificultad: "Avanzado",
    completada: false,
    progreso: 0,
    contenido:
      "Bash scripting permite automatizar tareas. Usa #!/bin/bash al inicio y haz el script ejecutable con chmod +x.",
    ejemplo: "#!/bin/bash\nfor i in 1 2 3; do\n  echo $i\ndone",
    conceptos: ["Shebang", "Variables", "if/else", "for/while"],
    ejercicioId: 8,
  },
  {
    id: 9,
    titulo: "Networking en Linux",
    descripcion: "ping, curl, ifconfig y SSH.",
    dificultad: "Avanzado",
    completada: false,
    progreso: 0,
    bloqueada: true,
    contenido:
      "Linux ofrece herramientas potentes para diagnóstico y administración de red.",
    ejemplo: "ping google.com\ncurl https://api.com\nssh user@host",
    conceptos: ["ping", "curl", "ssh", "IP"],
    ejercicioId: 9,
  },
  {
    id: 10,
    titulo: "Administración del sistema",
    descripcion: "systemctl, journalctl y cron.",
    dificultad: "Avanzado",
    completada: false,
    progreso: 0,
    bloqueada: true,
    contenido:
      "Gestiona servicios, logs y tareas programadas como un sysadmin experto.",
    ejemplo: "systemctl status nginx\ncrontab -e",
    conceptos: ["systemd", "Servicios", "Logs", "cron"],
    ejercicioId: 10,
  },
];

const DEFAULT_EXERCISES: Exercise[] = [
  {
    id: 1,
    titulo: "Información del sistema",
    enunciado: "Muestra información completa del kernel y arquitectura.",
    descripcion: "Usa el comando adecuado para ver datos del sistema.",
    dificultad: "Básico",
    respuestaCorrecta: "uname -a",
    intentos: 0,
    completado: true,
    mejorPuntaje: 100,
    puntos: 10,
  },
  {
    id: 2,
    titulo: "Listar archivos ocultos",
    enunciado: "Lista todos los archivos del directorio actual, incluidos los ocultos, en formato detallado.",
    descripcion: "Pista: combina las flags adecuadas.",
    dificultad: "Básico",
    respuestaCorrecta: "ls -la",
    intentos: 0,
    completado: true,
    mejorPuntaje: 90,
    puntos: 10,
  },
  {
    id: 3,
    titulo: "Directorio actual",
    enunciado: "Imprime la ruta absoluta del directorio donde te encuentras.",
    descripcion: "Comando de una sola palabra.",
    dificultad: "Básico",
    respuestaCorrecta: "pwd",
    intentos: 0,
    completado: false,
    mejorPuntaje: 0,
    puntos: 10,
  },
  {
    id: 4,
    titulo: "Crear directorio",
    enunciado: "Crea un directorio llamado 'proyecto'.",
    descripcion: "",
    dificultad: "Básico",
    respuestaCorrecta: "mkdir proyecto",
    intentos: 0,
    completado: false,
    mejorPuntaje: 0,
    puntos: 10,
  },
  {
    id: 5,
    titulo: "Crear archivo vacío",
    enunciado: "Crea un archivo llamado 'notas.txt'.",
    descripcion: "",
    dificultad: "Básico",
    respuestaCorrecta: "touch notas.txt",
    intentos: 0,
    completado: false,
    mejorPuntaje: 0,
    puntos: 10,
  },
  {
    id: 6,
    titulo: "Permisos ejecutables",
    enunciado: "Otorga permisos 755 al archivo 'script.sh'.",
    descripcion: "Usa notación octal.",
    dificultad: "Intermedio",
    respuestaCorrecta: "chmod 755 script.sh",
    intentos: 0,
    completado: false,
    mejorPuntaje: 0,
    puntos: 20,
  },
  {
    id: 7,
    titulo: "Buscar en salida",
    enunciado: "Lista archivos y filtra los que contengan '.txt' usando pipe.",
    descripcion: "Combina ls con grep.",
    dificultad: "Intermedio",
    respuestaCorrecta: "ls | grep .txt",
    intentos: 0,
    completado: false,
    mejorPuntaje: 0,
    puntos: 20,
  },
  {
    id: 8,
    titulo: "Procesos activos",
    enunciado: "Lista todos los procesos del sistema con detalles.",
    descripcion: "Pista: ps con flags.",
    dificultad: "Intermedio",
    respuestaCorrecta: "ps aux",
    intentos: 0,
    completado: false,
    mejorPuntaje: 0,
    puntos: 20,
  },
  {
    id: 9,
    titulo: "Probar conectividad",
    enunciado: "Envía 4 paquetes ping a google.com.",
    descripcion: "",
    dificultad: "Avanzado",
    respuestaCorrecta: "ping -c 4 google.com",
    intentos: 0,
    completado: false,
    mejorPuntaje: 0,
    puntos: 30,
  },
  {
    id: 10,
    titulo: "Estado de servicio",
    enunciado: "Consulta el estado del servicio nginx con systemctl.",
    descripcion: "",
    dificultad: "Avanzado",
    respuestaCorrecta: "systemctl status nginx",
    intentos: 0,
    completado: false,
    mejorPuntaje: 0,
    puntos: 30,
  },
];

const KEY = "linux-learning-app";

interface Store {
  user: User;
  authed: boolean;
  lessons: Lesson[];
  exercises: Exercise[];
}

function defaults(): Store {
  return {
    user: DEFAULT_USER,
    authed: false,
    lessons: DEFAULT_LESSONS,
    exercises: DEFAULT_EXERCISES,
  };
}

export function getStore(): Store {
  if (typeof window === "undefined") return defaults();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) {
      const d = defaults();
      localStorage.setItem(KEY, JSON.stringify(d));
      return d;
    }
    return JSON.parse(raw);
  } catch {
    return defaults();
  }
}

export function setStore(s: Store) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(s));
  window.dispatchEvent(new Event("lla:update"));
}

export function login(email: string, password: string): boolean {
  const s = getStore();
  if (email.trim().toLowerCase() === s.user.email && password === s.user.password) {
    s.authed = true;
    setStore(s);
    return true;
  }
  return false;
}

export function logout() {
  const s = getStore();
  s.authed = false;
  setStore(s);
}

export function updateLessonProgress(id: number, progreso: number) {
  const s = getStore();
  const l = s.lessons.find((x) => x.id === id);
  if (l && !l.bloqueada) {
    l.progreso = Math.max(l.progreso, progreso);
    if (l.progreso >= 100) l.completada = true;
    setStore(s);
  }
}

export function attemptExercise(id: number, answer: string): { correct: boolean; reveal: boolean; intentos: number } {
  const s = getStore();
  const e = s.exercises.find((x) => x.id === id);
  if (!e) return { correct: false, reveal: false, intentos: 0 };
  const correct = answer.trim().toLowerCase() === e.respuestaCorrecta.toLowerCase();
  e.intentos += 1;
  if (correct) {
    e.completado = true;
    e.mejorPuntaje = Math.max(e.mejorPuntaje, Math.max(100 - (e.intentos - 1) * 20, 20));
  }
  setStore(s);
  return { correct, reveal: !correct && e.intentos >= 3, intentos: e.intentos };
}

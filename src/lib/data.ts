import { DEFAULT_USER, DEFAULT_LESSONS, DEFAULT_EXERCISES } from "@/mock";

export type Difficulty = "Básico" | "Intermedio" | "Avanzado";

export interface Lesson {
  id: number;
  titulo: string;
  descripcion: string;
  dificultad: Difficulty;
  completada: boolean;
  progreso: number;
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
  activity: number[];
}

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

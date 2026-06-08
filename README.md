# Linux Learning

App educativa para aprender Linux desde el móvil. Incluye lecciones progresivas, ejercicios prácticos con verificación de comandos, una terminal simulada y seguimiento de progreso con insignias.

## Stack

- **Ionic 8** + **React 19** + **TypeScript**
- **Vite** como bundler
- **Tailwind CSS v4** para estilos utilitarios
- **Capacitor 8** para compilar a nativo
- **React Router 5** con navegación por tabs

## Compilar

### Web

```bash
npm install
npm run dev          # desarrollo en http://localhost:5173
npm run build        # producción en dist/
npm run preview      # vista previa del build
```

### Android (APK)

```bash
npm run build
npx cap copy android
npx cap open android   # abre Android Studio → Run ▶
```

Requisitos: Node.js 18+, npm, Android Studio con SDK 34+.

### iOS (IPA)

```bash
npm run build
npx cap sync ios
npx cap open ios    # abre Xcode → Run ▶
```

Requisitos: macOS con Xcode 15+.

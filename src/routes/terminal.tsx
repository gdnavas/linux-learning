import { useHistory } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from "@ionic/react";
import { getStore } from "@/lib/data";

interface Line { prompt?: boolean; text: string }

const initialFiles = ["Documentos", "Descargas", "proyecto", "notas.txt", ".bashrc"];

function TerminalPage() {
  const routerHistory = useHistory();

  useEffect(() => {
    if (!getStore().authed) routerHistory.replace("/login");
  }, []);

  const { user } = getStore();
  const [cwd, setCwd] = useState("~");
  const [files, setFiles] = useState<string[]>(initialFiles);
  const [history, setHistory] = useState<Line[]>([
    { text: "Bienvenido a Linux Learning Terminal. Escribe 'help' para ver comandos." },
  ]);
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight });
  }, [history]);

  const exec = (raw: string) => {
    const cmd = raw.trim();
    const out: Line[] = [{ prompt: true, text: raw }];
    if (!cmd) { setHistory((h) => [...h, ...out]); return; }
    const [c, ...args] = cmd.split(/\s+/);
    switch (c) {
      case "help":
        out.push({ text: "Comandos: ls, ls -la, cd, pwd, cat, echo, whoami, date, mkdir, touch, rm, clear" });
        break;
      case "ls":
        if (args[0] === "-la" || args[0] === "-l" || args[0] === "-a") {
          out.push({ text: "total " + files.length });
          out.push({ text: "drwxr-xr-x  4 user user  4096 may 26 10:00 ." });
          out.push({ text: "drwxr-xr-x  3 root root  4096 may 25 09:00 .." });
          files.forEach((f) => out.push({ text: `-rw-r--r--  1 user user   128 may 26 10:00 ${f}` }));
        } else {
          out.push({ text: files.filter((f) => !f.startsWith(".")).join("  ") });
        }
        break;
      case "pwd":
        out.push({ text: cwd === "~" ? `/home/${user.name.split(" ")[0].toLowerCase()}` : cwd });
        break;
      case "cd":
        setCwd(args[0] ? (args[0] === ".." ? "~" : args[0]) : "~");
        break;
      case "cat":
        out.push({ text: args[0] ? `Contenido simulado de ${args[0]}` : "cat: falta operando" });
        break;
      case "echo":
        out.push({ text: args.join(" ") });
        break;
      case "whoami":
        out.push({ text: user.name.split(" ")[0].toLowerCase() });
        break;
      case "date":
        out.push({ text: new Date().toString() });
        break;
      case "mkdir":
        if (args[0]) { setFiles((f) => [...f, args[0]]); }
        else out.push({ text: "mkdir: falta operando" });
        break;
      case "touch":
        if (args[0]) { setFiles((f) => [...f, args[0]]); }
        else out.push({ text: "touch: falta operando" });
        break;
      case "rm":
        if (args[0]) setFiles((f) => f.filter((x) => x !== args[0]));
        else out.push({ text: "rm: falta operando" });
        break;
      case "clear":
        setHistory([]);
        return;
      default:
        out.push({ text: `${c}: orden no encontrada` });
    }
    setHistory((h) => [...h, ...out]);
  };

  const prompt = `${user.name.split(" ")[0].toLowerCase()}@linux:${cwd}$`;

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Terminal</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div className="terminal-box">
          <div className="terminal-header">
            <span className="terminal-dot red" />
            <span className="terminal-dot yellow" />
            <span className="terminal-dot green" />
            <span className="terminal-title">linux-learning — bash</span>
          </div>
          <div ref={scrollRef} className="terminal-screen">
            {history.map((l, i) => (
              <div key={i} className="whitespace-pre-wrap">
                {l.prompt ? <><span style={{ color: "var(--ion-color-primary)" }}>{prompt}</span> {l.text}</> : l.text}
              </div>
            ))}
            <form
              onSubmit={(e) => { e.preventDefault(); exec(input); setInput(""); }}
              style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "4px" }}
            >
              <span style={{ color: "var(--ion-color-primary)", flexShrink: 0 }}>{prompt}</span>
              <input
                aria-label="Comando"
                autoFocus value={input}
                onChange={(e) => setInput(e.target.value)}
                style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "var(--terminal-fg)", caretColor: "var(--terminal-fg)", fontFamily: "inherit", fontSize: "inherit" }}
              />
            </form>
          </div>
        </div>
        <p style={{ fontSize: "0.75rem", color: "var(--ion-color-medium)", marginTop: "12px" }}>
          Comandos soportados: ls, ls -la, cd, pwd, cat, echo, whoami, date, mkdir, touch, rm, clear
        </p>
      </IonContent>
    </IonPage>
  );
}

export default TerminalPage;

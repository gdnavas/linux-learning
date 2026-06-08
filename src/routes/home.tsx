import { useHistory } from "react-router-dom";
import { useEffect, useSyncExternalStore } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon, IonCard, IonCardContent } from "@ionic/react";
import { terminalOutline, logOutOutline, bookOutline, barbellOutline, flameOutline } from "ionicons/icons";
import { CircularProgress, ProgressBar } from "@/components/ProgressBar";
import { AwardBadge } from "@/components/AwardBadge";
import { getStore, logout } from "@/lib/data";

function subscribe(cb: () => void) {
  window.addEventListener("lla:update", cb);
  return () => window.removeEventListener("lla:update", cb);
}

function HomePage() {
  const history = useHistory();

  useEffect(() => {
    if (!getStore().authed) history.replace("/login");
  }, []);

  const store = useSyncExternalStore(subscribe, () => JSON.stringify(getStore()));
  const { user, lessons, exercises } = JSON.parse(store);

  const lessonsDone = lessons.filter((l: any) => l.completada).length;
  const lessonsPct = Math.round((lessonsDone / lessons.length) * 100);
  const exDone = exercises.filter((e: any) => e.completado).length;
  const exPct = Math.round((exDone / exercises.length) * 100);
  const overall = Math.round((lessonsPct + exPct) / 2);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            <IonIcon icon={terminalOutline} style={{ fontSize: "24px", marginLeft: "12px", color: "var(--ion-color-primary)" }} />
          </IonButtons>
          <IonTitle>Linux Learning</IonTitle>
          <IonButtons slot="end">
            <IonButton onClick={() => { logout(); history.replace("/login"); }}>
              <IonIcon icon={logOutOutline} slot="icon-only" />
            </IonButton>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <h2 style={{ marginTop: 0, fontSize: "1.5rem", fontWeight: 700 }}>¡Bienvenido, {user.name.split(" ")[0]}!</h2>
        <p style={{ color: "var(--ion-color-medium)", marginBottom: "20px" }}>Continúa donde lo dejaste.</p>

        <IonCard button onClick={() => history.push("/lessons")}>
          <IonCardContent>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{ borderRadius: "8px", background: "rgba(0,102,204,0.12)", padding: "8px", color: "var(--ion-color-primary)", display: "flex" }}>
                <IonIcon icon={bookOutline} style={{ fontSize: "20px" }} />
              </div>
              <span style={{ fontWeight: 600, fontSize: "1rem" }}>Lecciones</span>
            </div>
            <ProgressBar value={lessonsPct} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--ion-color-medium)", marginTop: "4px" }}>
              <span>{lessonsDone}/{lessons.length} completadas</span>
              <span>{lessonsPct}%</span>
            </div>
          </IonCardContent>
        </IonCard>

        <IonCard button onClick={() => history.push("/exercises")} style={{ marginTop: "12px" }}>
          <IonCardContent>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "12px" }}>
              <div style={{ borderRadius: "8px", background: "rgba(40,167,69,0.12)", padding: "8px", color: "var(--ion-color-success)", display: "flex" }}>
                <IonIcon icon={barbellOutline} style={{ fontSize: "20px" }} />
              </div>
              <span style={{ fontWeight: 600, fontSize: "1rem" }}>Ejercicios</span>
            </div>
            <ProgressBar value={exPct} />
            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.75rem", color: "var(--ion-color-medium)", marginTop: "4px" }}>
              <span>{exDone}/{exercises.length} resueltos</span>
              <span>{exPct}%</span>
            </div>
          </IonCardContent>
        </IonCard>

        <IonCard button onClick={() => history.push("/terminal")} style={{ marginTop: "12px" }}>
          <IonCardContent>
            <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "6px" }}>
              <div style={{ borderRadius: "8px", background: "rgba(0,230,118,0.12)", padding: "8px", color: "#00e676", display: "flex" }}>
                <IonIcon icon={terminalOutline} style={{ fontSize: "20px" }} />
              </div>
              <span style={{ fontWeight: 600, fontSize: "1rem" }}>Mi Terminal</span>
            </div>
            <p className="font-mono-term" style={{ fontSize: "0.875rem", margin: "8px 0 0" }}>user@linux:~$ _</p>
            <p style={{ fontSize: "0.75rem", opacity: 0.7, margin: "4px 0 0" }}>Practica comandos en vivo</p>
          </IonCardContent>
        </IonCard>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "12px", marginTop: "20px" }}>
          <IonCard>
            <IonCardContent>
              <strong>Progreso general</strong>
              <div style={{ textAlign: "center", marginTop: "12px" }}>
                <CircularProgress value={overall} label="Global" />
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "8px", marginTop: "12px", justifyContent: "center" }}>
                <IonIcon icon={flameOutline} style={{ fontSize: "20px", color: "var(--ion-color-warning)" }} />
                <div>
                  <div style={{ fontWeight: 700 }}>{user.racha}</div>
                  <div style={{ fontSize: "0.75rem", color: "var(--ion-color-medium)" }}>días seguidos</div>
                </div>
              </div>
            </IonCardContent>
          </IonCard>

          <IonCard>
            <IonCardContent>
              <strong>Insignias ganadas</strong>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", marginTop: "12px" }}>
                {user.badges.map((b: string) => <AwardBadge key={b} name={b} />)}
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default HomePage;

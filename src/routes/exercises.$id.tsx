import { useHistory, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonButton, IonIcon } from "@ionic/react";
import { checkmarkCircleOutline, closeCircleOutline, bulbOutline } from "ionicons/icons";
import { attemptExercise, getStore } from "@/lib/data";

function ExerciseDetail() {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const eid = Number(id);
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState<{ correct: boolean; reveal: boolean; intentos: number } | null>(null);

  useEffect(() => {
    if (!getStore().authed) history.replace("/login");
  }, []);

  const ex = getStore().exercises.find((e) => e.id === eid);
  if (!ex) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start"><IonBackButton defaultHref="/exercises" /></IonButtons>
            <IonTitle>Ejercicio no encontrado</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <p style={{ color: "var(--ion-color-medium)" }}>Ejercicio no encontrado.</p>
          <IonButton routerLink="/exercises" fill="clear">Volver</IonButton>
        </IonContent>
      </IonPage>
    );
  }

  const verify = () => {
    const r = attemptExercise(eid, answer);
    setResult(r);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton defaultHref="/exercises" /></IonButtons>
          <IonTitle>Ejercicio {ex.id}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
          <span className={`difficulty-badge ${ex.dificultad.toLowerCase()}`}>{ex.dificultad}</span>
          <span style={{ fontSize: "0.75rem", color: "var(--ion-color-medium)" }}>{ex.puntos} pts</span>
        </div>
        <h1 style={{ margin: "8px 0 4px", fontSize: "1.75rem", fontWeight: 700 }}>{ex.titulo}</h1>
        <p style={{ color: "var(--ion-color-medium)" }}>{ex.enunciado}</p>
        {ex.descripcion && <p style={{ fontSize: "0.875rem", color: "var(--ion-color-medium)", marginTop: "8px" }}>{ex.descripcion}</p>}

        <div style={{ marginTop: "24px" }}>
          <label style={{ fontSize: "0.875rem", fontWeight: 500, marginBottom: "8px", display: "block" }}>Tu comando</label>
          <div style={{ background: "#1a1a2e", borderRadius: "8px", padding: "12px", display: "flex", alignItems: "flex-start", gap: "4px" }}>
            <span style={{ color: "#00e676", fontFamily: "var(--font-mono)" }}>$</span>
            <textarea
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              rows={2}
              placeholder="Escribe el comando aquí..."
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#00e676", caretColor: "#00e676", fontFamily: "var(--font-mono)", fontSize: "0.875rem", resize: "none" }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "12px", marginTop: "12px" }}>
            <IonButton onClick={verify}>Verificar</IonButton>
            <span style={{ fontSize: "0.75rem", color: "var(--ion-color-medium)" }}>Intentos: {ex.intentos}</span>
          </div>
        </div>

        {result && (
          <div style={{
            marginTop: "20px",
            borderRadius: "8px",
            border: `1px solid ${result.correct ? "var(--ion-color-success)" : "var(--ion-color-danger)"}`,
            padding: "16px",
            background: result.correct ? "rgba(40,167,69,0.08)" : "rgba(220,53,69,0.08)"
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: "8px", fontWeight: 600 }}>
              <IonIcon icon={result.correct ? checkmarkCircleOutline : closeCircleOutline} style={{ fontSize: "20px" }} />
              {result.correct ? `¡Correcto! Ganaste ${ex.puntos} puntos.` : "Intenta de nuevo."}
            </div>
            {!result.correct && result.reveal && (
              <div style={{ marginTop: "12px", display: "flex", alignItems: "flex-start", gap: "8px", borderRadius: "6px", padding: "12px", background: "white" }}>
                <IonIcon icon={bulbOutline} style={{ color: "var(--ion-color-warning)", fontSize: "18px", flexShrink: 0, marginTop: "2px" }} />
                <div style={{ fontSize: "0.875rem" }}>
                  Respuesta correcta: <code className="font-mono-term" style={{ background: "#f1f3f5", padding: "2px 6px", borderRadius: "4px", fontSize: "0.875rem" }}>{ex.respuestaCorrecta}</code>
                </div>
              </div>
            )}
          </div>
        )}

        <div style={{ marginTop: "32px" }}>
          <IonButton routerLink="/exercises" fill="clear" style={{ "--padding-start": "0" }}>
            ← Volver a ejercicios
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default ExerciseDetail;

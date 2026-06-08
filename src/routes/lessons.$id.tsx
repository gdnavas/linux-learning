import { useHistory, useParams } from "react-router-dom";
import { useEffect } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonBackButton, IonButton, IonIcon } from "@ionic/react";
import { playOutline } from "ionicons/icons";
import { getStore, updateLessonProgress } from "@/lib/data";

function LessonDetail() {
  const history = useHistory();
  const { id } = useParams<{ id: string }>();
  const lid = Number(id);

  useEffect(() => {
    if (!getStore().authed) history.replace("/login");
  }, []);

  const { lessons } = getStore();
  const lesson = lessons.find((l) => l.id === lid);

  useEffect(() => {
    if (lesson && !lesson.bloqueada) {
      updateLessonProgress(lid, Math.max(lesson.progreso, 60));
    }
  }, [lid]);

  if (!lesson) {
    return (
      <IonPage>
        <IonHeader>
          <IonToolbar>
            <IonButtons slot="start"><IonBackButton defaultHref="/lessons" /></IonButtons>
            <IonTitle>Lección no encontrada</IonTitle>
          </IonToolbar>
        </IonHeader>
        <IonContent className="ion-padding">
          <p style={{ color: "var(--ion-color-medium)" }}>Lección no encontrada.</p>
          <IonButton routerLink="/lessons" fill="clear">Volver</IonButton>
        </IonContent>
      </IonPage>
    );
  }

  const prev = lessons.find((l) => l.id === lid - 1);
  const next = lessons.find((l) => l.id === lid + 1);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start"><IonBackButton defaultHref="/lessons" /></IonButtons>
          <IonTitle>Lección {lesson.id}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <div style={{ display: "flex", alignItems: "center", gap: "12px", marginBottom: "4px" }}>
          <span className={`difficulty-badge ${lesson.dificultad.toLowerCase()}`}>{lesson.dificultad}</span>
          <span style={{ fontSize: "0.75rem", color: "var(--ion-color-medium)" }}>Lección {lesson.id} de {lessons.length}</span>
        </div>
        <h1 style={{ margin: "8px 0 4px", fontSize: "1.75rem", fontWeight: 700 }}>{lesson.titulo}</h1>
        <p style={{ color: "var(--ion-color-medium)" }}>{lesson.descripcion}</p>

        <div style={{ marginTop: "24px", lineHeight: 1.6 }}>{lesson.contenido}</div>

        {lesson.ejemplo && (
          <div style={{ marginTop: "24px", borderLeft: "4px solid var(--ion-color-primary)", background: "#f1f3f5", borderRadius: "8px", padding: "16px" }}>
            <div style={{ fontSize: "0.875rem", textTransform: "uppercase", fontWeight: 600, color: "var(--ion-color-primary)" }}>Ejemplo</div>
            <pre className="font-mono-term" style={{ marginTop: "8px", padding: "12px", background: "#1a1a2e", color: "#00e676", borderRadius: "6px", overflowX: "auto", fontSize: "0.875rem" }}>{lesson.ejemplo}</pre>
          </div>
        )}

        {lesson.conceptos && lesson.conceptos.length > 0 && (
          <div style={{ marginTop: "24px", border: "1px solid var(--ion-border-color)", borderRadius: "8px", padding: "16px" }}>
            <div style={{ fontSize: "0.875rem", textTransform: "uppercase", fontWeight: 600 }}>Conceptos clave</div>
            <ul style={{ marginTop: "8px", paddingLeft: "20px", fontSize: "0.875rem" }}>
              {lesson.conceptos.map((c: string) => <li key={c}>{c}</li>)}
            </ul>
          </div>
        )}

        <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "space-between", alignItems: "center", gap: "12px", marginTop: "32px" }}>
          <IonButton disabled={!prev} onClick={() => prev && history.push(`/lessons/${prev.id}`)} fill="outline">
            Anterior
          </IonButton>

          {lesson.ejercicioId && (
            <IonButton
              onClick={() => { updateLessonProgress(lid, 100); history.push(`/exercises/${lesson.ejercicioId}`); }}
              color="success"
            >
              <IonIcon icon={playOutline} slot="start" /> Ir a ejercicio
            </IonButton>
          )}

          <IonButton disabled={!next} onClick={() => next && history.push(`/lessons/${next.id}`)}>
            Siguiente
          </IonButton>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default LessonDetail;

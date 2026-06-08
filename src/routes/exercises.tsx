import { useHistory } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSegment, IonSegmentButton, IonLabel, IonCard, IonCardContent } from "@ionic/react";
import { getStore } from "@/lib/data";

type Filter = "todos" | "completados" | "pendientes";

function ExercisesPage() {
  const history = useHistory();
  const [filter, setFilter] = useState<Filter>("todos");

  useEffect(() => {
    if (!getStore().authed) history.replace("/login");
  }, []);

  const ex = getStore().exercises;
  const list = useMemo(() => ex.filter((e) =>
    filter === "todos" ? true : filter === "completados" ? e.completado : !e.completado
  ), [ex, filter]);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Ejercicios</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonSegment value={filter} onIonChange={(e) => setFilter(e.detail.value as Filter)}>
          <IonSegmentButton value="todos">
            <IonLabel>Todos</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="completados">
            <IonLabel>Completados</IonLabel>
          </IonSegmentButton>
          <IonSegmentButton value="pendientes">
            <IonLabel>Pendientes</IonLabel>
          </IonSegmentButton>
        </IonSegment>

        {list.map((e) => {
          const Icon = e.completado ? "checkmark-circle" : "ellipse-outline";
          const iconColor = e.completado ? "var(--ion-color-success)" : "var(--ion-color-medium)";
          return (
            <IonCard key={e.id} button onClick={() => history.push(`/exercises/${e.id}`)}>
              <IonCardContent>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                  <span style={{ fontWeight: 600, fontSize: "1rem" }}>{e.titulo}</span>
                  <ion-icon name={Icon} style={{ fontSize: "20px", color: iconColor, flexShrink: 0 }} />
                </div>
                <p style={{ fontSize: "0.875rem", color: "var(--ion-color-medium)", margin: "0 0 12px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                  {e.enunciado}
                </p>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "8px", fontSize: "0.75rem", color: "var(--ion-color-medium)", alignItems: "center" }}>
                  <span className={`difficulty-badge ${e.dificultad.toLowerCase()}`}>{e.dificultad}</span>
                  <span>Intentos: {e.intentos}</span>
                  <span>Mejor: {e.mejorPuntaje}pts</span>
                </div>
              </IonCardContent>
            </IonCard>
          );
        })}

        {list.length === 0 && (
          <p style={{ fontSize: "0.875rem", color: "var(--ion-color-medium)", textAlign: "center", marginTop: "24px" }}>
            Sin ejercicios en este filtro.
          </p>
        )}
      </IonContent>
    </IonPage>
  );
}

export default ExercisesPage;

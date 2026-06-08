import { useHistory } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonSearchbar, IonCard, IonCardContent } from "@ionic/react";
import { ProgressBar } from "@/components/ProgressBar";
import { getStore } from "@/lib/data";

function LessonsPage() {
  const history = useHistory();
  const [q, setQ] = useState("");

  useEffect(() => {
    if (!getStore().authed) history.replace("/login");
  }, []);

  const lessons = getStore().lessons;
  const filtered = useMemo(
    () => lessons.filter((l) => (l.titulo + l.descripcion).toLowerCase().includes(q.toLowerCase())),
    [lessons, q]
  );

  const statusIcon = (l: any) => {
    if (l.bloqueada) return "lock-closed-outline";
    if (l.completada) return "checkmark-circle-outline";
    return "ellipse-outline";
  };

  const statusColor = (l: any) => {
    if (l.bloqueada) return "var(--ion-color-medium)";
    if (l.completada) return "var(--ion-color-success)";
    return "var(--ion-color-medium)";
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Lecciones</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonSearchbar value={q} onIonInput={(e) => setQ(e.detail.value!)} placeholder="Buscar lecciones..." />

        {filtered.map((l) => (
          <IonCard
            key={l.id}
            button={!l.bloqueada}
            onClick={() => !l.bloqueada && history.push(`/lessons/${l.id}`)}
            style={{ opacity: l.bloqueada ? 0.6 : 1 }}
          >
            <IonCardContent>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "8px" }}>
                <span style={{ fontWeight: 600, fontSize: "1rem" }}>{l.titulo}</span>
                <ion-icon name={statusIcon(l)} style={{ fontSize: "20px", color: statusColor(l), flexShrink: 0 }} />
              </div>
              <p style={{ fontSize: "0.875rem", color: "var(--ion-color-medium)", margin: "0 0 12px", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden" }}>
                {l.descripcion}
              </p>
              <ProgressBar value={l.progreso} />
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "8px", fontSize: "0.75rem" }}>
                <span className={`difficulty-badge ${l.dificultad.toLowerCase()}`}>{l.dificultad}</span>
                <span style={{ color: "var(--ion-color-medium)" }}>{l.progreso}%</span>
              </div>
            </IonCardContent>
          </IonCard>
        ))}

        {filtered.length === 0 && (
          <p style={{ fontSize: "0.875rem", color: "var(--ion-color-medium)", textAlign: "center", marginTop: "24px" }}>
            No se encontraron lecciones.
          </p>
        )}
      </IonContent>
    </IonPage>
  );
}

export default LessonsPage;

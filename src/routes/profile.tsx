import { useHistory } from "react-router-dom";
import { useEffect } from "react";
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent, IonCard, IonCardContent, IonAvatar, IonButton, IonIcon } from "@ionic/react";
import { logOutOutline } from "ionicons/icons";
import { AwardBadge } from "@/components/AwardBadge";
import { getStore, logout } from "@/lib/data";

const BADGE_DESC: Record<string, string> = {
  "Linux Rookie": "Completaste tu primera lección.",
  "Command Master": "Resolviste 5+ ejercicios correctamente.",
};

const DAYS = ["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"];

function ProfilePage() {
  const history = useHistory();

  useEffect(() => {
    if (!getStore().authed) history.replace("/login");
  }, []);

  const { user, lessons, exercises } = getStore();
  const lessonsDone = lessons.filter((l) => l.completada).length;
  const exDone = exercises.filter((e) => e.completado).length;
  const maxAct = Math.max(...user.activity, 1);

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle>Mi perfil</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding">
        <IonCard>
          <IonCardContent>
            <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
              <IonAvatar style={{ width: "64px", height: "64px" }}>
                <div style={{
                  width: "100%", height: "100%", borderRadius: "50%",
                  background: "var(--ion-color-primary)", color: "white",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  fontSize: "1.5rem", fontWeight: 700
                }}>
                  {user.name.charAt(0)}
                </div>
              </IonAvatar>
              <div>
                <h2 style={{ margin: 0, fontSize: "1.25rem", fontWeight: 700 }}>{user.name}</h2>
                <p style={{ margin: "4px 0 0", color: "var(--ion-color-medium)", fontSize: "0.875rem" }}>{user.email}</p>
              </div>
            </div>
          </IonCardContent>
        </IonCard>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "8px", marginTop: "16px" }}>
          {[
            { label: "Lecciones", value: lessonsDone },
            { label: "Ejercicios", value: exDone },
            { label: "Racha (días)", value: user.racha },
          ].map((s) => (
            <IonCard key={s.label} style={{ margin: 0 }}>
              <IonCardContent style={{ textAlign: "center", padding: "12px" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 700, color: "var(--ion-color-primary)" }}>{s.value}</div>
                <div style={{ fontSize: "0.75rem", color: "var(--ion-color-medium)" }}>{s.label}</div>
              </IonCardContent>
            </IonCard>
          ))}
        </div>

        <IonCard style={{ marginTop: "16px" }}>
          <IonCardContent>
            <strong>Actividad últimos 7 días</strong>
            <div style={{ display: "flex", alignItems: "flex-end", justifyContent: "space-between", gap: "8px", height: "128px", marginTop: "12px" }}>
              {user.activity.map((v: number, i: number) => (
                <div key={i} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: "4px" }}>
                  <div
                    style={{
                      width: "100%",
                      borderRadius: "4px 4px 0 0",
                      background: "var(--ion-color-primary)",
                      height: `${(v / maxAct) * 100}%`,
                      transition: "height 0.3s ease"
                    }}
                    title={`${v} actividades`}
                  />
                  <span style={{ fontSize: "0.625rem", color: "var(--ion-color-medium)" }}>{DAYS[i]}</span>
                </div>
              ))}
            </div>
          </IonCardContent>
        </IonCard>

        <IonCard style={{ marginTop: "16px" }}>
          <IonCardContent>
            <strong>Insignias</strong>
            <div style={{ display: "flex", flexDirection: "column", gap: "8px", marginTop: "12px" }}>
              {user.badges.map((b: string) => (
                <div key={b} style={{ display: "flex", alignItems: "center", gap: "12px", borderRadius: "8px", padding: "12px", background: "white", border: "1px solid var(--ion-border-color)" }}>
                  <AwardBadge name={b} />
                  <p style={{ flex: 1, fontSize: "0.875rem", color: "var(--ion-color-medium)", margin: 0, padding: 0 }}>
                    {BADGE_DESC[b] ?? "Insignia desbloqueada"}
                  </p>
                </div>
              ))}
            </div>
          </IonCardContent>
        </IonCard>

        <IonButton
          expand="full"
          color="danger"
          onClick={() => { logout(); history.replace("/login"); }}
          style={{ marginTop: "16px" }}
        >
          <IonIcon icon={logOutOutline} slot="start" /> Cerrar sesión
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default ProfilePage;

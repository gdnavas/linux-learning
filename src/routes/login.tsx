import { useState } from "react";
import { useHistory } from "react-router-dom";
import { IonPage, IonContent, IonIcon, IonCard, IonCardContent, IonItem, IonLabel, IonInput, IonButton, IonText } from "@ionic/react";
import { terminalOutline } from "ionicons/icons";
import { login } from "@/lib/data";

function LoginPage() {
  const history = useHistory();
  const [email, setEmail] = useState("usuario@test.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState<string | null>(null);

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (login(email, password)) {
      history.replace("/home");
    } else {
      setError("Credenciales incorrectas. Usa usuario@test.com / password123");
    }
  };

  return (
    <IonPage className="auth-page">
      <IonContent>
        <div className="auth-container">
          <div className="ion-text-center ion-margin-bottom">
            <IonIcon icon={terminalOutline} style={{ fontSize: "48px", color: "var(--ion-color-primary)" }} />
            <h1 className="ion-margin-top" style={{ fontSize: "1.5rem", fontWeight: 700, marginBottom: 0 }}>Linux Learning</h1>
            <p style={{ color: "var(--ion-color-medium)", marginTop: "4px" }}>Aprende Linux paso a paso</p>
          </div>
          <IonCard style={{ width: "100%", maxWidth: "400px" }}>
            <IonCardContent>
              <form onSubmit={onSubmit}>
                <IonItem>
                  <IonLabel position="stacked">Usuario / Email</IonLabel>
                  <IonInput type="email" value={email} onIonChange={(e) => setEmail(e.detail.value!)} required />
                </IonItem>
                <IonItem>
                  <IonLabel position="stacked">Contraseña</IonLabel>
                  <IonInput type="password" value={password} onIonChange={(e) => setPassword(e.detail.value!)} required />
                </IonItem>
                {error && (
                  <IonText color="danger">
                    <p className="ion-padding-start ion-padding-end" style={{ fontSize: "0.875rem" }}>{error}</p>
                  </IonText>
                )}
                <div className="ion-padding-top">
                  <IonButton expand="full" type="submit">
                    Ingresar
                  </IonButton>
                </div>
              </form>
              <p className="ion-text-center ion-margin-top" style={{ fontSize: "0.75rem", color: "var(--ion-color-medium)" }}>
                ¿No tienes cuenta? <span style={{ color: "var(--ion-color-primary)", fontWeight: 500, cursor: "pointer" }}>Registrarse</span>
              </p>
              <div className="ion-margin-top" style={{ padding: "8px 12px", background: "#f1f3f5", borderRadius: "6px", textAlign: "center", fontSize: "0.75rem", color: "var(--ion-color-medium)" }}>
                Demo: <strong>usuario@test.com</strong> / <strong>password123</strong>
              </div>
            </IonCardContent>
          </IonCard>
        </div>
      </IonContent>
    </IonPage>
  );
}

export default LoginPage;

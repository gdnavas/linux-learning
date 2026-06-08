import { Capacitor } from "@capacitor/core";
import { IonApp, IonRouterOutlet, IonTabs, IonTabBar, IonTabButton, IonIcon, IonLabel } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import { Route, Redirect, useLocation } from "react-router-dom";
import { homeOutline, bookOutline, barbellOutline, terminalOutline, personOutline } from "ionicons/icons";
import LoginPage from "./routes/login";
import HomePage from "./routes/home";
import LessonsPage from "./routes/lessons";
import LessonDetail from "./routes/lessons.$id";
import ExercisesPage from "./routes/exercises";
import ExerciseDetail from "./routes/exercises.$id";
import TerminalPage from "./routes/terminal";
import ProfilePage from "./routes/profile";
import { getStore } from "./lib/data";

function IndexRedirect() {
  const s = getStore();
  return <Redirect to={s.authed ? "/home" : "/login"} />;
}

function AppLayout() {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  return (
    <IonTabs>
      <IonRouterOutlet>
        <Route path="/login" component={LoginPage} exact />
        <Route path="/home" component={HomePage} exact />
        <Route path="/lessons" component={LessonsPage} exact />
        <Route path="/lessons/:id" component={LessonDetail} exact />
        <Route path="/exercises" component={ExercisesPage} exact />
        <Route path="/exercises/:id" component={ExerciseDetail} exact />
        <Route path="/terminal" component={TerminalPage} exact />
        <Route path="/profile" component={ProfilePage} exact />
        <Route exact path="/" render={() => <IndexRedirect />} />
      </IonRouterOutlet>
      <IonTabBar slot="bottom" hidden={isLogin}>
        <IonTabButton tab="home" href="/home">
          <IonIcon icon={homeOutline} />
          <IonLabel>Inicio</IonLabel>
        </IonTabButton>
        <IonTabButton tab="lessons" href="/lessons">
          <IonIcon icon={bookOutline} />
          <IonLabel>Lecciones</IonLabel>
        </IonTabButton>
        <IonTabButton tab="exercises" href="/exercises">
          <IonIcon icon={barbellOutline} />
          <IonLabel>Ejercicios</IonLabel>
        </IonTabButton>
        <IonTabButton tab="terminal" href="/terminal">
          <IonIcon icon={terminalOutline} />
          <IonLabel>Terminal</IonLabel>
        </IonTabButton>
        <IonTabButton tab="profile" href="/profile">
          <IonIcon icon={personOutline} />
          <IonLabel>Perfil</IonLabel>
        </IonTabButton>
      </IonTabBar>
    </IonTabs>
  );
}

function App() {
  const basename = Capacitor.isNativePlatform() ? "/" : "/linux-learning";
  return (
    <IonApp>
      <IonReactRouter basename={basename}>
        <AppLayout />
      </IonReactRouter>
    </IonApp>
  );
}

export default App;

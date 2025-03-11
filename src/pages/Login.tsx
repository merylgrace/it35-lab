import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonInput,
  IonItem,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter
} from '@ionic/react';

import { personCircleOutline } from 'ionicons/icons';

function Login() {
  const navigation = useIonRouter();
  const doLogin = () => {
    navigation.push('/it35-lab/app', 'forward', 'replace');
  };
  const doRegister = () => {
    navigation.push('/it35-lab/Register', 'forward', 'replace');
  };



  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>Login</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className='ion-padding'>
        <div style={{ textAlign: 'center', marginBottom: '20px' }}>
          <IonIcon icon={personCircleOutline} style={{ fontSize: '80px' }} />
        </div>
        <IonItem>
          <IonInput label="Username" placeholder="Enter Username"></IonInput>
        </IonItem>
        <IonItem>
          <IonInput label="Password" type="password" placeholder="Enter Password"></IonInput>
        </IonItem>
        <IonButton onClick={() => doLogin()} expand="full">
          Login
        </IonButton>
        <p> No account? <span
        onClick={doRegister}
      >
        Register here
      </span></p>
      </IonContent>
    </IonPage>
  );
}

export default Login;
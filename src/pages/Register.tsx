import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter
} from '@ionic/react';

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
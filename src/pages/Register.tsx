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

function Register() {
  const navigation = useIonRouter();
  const doRegister = () => {
    navigation.push('/it35-lab/Login', 'forward', 'replace');
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
                <IonItem>
                  <IonInput label="Password" type="password" placeholder="Confirm Password"></IonInput>
                </IonItem>
        <IonButton onClick={() => doRegister()} expand="full">
          Login
        </IonButton>
      </IonContent>
    </IonPage>
  );
}

export default Register;
import { 
  IonButton,
    IonButtons,
      IonContent, 
      IonHeader,
      IonIcon, 
      IonMenuButton, 
      IonPage, 
      IonTitle, 
      IonToolbar 
  } from '@ionic/react';

  import { logInOutline } from 'ionicons/icons';
  
  const Login: React.FC = () => {
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
        <IonContent fullscreen>

          {/* Login Button */}
        <IonButton routerLink="/it35-lab" routerDirection="forward" expand="full">
          <IonIcon icon={logInOutline} slot="start"></IonIcon>
          Login
        </IonButton>

        </IonContent>
      </IonPage>
    );
  };
  
  export default Login;
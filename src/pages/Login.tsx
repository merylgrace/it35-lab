import {
  IonAlert,
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
import { useState } from 'react';

function Login() {
  const navigation = useIonRouter();
    const [showToast, setShowToast] = useState(false);
    const [showAlert, setShowAlert] = useState(false);
    const [email, setEmail] = useState ('');
    const [password, setPassword] = useState('');

    const user_email = 'hihi@gmail.com';
    const user_pwd = 'useruser';

    const doLogin = () => {
      if (email !== user_email || password !== user_pwd) {
        setShowAlert(true);
        return;
      } else {

        console.log(email);
        console.log(password);

        setShowToast(true);
        setTimeout(() => {
          navigation.push('/it35-lab/app', 'forward', 'replace')
        }, 1500);
      }
    }

  
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
       
      </IonContent>
    </IonPage>
  );
}
//insert ionalert and everything here
export default Login;
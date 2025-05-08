import {
  IonAlert,
  IonButton,
  IonCard,
  IonCardContent,
  IonContent,
  IonInput,
  IonInputPasswordToggle,
  IonPage,
  IonTitle,
  IonToast,
  useIonRouter
} from '@ionic/react';
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';

const Login: React.FC = () => {
  const navigation = useIonRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showAlert, setShowAlert] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const doLogin = async () => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      setErrorMessage(error.message);
      setShowAlert(true);
    } else {
      setShowToast(true);
      setTimeout(() => {
        navigation.push('/it35-lab/app', 'forward', 'replace');
      }, 300);
    }
  };

  return (
    <IonPage>
      <IonContent className="ion-padding">
        <div style={{ maxWidth: '400px', margin: '0 auto', marginTop: '10%' }}>
          <IonCard>
            <IonCardContent>
              <IonTitle className="ion-text-center">Welcome to MingkApp!</IonTitle>
              <div style={{ textAlign: "center", marginBottom: "16px" }}>
              <p style={{ fontSize: "1.1rem" }}>
                It's so good to see <strong>you</strong> today.
              </p>
              <img
                src="https://i.pinimg.com/originals/ae/30/a3/ae30a397a019e541bc4cd88764a171ef.gif"
                alt="cute cat giff"
                style={{ width: "70px", borderRadius: "8px", marginTop: "4px" }}
              />
              </div>

              <IonInput
                style={{ marginTop: '20px' }}
                label="Email"
                labelPlacement="stacked"
                fill="outline"
                type="email"
                placeholder="Enter Email"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
              />
              <IonInput
                style={{ marginTop: '15px' }}
                label="Password"
                labelPlacement="stacked"
                fill="outline"
                type="password"
                placeholder="Enter Password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              >
                <IonInputPasswordToggle slot="end" />
              </IonInput>

              <IonButton
                style={{ marginTop: '25px' }}
                expand="block"
                shape="round"
                onClick={doLogin}
              >
                Login
              </IonButton>

              <IonButton
                expand="block"
                fill="clear"
                shape="round"
                routerLink="/it35-lab/register"
              >
                Don't have an account? Register
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>

        {/* Alert for login error */}
        <IonAlert
          isOpen={showAlert}
          onDidDismiss={() => setShowAlert(false)}
          header="Login Failed"
          message={errorMessage}
          buttons={['OK']}
        />

        {/* Toast for login success */}
        <IonToast
          isOpen={showToast}
          onDidDismiss={() => setShowToast(false)}
          message="Login successful! Redirecting..."
          duration={1500}
          position="top"
          color="primary"
        />
      </IonContent>
    </IonPage>
  );
};

export default Login;
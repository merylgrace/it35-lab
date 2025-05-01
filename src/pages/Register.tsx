import React, { useState } from 'react';
import {
  IonButton,
  IonContent,
  IonHeader,
  IonInput,
  IonInputPasswordToggle,
  IonPage,
  IonTitle,
  IonToolbar,
  IonModal,
  IonText,
  IonCard,
  IonCardContent,
  IonCardHeader,
  IonCardTitle,
  IonCardSubtitle,
} from '@ionic/react';

const Register: React.FC = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const handleOpenVerificationModal = () => {
    if (!email.endsWith('@nbsc.edu.ph')) {
      alert('Only @nbsc.edu.ph emails are allowed to register.');
      return;
    }

    if (password !== confirmPassword) {
      alert('Passwords do not match.');
      return;
    }

    setShowVerificationModal(true);
  };

  const doRegister = async () => {
    setShowVerificationModal(false);
    setShowSuccessModal(true);
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonTitle className="ion-text-center">Register</IonTitle>
        </IonToolbar>
      </IonHeader>

      <IonContent className="ion-padding">
        <div style={{ maxWidth: '400px', margin: '0 auto' }}>
          <IonCard>
            <IonCardContent>
              <h2 className="ion-text-center">Create Your Account</h2>

              <IonInput
                label="Username"
                labelPlacement="stacked"
                fill="outline"
                placeholder="Enter a unique username"
                value={username}
                onIonChange={(e) => setUsername(e.detail.value!)}
              />
              <IonInput
                style={{ marginTop: '15px' }}
                label="Email"
                labelPlacement="stacked"
                fill="outline"
                type="email"
                placeholder="youremail@nbsc.edu.ph"
                value={email}
                onIonChange={(e) => setEmail(e.detail.value!)}
              />
              <IonInput
                style={{ marginTop: '15px' }}
                label="Password"
                labelPlacement="stacked"
                fill="outline"
                type="password"
                placeholder="Password"
                value={password}
                onIonChange={(e) => setPassword(e.detail.value!)}
              >
                <IonInputPasswordToggle slot="end" />
              </IonInput>
              <IonInput
                style={{ marginTop: '15px' }}
                label="Confirm Password"
                labelPlacement="stacked"
                fill="outline"
                type="password"
                placeholder="Confirm Password"
                value={confirmPassword}
                onIonChange={(e) => setConfirmPassword(e.detail.value!)}
              >
                <IonInputPasswordToggle slot="end" />
              </IonInput>

              <IonButton
                expand="block"
                style={{ marginTop: '20px' }}
                shape="round"
                onClick={handleOpenVerificationModal}
              >
                Register
              </IonButton>

              <IonButton
                expand="block"
                fill="clear"
                shape="round"
                routerLink="/it35-lab"
              >
                Already have an account? Sign in
              </IonButton>
            </IonCardContent>
          </IonCard>
        </div>

        {/* Verification Modal */}
        <IonModal
          isOpen={showVerificationModal}
          onDidDismiss={() => setShowVerificationModal(false)}
        >
          <IonHeader>
            <IonToolbar>
              <IonTitle className="ion-text-center">Confirm Details</IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent className="ion-padding">
            <IonCard className="ion-padding">
              <IonCardHeader>
                <IonCardTitle>User Info</IonCardTitle>
                <IonCardSubtitle>Username</IonCardSubtitle>
                <IonText>{username}</IonText>
                <IonCardSubtitle>Email</IonCardSubtitle>
                <IonText>{email}</IonText>
              </IonCardHeader>

              <div style={{ textAlign: 'right', marginTop: '20px' }}>
                <IonButton fill="clear" onClick={() => setShowVerificationModal(false)}>
                  Cancel
                </IonButton>
                <IonButton color="primary" onClick={doRegister}>
                  Confirm
                </IonButton>
              </div>
            </IonCard>
          </IonContent>
        </IonModal>

        {/* Success Modal */}
        <IonModal
          isOpen={showSuccessModal}
          onDidDismiss={() => setShowSuccessModal(false)}
        >
          <IonContent className="ion-padding" style={{ textAlign: 'center' }}>
            <div style={{ marginTop: '30%' }}>
              <IonTitle>🎉 Registration Successful!</IonTitle>
              <IonText>
                <p>Your account has been created.</p>
                <p>Please check your email inbox.</p>
              </IonText>
              <IonButton
                routerLink="/it35-lab"
                routerDirection="back"
                color="success"
                style={{ marginTop: '20px' }}
              >
                Go to Login
              </IonButton>
            </div>
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Register;
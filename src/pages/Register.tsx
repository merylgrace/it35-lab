import {
    IonButton,
    IonContent,
    IonInput,
    IonInputPasswordToggle,
    IonPage,
    IonTitle,
    IonCard,
    IonCardContent,
    IonText,
    IonModal,
    IonAlert,
} from '@ionic/react';
import React, { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import bcrypt from 'bcryptjs';

const Register: React.FC = () => {
    const [username, setUsername] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showVerificationModal, setShowVerificationModal] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [showAlert, setShowAlert] = useState(false);

    const handleOpenVerificationModal = () => {
        if (!email.endsWith('@nbsc.edu.ph')) {
            setAlertMessage('Only @nbsc.edu.ph emails are allowed to register.');
            setShowAlert(true);
            return;
        }

        if (password !== confirmPassword) {
            setAlertMessage('Passwords do not match.');
            setShowAlert(true);
            return;
        }

        setShowVerificationModal(true);
    };

    const doRegister = async () => {
        setShowVerificationModal(false);

        try {
            const { error } = await supabase.auth.signUp({ email, password });
            if (error) throw new Error('Account creation failed: ' + error.message);

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);

            const { error: insertError } = await supabase.from('users').insert([
                {
                    username,
                    user_email: email,
                    user_firstname: firstName,
                    user_lastname: lastName,
                    user_password: hashedPassword,
                },
            ]);

            if (insertError) throw new Error('Failed to save user data: ' + insertError.message);

            setShowSuccessModal(true);
        } catch (err) {
            setAlertMessage(err instanceof Error ? err.message : 'An unknown error occurred.');
            setShowAlert(true);
        }
    };

    return (
        <IonPage>
            <IonContent className="ion-padding">
                <div style={{ maxWidth: '400px', margin: '0 auto', marginTop: '5%' }}>
                    <IonCard>
                        <IonCardContent>
                            <IonTitle className="ion-text-center">Create Your Account</IonTitle>
                            <div style={{ textAlign: "center", marginBottom: "16px" }}>
                                <p style={{ fontSize: "1.1rem" }}>
                                    You are registering for <strong>MingkApp</strong>.
                                </p>
                                <img
                                    src="https://i.pinimg.com/originals/01/83/5a/01835a6c1db1385995e04c7687f80447.gif"
                                    alt="cute cat gif"
                                    style={{ width: "70px", borderRadius: "8px", marginTop: "4px" }}
                                />
                            </div>
                            <IonInput
                                label="Username"
                                labelPlacement="stacked"
                                fill="outline"
                                type="text"
                                placeholder="Enter Username"
                                value={username}
                                onIonChange={(e) => setUsername(e.detail.value!)}
                                style={{ marginTop: '15px' }}
                            />
                            <IonInput
                                label="First Name"
                                labelPlacement="stacked"
                                fill="outline"
                                type="text"
                                placeholder="Enter Your First Name"
                                value={firstName}
                                onIonChange={(e) => setFirstName(e.detail.value!)}
                                style={{ marginTop: '15px' }}
                            />
                            <IonInput
                                label="Last Name"
                                labelPlacement="stacked"
                                fill="outline"
                                type="text"
                                placeholder="Enter Your Last Name"
                                value={lastName}
                                onIonChange={(e) => setLastName(e.detail.value!)}
                                style={{ marginTop: '15px' }}
                            />
                            <IonInput
                                label="Email"
                                labelPlacement="stacked"
                                fill="outline"
                                type="email"
                                placeholder="youremail@nbsc.edu.ph"
                                value={email}
                                onIonChange={(e) => setEmail(e.detail.value!)}
                                style={{ marginTop: '15px' }}
                            />
                            <IonInput
                                label="Password"
                                labelPlacement="stacked"
                                fill="outline"
                                type="password"
                                placeholder="Enter Password"
                                value={password}
                                onIonChange={(e) => setPassword(e.detail.value!)}
                                style={{ marginTop: '15px' }}
                            >
                                <IonInputPasswordToggle slot="end" />
                            </IonInput>
                            <IonInput
                                label="Confirm Password"
                                labelPlacement="stacked"
                                fill="outline"
                                type="password"
                                placeholder="Confirm Password"
                                value={confirmPassword}
                                onIonChange={(e) => setConfirmPassword(e.detail.value!)}
                                style={{ marginTop: '15px' }}
                            >
                                <IonInputPasswordToggle slot="end" />
                            </IonInput>

                            <IonButton expand="block" shape="round" style={{ marginTop: '25px' }} onClick={handleOpenVerificationModal}>
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

                {/* Alert */}
                <IonAlert
                    isOpen={showAlert}
                    onDidDismiss={() => setShowAlert(false)}
                    header="Registration Error"
                    message={alertMessage}
                    buttons={['OK']}
                />

                {/* Verification Modal */}
                <IonModal isOpen={showVerificationModal} onDidDismiss={() => setShowVerificationModal(false)}>
                    <IonContent className="ion-padding">
                        <IonCard style={{ marginTop: '25%' }}>
                            <IonCardContent>
                                <IonTitle>User Registration Details</IonTitle>
                                <IonText>
                                    <p><strong>Username:</strong> {username}</p>
                                    <p><strong>Email:</strong> {email}</p>
                                    <p><strong>Name:</strong> {firstName} {lastName}</p>
                                </IonText>
                                <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '20px' }}>
                                    <IonButton fill="clear" onClick={() => setShowVerificationModal(false)}>Cancel</IonButton>
                                    <IonButton color="primary" onClick={doRegister}>Confirm</IonButton>
                                </div>
                            </IonCardContent>
                        </IonCard>
                    </IonContent>
                </IonModal>

                {/* Success Modal */}
                <IonModal isOpen={showSuccessModal} onDidDismiss={() => setShowSuccessModal(false)}>
                    <IonContent className="ion-padding" style={{ textAlign: 'center', marginTop: '35%' }}>
                        <IonText color="success"><h2>Registration Successful!</h2></IonText>
                        <p>You can now log in with your credentials.</p>
                        <IonButton expand="block" shape="round" routerLink="/it35-lab">Go to Login</IonButton>
                    </IonContent>
                </IonModal>
            </IonContent>
        </IonPage>
    );
};

export default Register;
import {
  IonButtons,
  IonContent,
  IonHeader,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar
} from '@ionic/react';

const About: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot='start'>
            <IonMenuButton></IonMenuButton>
          </IonButtons>
          <IonTitle>About</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen className="ion-padding">
        <h2>Welcome to <strong>MingkApp</strong> <br></br>A Purr-fect Place for Cat Lovers! 🐱</h2>
        <p>Love cats? So do we! 🐾 <br></br> MingkApp is your ultimate space to share, explore, and enjoy the funniest and cutest cat memes on the internet. Whether you’re here for the laughs or just need your daily dose of feline cuteness, we got you covered! 😺</p>

        <div style={{ display: "flex", justifyContent: "center", marginTop: "10px" }}>
          <img
            src={"https://i.pinimg.com/originals/19/58/42/1958429a6d0e485c0f68a4551ffab742.gif?nocache=" + new Date().getTime()} 
            alt="Cute"
            style={{ width: "50%", maxWidth: "300px", display: "block", imageRendering: "crisp-edges" }}
          />
        </div>

        <p><strong>🐱 Share your favorite cat memes!</strong></p>
        <p><strong>😹 Laugh at the funniest feline moments!</strong></p>
        <p><strong>📸 Upload and save the cutest cat pictures!</strong></p>

        <p>Join our cat-loving community and let’s spread the meowsitivity! 😻</p>
      </IonContent>

    </IonPage>
  );
};

export default About;
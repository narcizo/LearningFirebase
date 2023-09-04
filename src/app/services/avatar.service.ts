import { Injectable } from '@angular/core';
import { Auth, User } from '@angular/fire/auth';
import { doc, docData, DocumentReference, DocumentData, setDoc, getFirestore } from '@angular/fire/firestore';
import { getDownloadURL, ref, Storage, uploadString } from '@angular/fire/storage';
import { Photo } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class AvatarService {
  // user: User | null;

  constructor(
    private auth: Auth,
    // private firestore: Firestore,
    private storage: Storage,
  ) { 
    // this.user = this.auth.currentUser;
    // this.firestore = getFirestore();
  }

  getUserProfile() {
    const user = this.auth.currentUser;
    console.log('user: ', user);
    console.log(`users/${user!.uid}`);

    // console.log('firestore: ', this.firestore);
    console.log('getFirestore: ', getFirestore());


    // acessar documento 
    // TODO concertar essa linha
    const userDocRef = doc(getFirestore(), `/users/${user!.uid}`);
    // console.log('doc: ', userDocRef);

    // return docData(userDocRef);
  }

  async uploadImage(cameraFile: Photo){
    const user = this.auth.currentUser;
    const path = `uploads/${user!.uid}/profile.png`;
    const storageRef = ref(this.storage, path);

    try {
      await uploadString(storageRef, cameraFile.base64String!, 'base64');

      const imageUrl = await getDownloadURL(storageRef);
      // const userDocRef = doc(this.firestore, `users/${user!.uid}`);
      // await setDoc(userDocRef, {
      //   imageUrl,
      // });
      return true;

    } catch (error) {
      console.log("Error: ", error);
      return null;
    }
  }

  // getUserDocRef(user: User | null){
  //   console.log('user: ', user);
  //   console.log('fire: ',this.firestore)
  //   const doc1 = doc(this.firestore, `users/${user!.uid}`);

  //   console.log('codk1: ',doc1)

  //   return doc(this.firestore, `users/${user!.uid}`);
  // }
}

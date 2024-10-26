import { Injectable } from '@nestjs/common';
import * as firebaseAccount from '../FirebaseAccount.json';
import * as firebaseAdmin from 'firebase-admin';


@Injectable()
export class FirebaseService {

    firebaseApp: firebaseAdmin.app.App;

    constructor() {
        console.log('FirebaseService');
        this.firebaseApp =  firebaseAdmin.initializeApp({
            credential: firebaseAdmin.credential.cert(firebaseAccount as firebaseAdmin.ServiceAccount)
        })
    }

    async verifyToken(token: string): Promise<boolean> {
        try {
            await this.firebaseApp.auth().verifyIdToken(token);
            return true;
        } catch(e){
            return false;
        }

    }

}
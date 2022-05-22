import { Body, Injectable } from "@nestjs/common"

const admin = require("firebase-admin");

const serviceAccount = require("./path/to/serviceAccountKey.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

@Injectable()
export class AuthService {
    async login(@Body() body) {
      const idToken = body.idToken.toString();
      const expiresIn = 60 * 60 * 24 * 5 * 1000;

      return admin
          .auth()
          .createSessionCookie(idToken, {expiresIn})
    }

    async signup(@Body() body: { name: string, email: string, password: string }) {
      const {name, email, password} = body;
      return admin.auth().createUser({
          email: email,
          password: password,
          displayName: name,
      })
    }

    async profile(cookies) {
      const sessionCookie = cookies.session || "";
      return admin.auth().verifySessionCookie(sessionCookie)
    }
}
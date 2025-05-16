import admin, { auth } from 'firebase-admin';
import { FirebaseAuthError } from 'firebase-admin/auth';
import { NextResponse, NextRequest } from 'next/server';

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    }),
    databaseURL: process.env.FIREBASE_DATABASE_URL,
  });
}

export const POST = async (request: NextRequest) => {
  try {
    const body = await request.json();
    const { name, password, email } = body;

    if (!name || !password || !email) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      );
    }

    const user = await auth().createUser({
      email,
      password,
      displayName: name,
    });

    return NextResponse.json(
      { message: 'User registered successfully' },
      { status: 200 }
    );
  } catch (error) {
    if (error instanceof FirebaseAuthError)
      if (error.code === 'auth/email-already-exists') {
        return NextResponse.json(
          { error: 'Email is already in use!' },
          { status: 400 }
        );
      }

    return NextResponse.json(
      { error: (error as Error).message || 'Unknown error occurred' },
      { status: 500 }
    );
  }
};

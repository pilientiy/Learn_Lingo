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
    const { idToken } = body;

    if (!idToken) {
      return NextResponse.json(
        { error: 'ID Token is required' },
        { status: 400 }
      );
    }

    const decodedToken = await auth().verifyIdToken(idToken);
    const user = await auth().getUser(decodedToken.uid);

    return NextResponse.json({ message: 'Login successful' }, { status: 200 });
  } catch (error) {
    if (error instanceof FirebaseAuthError) {
      switch (error.code) {
        case 'auth/id-token-expired':
          return NextResponse.json(
            { error: 'Token has expired.' },
            { status: 401 }
          );

        case 'auth/id-token-revoked':
          return NextResponse.json(
            { error: 'Token has been revoked.' },
            { status: 401 }
          );

        case 'auth/invalid-id-token':
          return NextResponse.json(
            { error: 'Invalid token.' },
            { status: 400 }
          );

        case 'auth/argument-error':
          return NextResponse.json(
            { error: 'Token is missing or malformed.' },
            { status: 400 }
          );

        case 'auth/user-disabled':
          return NextResponse.json(
            { error: 'This user account has been disabled.' },
            { status: 403 }
          );

        case 'auth/user-not-found':
          return NextResponse.json(
            { error: 'No user found with this token.' },
            { status: 404 }
          );

        default:
          return NextResponse.json(
            { error: 'Unknown error occurred during login.' },
            { status: 500 }
          );
      }
    }

    return NextResponse.json(
      { error: (error as Error).message || 'Unknown error occurred' },
      { status: 500 }
    );
  }
};

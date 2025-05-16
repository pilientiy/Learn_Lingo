import admin from 'firebase-admin';
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

export const GET = async (request: NextRequest) => {
  try {
    const token = request.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;

    const db = admin.database();
    const userRef = db.ref(`users/${uid}/favorites`);
    const snapshot = await userRef.once('value');
    const favorites = snapshot.val() || [];

    if (favorites.length === 0) {
      return NextResponse.json({ favorites: [] }, { status: 200 });
    }

    const teacherRef = db.ref('teachers');
    const teacherPromises = favorites.map((id: string) =>
      teacherRef.child(id).once('value')
    );
    const teacherSnapshots = await Promise.all(teacherPromises);
    const teacherData = teacherSnapshots.map((snap) => snap.val());

    return NextResponse.json({ favorites: teacherData }, { status: 200 });
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};

export const POST = async (request: NextRequest) => {
  try {
    const token = request.headers.get('Authorization')?.split(' ')[1];

    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const decodedToken = await admin.auth().verifyIdToken(token);
    const uid = decodedToken.uid;

    const { teacherId } = await request.json();

    if (!teacherId) {
      return NextResponse.json(
        { error: 'No teacher ID provided' },
        { status: 400 }
      );
    }

    const db = admin.database();
    const userFavoritesRef = db.ref(`users/${uid}/favorites`);
    const snapshot = await userFavoritesRef.once('value');
    const favorites = snapshot.val() || [];

    let updatedFavorites;
    if (Array.isArray(favorites) && favorites.includes(teacherId)) {
      updatedFavorites = favorites.filter((id: string) => id !== teacherId);
    } else {
      updatedFavorites = [...favorites, teacherId];
    }

    await userFavoritesRef.set(updatedFavorites);

    const teachersRef = db.ref('teachers');
    const teachersSnapshot = await teachersRef.once('value');
    const teachersData = teachersSnapshot.val() || [];

    const selectedTeachers = updatedFavorites.map(
      (id: string) => teachersData[id]
    );

    return NextResponse.json(
      { updatedFavorites: selectedTeachers },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
};

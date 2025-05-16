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
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '4');

    const startIndex = (page - 1) * limit;

    const db = admin.database();
    const ref = db.ref('teachers');
    const snapshot = await ref.once('value');
    const teachersData = snapshot.val() || [];

    const teachers = Object.values(teachersData);

    if (teachers.length === 0) {
      return NextResponse.json(
        { teachers: [], totalPages: 0 },
        { status: 200 }
      );
    }

    const totalCount = teachers.length;
    const totalPages = Math.ceil(totalCount / limit);
    const paginatedTeachers = teachers.slice(startIndex, startIndex + limit);

    return NextResponse.json(
      { teachers: paginatedTeachers, totalPages },
      { status: 200 }
    );
  } catch (error) {
    return new Response('Internal Server Error', { status: 500 });
  }
};

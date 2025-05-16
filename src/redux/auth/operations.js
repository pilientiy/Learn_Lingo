import { createAsyncThunk } from "@reduxjs/toolkit";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut , updateProfile, onAuthStateChanged} from "firebase/auth";
import { auth } from "../../services/firebase";


export const registerUser = createAsyncThunk(
  'auth/register',
  async ({email, password, name}, {rejectWithValue}) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(userCredential.user, { displayName: name });
      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: name,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);
export const logInUser = createAsyncThunk(
  'auth/login',
  async ({email, password}, {rejectWithValue}) => {
    try {
        const userCredential = await signInWithEmailAndPassword(auth, email, password);
      return {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName,
      };
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const logOutUser = createAsyncThunk('auth/logout', async (_,rejectWithValue) => {
  try {
    await signOut(auth);
    return null;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const checkAuthState = createAsyncThunk("auth/checkAuthState", async () => {
  return new Promise(resolve => {
    onAuthStateChanged(auth, user => {
      if (user) {
        resolve({
          uid: user.uid,
          email: user.email,
          displayName: user.displayName,
        });
      } else {
        resolve(null);
      }
    });
  });
});

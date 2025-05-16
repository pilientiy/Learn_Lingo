<h1>Learn Lingo Application</h1>

<h2>Project Overview</h2>

Learn Lingo is a web application designed for a company offering online language teacher services. The app allows users to browse a list of teachers, filter them based on specific criteria, add teachers to favorites, and book trial lessons. The application includes user authentication, a modern design, and integration with Firebase for real-time data management.

<h3>Features</h3>

The application consists of three main pages and several advanced features:

1. ***Home Page:***
   - Displays the company's advantages and benefits.
   - Includes a call-to-action link redirecting users to the "Teachers" page.
2. ***Teachers Page:***
   - Lists language teachers with detailed cards (name, surname, languages, levels, rating, price per hour, etc.).
   - Supports pagination: initially renders 4 teacher cards with a "Load more" button to fetch additional teachers.
   - Allows filtering teachers by: language; level of language (e.g., A1, B2); price per hour.
   - Clicking "Read more" expands the card to show additional details (experience, reviews).
   - Clicking "Book trial lesson" opens a modal form for booking a trial lesson.
3. ***Favorites Page (Private):***
    - Accessible only to authenticated users.
    - Displays a list of teachers added to the user's favorites.
4. ***Authentication:***
    - Registration, login, logout, and user state persistence using Firebase Authentication.
    - Forms for registration/login with validation using react-hook-form and yup.
5. ***Favorites Functionality:***
    - Authenticated users can add/remove teachers to/from favorites by clicking a heart icon.
    - Non-authenticated users receive a modal notification prompting them to log in.
    - Favorites are stored in Firebase Realtime Database under the user's profile.
    - The heart icon changes color based on the teacher's favorite status, preserved across page reloads.
6. ***Trial Lesson Booking:***
    - Modal form for booking a trial lesson, built with react-hook-form and yup for validation.
7. ***Theme Switching:***
    - Supports 5 different color themes using React Context.
    - Theme preference is saved in localStorage and applied via a data-theme attribute on the html element.
  
      
<h3>Technologies:</h3> 

* ***Framework:*** React for building the user interface.
* ***State Management:*** Redux Toolkit: for handling teachers, favorites, and authentication.
* ***Routing:*** React Router: For client-side routing between pages (Home, Teachers, Favorites).
* ***Firebase: ***
   -  Firebase Authentication: For user registration, login, logout, and state management.
    - Firebase Realtime Database: Stores teacher data and user favorites.
* ***React Hook Form & Yup:*** For form handling and validation (login, registration, trial lesson booking).
* ***LocalStorage*** For persisting theme preferences.
* ***CSS Modules:*** For styling components with scoped CSS.

<h3>Development Standards</h3>

-  Deployment: The project is deployed on vercel.com

<h3>Usage:</h3>

* ***Home Page:***   Visit / to see the company's advantages and click the CTA to navigate to the Teachers page.
* ***Teachers Page:***  Visit /teachers to browse teachers, filter them, and interact with their cards.
* ***Favorites Page:***  Visit /favorites (requires authentication) to view your favorite teachers.
* ***Authentication:***  Register or log in via the modal form to access favorites and book lessons.
* ***Theme Switching:*** Toggle between light and dark themes using the theme switcher (if implemented in the UI).


<h2>Getting Started</h2>

<h3>Installation</h3>

Install dependencies:

```
npm install
```
Start the development server:

```
npm run dev
```


<h2>Author</h2>
Created by Filip Kavaleu.

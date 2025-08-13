# Firebase Firestore Security Rules

Copy and paste these rules into your Firebase Console > Firestore Database > Rules:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Public read access to articles, authenticated admin write access
    match /articles/{article} {
      allow read: if true; // Public can read articles
      allow create, update, delete: if request.auth != null && 
        (request.auth.token.email == "pedro.lodi.adv@gmail.com" || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.role == "admin");
    }
    
    // User documents - users can read their own data
    match /users/{user} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == user || request.auth.token.email == "pedro.lodi.adv@gmail.com");
    }
  }
}
```

## Steps to Configure:

1. Go to https://console.firebase.google.com/
2. Select your project: lodiadvocacia-79fd5
3. Go to Firestore Database > Rules
4. Replace the existing rules with the rules above
5. Click "Publish"

## Create Admin User:

1. Go to Authentication > Users
2. Click "Add user"
3. Email: pedro.lodi.adv@gmail.com
4. Password: ph230570
5. Save the user

## Create User Document (Optional):

In Firestore Database > Data:
1. Create collection: users
2. Document ID: [the UID of the user created above]
3. Add fields:
   - email: "pedro.lodi.adv@gmail.com"
   - role: "admin"
   - username: "Pedro Lodi"
# Vibe Match Blueprint

## Project Overview

This blueprint outlines the structure and core logic of the Vibe Match application, a college social matching app built on Firebase Firestore.

### Project Structure
Vibe Match is a college social matching application utilizing Firebase Firestore. The core functionality revolves around matching students based on compatibility scores derived from their profile answers. To ensure fast lookups, compatibility scores are pre-calculated and stored in a dedicated `matchFinal` collection.

## Firestore Collections

### Collection: `users`

Each document in the `users` collection represents a single student user.

**Schema:**

```
json
{
  "uid": "string",
  "name": "string",
  "email": "string",
  "photoURL": "string",
  "year": 1,
  "department": "string",

  "personalityType": "introvert" | "extrovert" | "ambivert",
  "connectionGoal": ["studyBuddy", "eventCompanion", "newFriends", "specialConnection"],
  "communicationStyle": "chatty" | "thoughtful" | "humorous" | "direct",
  "energyLevel": "high" | "balanced" | "low",
  "openness": "lovesNew" | "somewhatOpen" | "prefersRoutine",

  "secretKeeping": "good" | "average" | "bad",
  "foodie": "yes" | "no",
  "weekendPlans": "netflixChill" | "party",
  "likesPet": "yes" | "no",
  "sleepPattern": "earlyBed" | "lateNight",
  "weatherChoice": "rain" | "sunshine",
  "nameMemory": "forgetName" | "wrongName",
  "privateExpression": "dance" | "sing",
  "speakingStyle": "blurtOut" | "thinkTwice",
  "fantasyChoice": "famousOneDay" | "invisibleOneDay",
  "kissOrSlap": "kiss" | "slap"
}
```
**Example Document:**
```
json
{
  "uid": "student123",
  "name": "Alice Smith",
  "email": "alice.smith@college.edu",
  "photoURL": "https://example.com/alice.jpg",
  "year": 3,
  "department": "Computer Science",

  "personalityType": "extrovert",
  "connectionGoal": ["newFriends", "eventCompanion"],
  "communicationStyle": "chatty",
  "energyLevel": "high",
  "openness": "lovesNew",

  "secretKeeping": "good",
  "foodie": "yes",
  "weekendPlans": "party",
  "likesPet": "yes",
  "sleepPattern": "lateNight",
  "weatherChoice": "sunshine",
  "nameMemory": "forgetName",
  "privateExpression": "dance",
  "speakingStyle": "blurtOut",
  "fantasyChoice": "famousOneDay",
  "kissOrSlap": "kiss"
}
```
### Collection: `matchFinal`

Each document in the `matchFinal` collection stores the pre-calculated compatibility score for a pair of users. Two documents are stored for each pair (userA to userB and userB to userA) to facilitate quick lookups from either user's perspective.

**Schema:**
```
json
{
  "userA": "uid_of_person_viewing",
  "userB": "uid_of_matched_person",
  "score": 0,
  "userB_name": "string",
  "userB_photoURL": "string"
}
```
**Example Documents (for userA: student123 and userB: student456):**
```
json
{
  "userA": "student123",
  "userB": "student456",
  "score": 42,
  "userB_name": "Bob Johnson",
  "userB_photoURL": "https://example.com/bob.jpg"
}
json
{
  "userA": "student456",
  "userB": "student123",
  "score": 42,
  "userB_name": "Alice Smith",
  "userB_photoURL": "https://example.com/alice.jpg"
}
```
## Match Score Calculation

The `calculateMatchScore` function determines the compatibility between two users based on the provided weighting system.

```
javascript
function calculateMatchScore(userA, userB) {
  let score = 0;

  if (userA.personalityType === userB.personalityType) score += 3;

  const commonGoals = userA.connectionGoal.filter(g => userB.connectionGoal.includes(g));
  score += commonGoals.length * 3;

  if (userA.communicationStyle === userB.communicationStyle) score += 2;
  if (userA.energyLevel === userB.energyLevel) score += 2;
  if (userA.openness === userB.openness) score += 2;

  const funFields = [
    "secretKeeping", "foodie", "weekendPlans", "likesPet", "sleepPattern",
    "weatherChoice", "nameMemory", "privateExpression", "speakingStyle",
    "fantasyChoice", "kissOrSlap"
  ];

  funFields.forEach(f => {
    if (userA[f] === userB[f]) score += 1;
  });

  return score;
}
```
## Populating `matchFinal` Collection

When a user's profile is created or updated, the system should iterate through all other users, calculate the match score using `calculateMatchScore`, and store the resulting pair documents in the `matchFinal` collection. This pre-computation ensures that match lookups are fast and efficient.
```
javascript
async function populateMatchFinal(db) {
  const usersSnapshot = await db.collection('users').get();
  const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

  for (let i = 0; i < users.length; i++) {
    for (let j = i + 1; j < users.length; j++) {
      const userA = users[i];
      const userB = users[j];

      const score = calculateMatchScore(userA, userB);

      // Create document for userA viewing userB
      await db.collection('matchFinal').add({
        userA: userA.uid,
        userB: userB.uid,
        score: score,
        userB_name: userB.name,
        userB_photoURL: userB.photoURL
      });

      // Create document for userB viewing userA
      await db.collection('matchFinal').add({
        userA: userB.uid,
        userB: userA.uid,
        score: score,
        userB_name: userA.name,
        userB_photoURL: userA.photoURL
      });
    }
  }
}
```
**Note:** This is a basic example. In a production environment, you would want to handle updates more efficiently (e.g., using Firebase Functions triggered by user profile changes) and potentially implement batch writes for performance.

## Firestore Query Examples

These examples demonstrate how to query the `matchFinal` collection to retrieve users based on their compatibility score with the current user (`myUid`).

### Get People With Your Vibe (top matches)
```
javascript
// Assuming 'db' is your initialized Firestore instance and 'myUid' is the current user's UID
db.collection("matchFinal")
  .where("userA", "==", myUid)
  .orderBy("score", "desc")
  .limit(20)
  .get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, "=>", doc.data());
    });
  })
  .catch((error) => {
    console.error("Error getting top matches: ", error);
  });
```
### Get People With Opposite Vibe (lowest matches)
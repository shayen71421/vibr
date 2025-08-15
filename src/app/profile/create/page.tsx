"use client";

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { db, auth } from '../../utils/firebase';
import { doc, setDoc } from 'firebase/firestore';

const ProfileCreationPage = () => {
  const [name, setName] = useState('');
  const [year, setYear] = useState(1);
  const [department, setDepartment] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
 the current authenticated user
    const user = auth.currentUser;

    if (user) {
      try {
        // Save profile data to Firestore
        await setDoc(doc(db, 'users', user.uid), {
          uid: user.uid,
          name,
          year,
          department,
          // Add other profile fields here with default or initial values
          personalityType: '', // Example initial value
          connectionGoal: [], // Example initial value
          communicationStyle: '', // Example initial value
          energyLevel: '', // Example initial value
          openness: '', // Example initial value
          secretKeeping: '', // Example initial value
          foodie: '', // Example initial value
          weekendPlans: '', // Example initial value
          likesPet: '', // Example initial value
          sleepPattern: '', // Example initial value
          weatherChoice: '', // Example initial value
          nameMemory: '', // Example initial value
          privateExpression: '', // Example initial value
          speakingStyle: '', // Example initial value
          fantasyChoice: '', // Example initial value
          kissOrSlap: '', // Example initial value
          // Add other fields from your schema with initial values
        });

        console.log('Profile created successfully!');
        // Redirect to a profile view page or home page
        router.push('/'); // Redirect to home page
      } catch (error) {
        console.error('Error creating profile:', error);
        // Handle error (e.g., display an error message to the user)
      }
    } else {
      console.error('No user is signed in.');
      // Handle case where no user is signed in (e.g., redirect to sign-in page)
    }
  };

  // Add this line to use the useRouter hook
  const router = useRouter();
  return (
    <div>
      <h1>Create Profile</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="year">Year:</label>
          <select
            id="year"
            value={year}
            onChange={(e) => setYear(parseInt(e.target.value, 10))}
            required
          >
            {[1, 2, 3, 4].map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>
        <button type="submit">Create Profile</button>
      </form>
    </div>
  );
};

export default ProfileCreationPage;
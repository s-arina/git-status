import { db } from './Firebase';
import {
  doc,
  updateDoc,
  deleteDoc,
} from 'firebase/firestore';

const uid =  window.localStorage.getItem('uid');

export const handleEditDesc = async (goal, description) => {
  await updateDoc(
    doc(
      db,
      'allUsers',
      uid,
      'userGoals',
      goal.id
    ),
    { description: description }
  ); 
};

export const handleEditDeadline = async (goal, deadline) => {
  await updateDoc(
    doc(
      db,
      'allUsers',
      uid,
      'userGoals',
      goal.id
    ),
    { deadline: deadline }
  );
};

export const handleEditTitle = async (goal, title) => {
  await updateDoc(
    doc(
      db,
      'allUsers',
      uid,
      'userGoals',
      goal.id
    ),
    { title: title }
  );
};

export const handleEditProgress = async (goal, progress) => {
  await updateDoc(
    doc(
      db,
      'allUsers',
      uid,
      'userGoals',
      goal.id
    ),
    { goalProgress: progress }
  ); 
};


export const toggleComplete = async (goal) => {
  await updateDoc(
    doc(
      db,
      'allUsers',
      uid,
      'userGoals',
      goal.id
    ),
    { completed: !goal.completed }
  );
  // await updateDoc(
  //   doc(
  //     db,
  //     'allUsers',
  //     uid,
  //     'userBadges',
  //     goal.id // this field needs to be updated 
  //   ),
  //   { earned: !goal.completed }
  // );
  // to also toggle the userBadges doc, you need to pick
  // up the userBadges id somewhere and store on state
};
export const handleDelete = async (id) => {
  await updateDoc(
    doc(db, 'allUsers', uid, 'userGoals', id),
    { deleted: true }
  );
  // await deleteDoc(
  //   doc(db, 'allUsers', uid, 'userBadges', id)
  // );
  // to also delete the userBadges doc, you need to pick
  // up the userBadges id somewhere and store on state
};



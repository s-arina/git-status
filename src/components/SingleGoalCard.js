import '../css/SingleGoalCard.css';
import {useState} from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faPenToSquare, faTrashCan } from '@fortawesome/free-solid-svg-icons'
// delete and edit buttons inside single goal card

const SingleGoalCard = ({ goal, toggleComplete, handleDelete, handleEditDesc, handleEditDeadline }) => {
  const [newDescription, setNewDescription] = useState(goal.description);
  const [newDeadline, setNewDeadline] = useState(goal.deadline);

  const handleChangeDesc = (e) => {
    e.preventDefault();
    if (goal.completed === true) {
      setNewDescription(goal.description);
    } else {
      goal.description = '';
      setNewDescription(e.target.value);
    }
  };

  const handleChangeDeadline = (e) => {
    e.preventDefault();
    if (goal.completed === true) {
      setNewDeadline(goal.deadline);
    } else {
      setNewDeadline(e.target.value);
    }
  };

  return (
    <div className='single-goal-card'>
      <input className='goal-input'
        style={{ textDecoration: goal.completed && 'line-through' }}
        type='text'
        value={goal.description === '' ? newDescription : goal.description}
        onChange={(e) => {
          handleChangeDesc(e)
        }}
      />
        <input className='date-input'
        type='date'
        value={goal.deadline}
        onChange={(e)=> {
          handleChangeDeadline(e)
          handleEditDeadline(goal, newDeadline)
        }}
      />

      <button className='button-complete' onClick={() => toggleComplete(goal)}>
      <FontAwesomeIcon icon={faCircleCheck} size='2x' />
      </button>

      <button
        className='button-edit'
        onClick={() => {
          handleEditDesc(goal, newDescription)
        }}
      >
       <FontAwesomeIcon icon={faPenToSquare} size='2x'/>
      </button>

      <button className='button-delete' onClick={() =>handleDelete(goal.id)}>
      <FontAwesomeIcon icon={faTrashCan} size='2x'/>
      </button>
    </div>
  );
}

export default SingleGoalCard;

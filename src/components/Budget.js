import React, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';

const Budget = () => {
  const { budget,dispatch } = useContext(AppContext);
  const [newBudget, setNewBudget] = useState(budget);

  const handleBudgetChange = (event) => {
    const enteredValue = event.target.value;

    // Validate input, ensuring numeric value and upper limit:
    if (isNaN(enteredValue) || parseFloat(enteredValue) < 0) {
      return; // Ignore invalid input
    }

    const parsedValue = parseFloat(enteredValue); // Convert to number
    const clampedValue = Math.min(Math.max(parsedValue, 0), 20000); // Clamp to the valid range

    // Update AppContext context value only if clampedValue differs:
    if (clampedValue !== budget) {
        setNewBudget(clampedValue);
        dispatch({ type: 'SET_BUDGET', payload: clampedValue }); // Dispatch action
      }
  };

  return (
    <div className='alert alert-secondary'>
      <span>Budget: £{budget}</span>
      <input
        type="number"
        step="10"
        min={0} // Set minimum value to 0
        max={20000} // Set maximum value to 20k
        value={newBudget}
        onChange={handleBudgetChange}
      />
    </div>
  );
};

export default Budget;
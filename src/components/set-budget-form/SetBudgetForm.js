import React from "react";
import { RxReset } from "react-icons/rx";
import SetBudgetFormstyles from "./setBudgetFormStyles";

const SetBudgetForm = ({
  remainder,
  onSetBudget,
  onSetHaveSpent,
  budget,
  onHandleReset,
}) => {
  return (
    <SetBudgetFormstyles>
      <p id={!budget ? "hidden" : "p"}>${remainder}</p>
      <form className="form">
        <input
          className={budget > 0 ? "hidden" : ""}
          placeholder="Set a budget..."
          // className={haveSpent > budget ? "negative" : "green"}
          type="number"
          name="budget"
        />

        <button
          onClick={onSetBudget}
          className={budget > 0 ? "hidden" : "set-button"}
        >
          Set
        </button>

        <input
          className="spent-input"
          type="number"
          name="itemCost"
          placeholder="How much have you spent?"
        />

        <input
          type="text"
          name="itemName"
          placeholder="What did you spend it on?"
        />
        <button
          className={budget === 0 ? "hidden" : "update-button"}
          onClick={onSetHaveSpent}
        >
          Update
        </button>
      </form>
      <button className="reset-button" onClick={onHandleReset}>
        <RxReset />
      </button>
    </SetBudgetFormstyles>
  );
};

export default SetBudgetForm;

import { useCallback, useMemo, useState } from "react";
import TitleBar from "./components/TitleBar";
import SetBudgetForm from "./components/SetBudgetForm";
// import "./fonts.css";

export default function App() {
  const [budget, setBudget] = useState(0);
  const [haveSpent, setHaveSpent] = useState([]);

  const remainder = useMemo(() => {
    const totalSpent = haveSpent.reduce(
      (acc, cur) => Number(acc) + Number(cur.cost),
      0
    );
    return (Number(budget) - totalSpent).toFixed(2);
  }, [budget, haveSpent]);

  const handleSetBudget = (e) => {
    e.preventDefault();
    const budgetValue = Number(e.currentTarget.form.budget.value);
    if (!budgetValue || budgetValue === "0") return;

    setBudget(budgetValue.toFixed(2));
  };

  const handleSetHaveSpent = useCallback(
    (e) => {
      e.preventDefault();
      const itemValue = Number(e.currentTarget.form.itemCost.value);
      const itemName = e.currentTarget.form.itemName.value;
      const newItem = {
        cost: itemValue.toFixed(2),
        name: itemName,
      };

      if (!itemValue || !itemName) return;

      setHaveSpent(haveSpent.concat([newItem]));
    },
    [haveSpent]
  );

  function deleteItem() {}

  return (
    <div className="main-app">
      <TitleBar />
      <div className="main-content">
        <SetBudgetForm
          budget={budget}
          remainder={remainder}
          haveSpent={haveSpent}
          onSetBudget={handleSetBudget}
          onSetHaveSpent={handleSetHaveSpent}
        />
        <ItemList haveSpent={haveSpent} deleteItem={deleteItem} />
      </div>
    </div>
  );
}

function ItemList({ haveSpent, deleteItem }) {
  return (
    <div className="item-list">
      <br />
      {haveSpent.map((item, index) => {
        return (
          <div className="items" key={item.name + index}>
            <p className="p">
              {index + 1}. {item.name}: ${item.cost}
            </p>
            <button onClick={deleteItem} className="close">
              &times;
            </button>
          </div>
        );
      })}
    </div>
  );
}

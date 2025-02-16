
import List from './ULlist';


function App({ groceries, setGroceries, handleCheck, binHandler }) {





  return (
    <>
      {groceries.length ? (
        // Check if there are items in the groceries list
        <List groceries={groceries} setGroceries={setGroceries} handleCheck={handleCheck} binHandler={binHandler} />
      )
        : (
          <h1>No Items in the List</h1> // Render this when the list is empty
        )}
    </>
  );

}





// import { useState } from "react";

// function App() {

//   const [todoState, setTodoState] = useState([
//     { id: 1, title: "Buy Milk", isCompleted: false },
//     { id: 2, title: "Buy Bread", isCompleted: true },
//     { id: 3, title: "Buy Coffiee", isCompleted: true },
//     { id: 4, title: "Buy Flower", isCompleted: false }
//   ]);
//   function Addrandom() {
//     const randomId = Math.floor(Math.random() * 1000);
//     const randomTitle = "Random Title " + randomId;
//     const randomIsCompleted = Math.random() > 0.5;
//     const newTodo = { id: randomId, title: randomTitle, isCompleted: randomIsCompleted };
//     setTodoState([...todoState, newTodo]);
//   }

//   return (

//     <div>
//       <button onClick={Addrandom}>Add Random Todo</button>
//       {todoState.map((todo) => <TodoCreate key={todo.id} id={todo.id} title={todo.title} isCompleted={todo.isCompleted} />)}  </div>
//   )

// }

// function TodoCreate(props) {
//   return (
//     <div id={props.key} style={{ backgroundColor: props.isCompleted ? "green" : "red" }}>
//       <h1>{props.id} : {props.title}</h1>
//     </div>
//   )
// }





// function CustomButton(props) {

//   function onClickhandler() {
//     props.setCount(props.count + 1);
//     console.log("Button Clicked");
//   }

//   return (
//     <button onClick={onClickhandler}> Count: {props.count}</button>

//   );
// }

export default App

import React, { useState, useEffect } from "react";
import "./App.css";

// Composant
import Task from "../../Components/Task/Task";

function App() {

  // States
  const [tasks, setTasks] = useState([
    {
      content : 'Faire la vaisselle',
      done: false
    },
    {
      content : 'Faire la cuisine',
      done: true
    }
  ])

  const [newTask, setNewTask] = useState(false);

  const [input, setInput] = useState('');

  // Methodes
   const removeClickedHandler = index => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);

   }

   const checkClickedHandler = index => {
    const newTasks = [...tasks];
    newTasks[index].done= !tasks[index].done;
    setTasks(newTasks);

   }

   // empêcher l'envoie du formulaire

   const submittedTaskHandler = event => {
    event.preventDefault();
    if (input!=''){
      const newTask = {
        content: input,
        done: false
      }
      setTasks([...tasks, newTask]);

    }

   
   }

   const changedFormHandler = event => {
    setInput(event.target.value);
   }


   
  // Variables
  let cartes = tasks.map ( (task, index) =>(
    <Task
    key={index}
    done={task.done}
    content={task.content}
    delete={() => removeClickedHandler(index)}
    doneClicked={() => checkClickedHandler(index)}
   >
      

    </Task>
  ));
  // let donedTasks = tasks.filter(task => task.done).map(
  //   (filteredTask, index) =>(
  //     <Task
  //     key={index}
  //     done={filteredTask.done}
  //     content={filteredTask.content}
  //     delete={() => removeClickedHandler(index)}
  //     doneClicked={() => checkClickedHandler(index)}
  //    >
  //     </Task>
  // ));

  return (
    <div className="App">
      <header>
        <span>TO-DO</span>
      </header>

      <div className="add">
        <form onSubmit={(e) => submittedTaskHandler(e)}>
          <input value={input} onChange={(e) => changedFormHandler(e)} type="text"  placeholder="Que souhaitez-vous ajouter ?" />
          <button type="submit">Ajouter</button>
        </form>
      </div>

      <div className="tasks">
        {cartes}
      

      </div>
    </div>
  );
}

export default App;

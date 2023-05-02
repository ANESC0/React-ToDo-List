import React, { useState, useEffect, Fragment, useRef } from "react";
import "./App.css";
import axios from '../../axios-firebase';

// Composant
import Task from "../../Components/Task/Task";
import Spinner from '../../Components/Spinner/Spinner';

function App() {

  // States
  const [tasks, setTasks] = useState([])
  const [newTasks, setNewTasks] = useState([])
  const [input, setInput] = useState('');
  const [chargement, setChargement] = useState(false);


  // Ref
  const inputRef = useRef('');

  // Cycle de vie
  

  useEffect(() => {
    fetchTasks();

    inputRef.current.focus()

    
  }, []);


  // Methodes
   const removeClickedHandler = index => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);
    setTasks(newTasks);

    axios.delete('tasks/' + tasks[index].id + '.json')
    .catch(error => {
      console.log(error)

    })

   }

   const checkClickedHandler = index => {
    const newTasks = [...tasks];
    newTasks[index].done= !tasks[index].done;
    setTasks(newTasks);

    axios.put('tasks/' + newTasks[index].id + '.json', newTasks[index])
    .then(response => {
      console.log(response);
      fetchTasks();
    })
    .catch(error => {
      console.log(error)

    })

    

   }

    /**
    *  Ajouter des taches
    * 
    */
   // empêcher l'envoie du formulaire
   

   const submittedTaskHandler = event => {
    event.preventDefault();
    if (input!=''){
      const nextTask = {
        content: input,
        done: false
      }
      setInput('');

      axios.post('tasks.json', nextTask)
      .then(response => {
        console.log(response)
        fetchTasks();

    
      })
      .catch(error => {
        console.log(error)
  
      });
      

    }
   }

   /**
    * Récupérer les tâches
    * 
    */
   const fetchTasks = () => {
    setChargement(true);
    axios.get('tasks.json')
    .then(response => {
     const newTasks = [];
     const donedTasks =[];
     for (let key in response.data){
      // if (response.data[key].moyenne >= 10){

      if (response.data[key].done===true){
        donedTasks.unshift({
          ...response.data[key],
          id: key
        });
      } else {
       
       newTasks.push({
         ...response.data[key],
         id: key
       });

      }

    }
    // on fusionne les deux tableau
    let resultTasks = newTasks.concat(donedTasks);
     setTasks(resultTasks);
     setChargement(false);

     

  }
    )
    .catch(error => {
      console.log(error);
      setChargement(false);
    })

   }

   const changedFormHandler = event => {
    setInput(event.target.value);
   }


   

  // cartes

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
      {chargement ?

      <Spinner></Spinner>

      :
      <>

      <div className="add">
        <form onSubmit={(e) => submittedTaskHandler(e)}>
          <input ref={inputRef} value={input} onChange={(e) => changedFormHandler(e)} type="text"  placeholder="Que souhaitez-vous ajouter ?" />
          <button type="submit">Ajouter</button>
        </form>
      </div>

      <div className="tasks">
        {cartes}
      

      </div>
      </>
}
    </div>
  );
}

export default App;

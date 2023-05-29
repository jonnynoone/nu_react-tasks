import { useEffect, useState } from 'react';
import supabase from './supabase.js';

function App() {
  const [tasks, setTasks] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(function() {
    async function getTasks() {
      setIsLoading(true);
      const { data, error } = await supabase
        .from('tasks').select();

      if (!error) setTasks(data);
      setIsLoading(false);
    }

    getTasks();
  }, []);
  
  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col col-xl-10">
            <div className="card">
              <div className="card-body p-5">
                <Form setTasks={setTasks} />
                {/* <Tabs /> */}
                {isLoading ? <Loader /> : <Tasks tasks={tasks} />}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Loader() {
  return (
    <div className="row text-center">
      <p>Loading...</p>
      <img className="loading" src='./loading.gif' alt="Loading..." />
    </div>
  );
}

function Form({ setTasks }) {
  const [text, setText] = useState('');

  async function handleSubmit(e) {
    // Stop default form submit
    e.preventDefault();

    // Upload task
    const { data: newTask, error } = await supabase.from('tasks').insert([{text}]).select();

    // Update tasks
    if (!error) setTasks(tasks => [newTask[0], ...tasks]);

    // Clear form
    setText('');
  }

  return (
    <form className="d-flex justify-content-center align-items-center mb-4">
        <div className="form-outline flex-fill">
            <input
              type="text"
              id="form2"
              className="form-control"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
        </div>

        <button
          type="submit"
          className="btn btn-info ms-2"
          onClick={handleSubmit}
        >Add</button>
    </form>
  );
}

// function Tabs() {
//   return (
//     <ul className="nav nav-tabs mb-4 pb-2" id="ex1" role="tablist">
//         <Tab name='All'/>
//         <Tab name='Active'/>
//         <Tab name='Completed'/>
//     </ul>
//   );
// }

// function Tab({ name }) {
//   return (
//     <li className="nav-item" role="presentation">
//         <button className="nav-link" data-mdb-toggle="tab" role="tab">{name}</button>
//     </li>
//   );
// }

function Tasks({ tasks }) {
  return (
    <div className="tab-content" id="ex1-content">
        <div className="tab-pane fade show active" id="ex1-tabs-1" role="tabpanel"
            aria-labelledby="ex1-tab-1">
            <ul className="list-group mb-0">
                {
                  tasks.map(task => (
                    <Task key={task.id} task={task} />
                  ))
                }
            </ul>
        </div>
    </div>
  );
}

function Task({ task }) {
  return (
    <li className="list-group-item d-flex justify-content-between align-items-center border-0 mb-2 rounded">
        <div>
          <input className="form-check-input me-2" type="checkbox" value="" aria-label="..." />
          {task.text}
        </div>
        {/* <button className="delete-task">❌</button> */}
    </li>
  );
}

export default App;
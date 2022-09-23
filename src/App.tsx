import React,{  useState, ChangeEvent, FormEvent } from 'react';
import './App.css';
import { ListTask } from './Interfaces';

const App: React.FC = () => {
  const [addTask, setTask] = useState<string>("");
  const [leght, setLeght] = useState<number>(2);
  const [edit, setEdit] = useState<boolean>(false);
  const [taskEdit, setTaskEdit] = useState<string>("");
  const [valIdex, setValIndex] = useState<number>(0);
   const [listTask, setListTask] = useState<ListTask[]>([
    { id: 1, name: "katana", complete: false },
    { id: 2, name: "shurieken", complete: false },
   ]);
  const  changeTask= (e :ChangeEvent<HTMLInputElement>) => {
    setTask(e.target.value);
  };

  const addList = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (addTask !== "") {
      setLeght(leght + 1);
      const new_task = {id:0,name:'',complete:false};
      new_task.id  =leght + 1;
      new_task.name = addTask;
      new_task.complete = false;
      setListTask([...listTask, new_task]);
      setTask("");
    }
    else {
      setListTask([...listTask]);
    }
  };

  const isComplete = (id:number) => {
    const task_complete = listTask.findIndex((task) => task.id === id);
    const new_list = [...listTask];
    if (listTask[task_complete].complete === false) {
      new_list[task_complete] = {
        ...new_list[task_complete],
        complete: true,
      };
      setListTask(new_list);
    } else {
      new_list[task_complete] = {
        ...new_list[task_complete],
        complete: false,
      };
      setListTask(new_list);
    }
  };

  const Edit = (id:number) => {
    const item_edit = listTask.findIndex((task) => task.id === id);
    setTaskEdit(listTask[item_edit].name);
    setEdit(true);
    setValIndex(item_edit);
    
  };

  const completeEdit = () => {
    const new_list = [...listTask];
    new_list[valIdex] = {
      ...new_list[valIdex],
      name: taskEdit,
    };
    setListTask(new_list);
    setValIndex(0);
    setEdit(false);
  };

  const changeData = (e :ChangeEvent<HTMLInputElement>) => {
    setTaskEdit(e.target.value);
     
  };

  const Delete = (id:number) => {
    setListTask(listTask.filter((t) => t.id !== id));
  };
  const deleteAll = () => {
    setListTask([]);
  }
  return (
   <div className="App-header">
      <div>
        <div className="form_add">
          <form onSubmit={(e) => addList(e)}>
            <input value={addTask} onChange={(e) => changeTask(e)} />
            <button>Add</button>
          </form>
        </div>
        <div className="list_item">
          {
            <div>
              {edit === false ? (
                <div>
                  {listTask.map((task) => (
                    <div
                      key={task.id}
                      id="item"
                      className={task.complete === false ? "" : "complete"}
                    >
                      <div>
                        <input
                          type="checkbox"
                          onClick={() => isComplete(task.id) } checked={task.complete === false ? false : true}
                        />
                        {task.name}
                      </div>
                      <div>
                        <button onClick={() => Delete(task.id)}>Delete</button>
                        <button onClick={() => Edit(task.id)}>Edit</button>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div>
                  <input
                    value={taskEdit}
                    onChange={(e) => changeData(e)}
                  ></input>
                  <button onClick={() => completeEdit()}>Ok</button>
                </div>
              )}
            </div>
          }
        </div>
        <div ><button onClick={()=>deleteAll()} disabled={edit===true?true:false}>Delete All</button></div>
      </div>
    </div>
   
  )
}

export default App;

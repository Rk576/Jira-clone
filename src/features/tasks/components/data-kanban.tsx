import {Task, TasksStatus} from "@/features/tasks/types";
import {useState} from "react";
import {DragDropContext} from "@hello-pangea/dnd";
import {KanbanColumnHeader} from "@/features/tasks/components/kanban-column-header";

const boards: TasksStatus[]=[
    TasksStatus.BACKLOG,
    TasksStatus.IN_REVIEW,
    TasksStatus.IN_PROGRESS,
    TasksStatus.DONE,
    TasksStatus.TODO
]

type TasksState = {
  [key in TasksStatus]: Task[];
}
interface DataKanbanProps{
  data:Task[];
}
export const DataKanban = ({data}:DataKanbanProps) =>{

  const [tasks,setTasks] = useState<TasksState>(()=>{
    const initialTasks:TasksState={
      [TasksStatus.BACKLOG]:[],
      [TasksStatus.TODO]:[],
      [TasksStatus.IN_PROGRESS]:[],
      [TasksStatus.IN_REVIEW]:[],
      [TasksStatus.DONE]:[],
    };
    data.forEach((task)=>{
      initialTasks[task.status].push(task)
    })
    Object.keys(initialTasks).forEach((status)=>{
      initialTasks[status as TasksStatus].sort((a,b)=> a.position - b.position)
    })
    return initialTasks;
  });
  return(
      <DragDropContext onDragEnd={()=>{}}>
        <div className="flex overflow-x-auto">
          {boards.map((board)=>{
            return(
                <div key={board} className="flex-1 mx-2 bg-muted p-1.5 rounded-md min-w-[200px]">
                  <KanbanColumnHeader
                    board={board}
                    taskCount={tasks[board].length}
                  />
                </div>
            )
          })}
        </div>
      </DragDropContext>
  )
}
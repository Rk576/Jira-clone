import {Task, TasksStatus} from "@/features/tasks/types";
import {useCallback, useEffect, useState} from "react";
import {DragDropContext, Droppable, Draggable, type DropResult} from "@hello-pangea/dnd";
import {KanbanColumnHeader} from "@/features/tasks/components/kanban-column-header";
import {KanbanCard} from "@/features/tasks/components/kanban-card";

const boards: TasksStatus[]=[
    TasksStatus.BACKLOG,
    TasksStatus.TODO,
    TasksStatus.IN_PROGRESS,
    TasksStatus.IN_REVIEW,
    TasksStatus.DONE,

]

type TasksState = {
  [key in TasksStatus]: Task[];
}
interface DataKanbanProps{
  data:Task[];
  onChange: (tasks: { $id: string; status: TasksStatus; position: number }[]) => void;
}
export const DataKanban = ({data,onChange}:DataKanbanProps) =>{

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

  const onDragEnd=useCallback((result:DropResult)=>{
    if(!result.destination){
      return;
    }
    const {source,destination} = result;
    const sourceStatus = source.droppableId as TasksStatus;
    const destStatus = destination.droppableId as TasksStatus;

    let updatesPayload:{$id:string; status:TasksStatus; position:number;}[]=[]
    setTasks((prevTasks)=>{
      const newTasks = {...prevTasks};

      const sourceColumn = [...newTasks[sourceStatus]];
      const [movedTask] = sourceColumn.splice(source.index,1);

      if(!movedTask){
        console.error("No task found at source index");
        return prevTasks;
      }

      const updatedMovedTask = sourceStatus !== destStatus ? {...movedTask,status:destStatus} : movedTask;

      newTasks[sourceStatus] = sourceColumn;

      const destColumn = [...newTasks[destStatus]];
      destColumn.splice(destination.index,0,updatedMovedTask);
      newTasks[destStatus] = destColumn;

      updatesPayload=[];
      updatesPayload.push({
        $id:updatedMovedTask.$id,
        status: destStatus,
        position:Math.min((destination.index+1)*1000,1_000_000)
      })

      newTasks[destStatus].forEach((task,index)=>{
        if(task && task.$id !== updatedMovedTask.$id){
          const newPosition = Math.min((index+1)*1000,1_000_000)
          if(task.position!==newPosition){
            updatesPayload.push({
              $id:task.$id,
              status: destStatus,
              position:newPosition,
            })
          }
        }
      });
      if(sourceStatus !== destStatus){
        newTasks[sourceStatus].forEach((task,index)=>{
          if(task){
            const newPosition = Math.min((index+1)*1000,1_000_000)
            if(task.position!==newPosition){
              updatesPayload.push({
                $id:task.$id,
                status: sourceStatus,
                position:newPosition,
              })
            }
          }
        })
      }
      return newTasks;

    })
    onChange(updatesPayload);
  },[onChange])

  useEffect(()=>{
    const newTasks:TasksState={
      [TasksStatus.BACKLOG]:[],
      [TasksStatus.TODO]:[],
      [TasksStatus.IN_PROGRESS]:[],
      [TasksStatus.IN_REVIEW]:[],
      [TasksStatus.DONE]:[],
    };
    data.forEach((task)=>{
      newTasks[task.status].push(task)
    })
    Object.keys(newTasks).forEach((status)=>{
      newTasks[status as TasksStatus].sort((a,b)=> a.position - b.position)
    })
    setTasks(newTasks)
  },[data]);
  return(
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex overflow-x-auto">
          {boards.map((board)=>{
            return(
                <div key={board} className="flex-1 mx-2 bg-muted p-1.5 rounded-md min-w-[200px]">
                  <KanbanColumnHeader
                    board={board}
                    taskCount={tasks[board].length}
                  />
                  <Droppable droppableId={board}>
                    {(provided)=>(
                      <div
                          {...provided.droppableProps}
                          ref={provided.innerRef}
                          className="min-h-[200px] py-1.5"
                      >
                        {tasks[board].map((task,index)=>(
                            <Draggable key={task.$id} draggableId={task.$id} index={index}>
                              {(provided)=>(
                                  <div
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      ref={provided.innerRef}
                                  >
                                    <KanbanCard task={task}/>
                                  </div>
                              )}
                            </Draggable>
                          ))}
                        {provided.placeholder}
                      </div>
                    )}
                  </Droppable>
                </div>
            )
          })}
        </div>
      </DragDropContext>
  )
}
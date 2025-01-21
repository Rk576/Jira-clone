import {TasksStatus} from "@/features/tasks/types";
import {number} from "zod";
import {snakeCaseToTitleCase} from "@/lib/utils";
import {CircleCheckIcon, CircleDashedIcon, CircleDotDashedIcon, CircleDotIcon, CircleIcon} from "lucide-react";

interface KanbanColumHeaderProps {
  board:TasksStatus;
  taskCount: number;
}

const statusIconMap: Record<TasksStatus,React.ReactNode> = {
  [TasksStatus.BACKLOG]:(
      <CircleDashedIcon className="size-[18px] text-pink-400"/>
  ),
  [TasksStatus.TODO]:(
      <CircleIcon className="size-[18px] text-red-400"/>
  ),
  [TasksStatus.IN_PROGRESS]:(
      <CircleDotDashedIcon className="size-[18px] text-yellow-400"/>
  ),
  [TasksStatus.IN_REVIEW]:(
      <CircleDotIcon className="size-[18px] text-blue-400"/>
  ),
  [TasksStatus.DONE]:(
      <CircleCheckIcon className="size-[18px] text-emerald-400"/>
  ),


}

export const KanbanColumnHeader = ({board,taskCount}:KanbanColumHeaderProps) => {
  const icon = statusIconMap[board]
  return (
      <div className="px-2 py-1.5 flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          {icon}
          <h2>
            {snakeCaseToTitleCase(board)}
          </h2>
          <div>
            {taskCount}
          </div>
        </div>
      </div>
  )
}
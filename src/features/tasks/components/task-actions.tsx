import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {ExternalLinkIcon, PencilIcon, TrashIcon} from "lucide-react";


interface TaskActionsProps{
  id:string;
  projectId:string;
  children:React.ReactNode;
}

export const TaskActions = ({id,projectId,children}:TaskActionsProps) => {
  return(
      <div className="flex justify-end">
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger asChild>
              {children}
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={()=>{}} className="font-medium p-[10px]" disabled={false}>
                  <ExternalLinkIcon className="size-4 mr-2"/>
                  Task Details
                </DropdownMenuItem>
              <DropdownMenuItem onClick={()=>{}} className="font-medium p-[10px]" disabled={false}>
                <ExternalLinkIcon className="size-4 mr-2"/>
                Open Project
              </DropdownMenuItem>
              <DropdownMenuItem onClick={()=>{}} className="font-medium p-[10px]" disabled={false}>
                <PencilIcon className="size-4 mr-2"/>
                Edit Task
              </DropdownMenuItem>
              <DropdownMenuItem onClick={()=>{}} className="text-amber-700 focus:text-amber-700 font-medium p-[10px]" disabled={false}>
                <TrashIcon className="size-4 mr-2"/>
                  Delete Task
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
      </div>
  )
}
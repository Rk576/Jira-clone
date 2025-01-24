"use client"

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "@radix-ui/react-icons";
import {DottedSeparator} from "@/components/dotted-separator";
import {useCreateTaskModal} from "@/features/tasks/hooks/use-create-task-modal";
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspaceId";
import {useGetTasks} from "@/features/tasks/api/use-get-tasks";
import {useQueryState} from "nuqs";
import {Loader} from "lucide-react";
import {DataFilters} from "@/features/tasks/components/data-filters";
import {useTaskFilters} from "@/features/tasks/hooks/use-task-filters";
import {DataTable} from "@/features/tasks/components/data-table";
import {columns} from "@/features/tasks/components/columns";
import {DataKanban} from "@/features/tasks/components/data-kanban";
import {useCallback} from "react";
import {TasksStatus} from "@/features/tasks/types";
import {useBulkUpdateTasks} from "@/features/tasks/api/use-bulk-update-task";
import {DataCalendar} from "@/features/tasks/components/data-calendar";

interface TaskViewSwitcherProps{
    hideProjectFilter?:boolean;
}
export const TaskViewSwitcher = ({hideProjectFilter}:TaskViewSwitcherProps)=>{
    const [{
        status,assigneeId,projectId,dueDate
    },setFilters] = useTaskFilters();
    const [view,setView] = useQueryState("task-view",{
        defaultValue:"table",
    })
    const workspaceId = useWorkspaceId();
    const {mutate:bulkUpdate}= useBulkUpdateTasks();
    const {data:tasks , isLoading:isLoadingTasks} = useGetTasks({workspaceId,projectId,assigneeId,status,dueDate});

    const onKanbanChange= useCallback((
        tasks:{$id: string; status: TasksStatus; position: number }[])=>
    {
        bulkUpdate({
            json: {tasks},
        })
    },[bulkUpdate])

    const {open} = useCreateTaskModal();



    return (
        <Tabs defaultValue={view} onValueChange={setView} className="flex-1 w-full border rounded-lg">
            <div className="h-full flex flex-col overflow-auto p-4">
                <div className="flex flex-col gap-y-2 lg:flex-row items-center justify-between">
                    <TabsList className="w-full lg:w-auto">
                        <TabsTrigger value="table" className="h-8 w-full lg:w-auto">
                            Table
                        </TabsTrigger>
                        <TabsTrigger value="kanban" className="h-8 w-full lg:w-auto">
                            Kanban
                        </TabsTrigger>
                        <TabsTrigger value="calendar" className="h-8 w-full lg:w-auto">
                            Calendar
                        </TabsTrigger>
                    </TabsList>
                    <Button size="sm" className="w-full lg:w-auto" onClick={open}>
                        <PlusIcon className="size-4 mr-1"/>
                        New
                    </Button>
                </div>
                <DottedSeparator className="my-4"/>
                    <DataFilters hideProjectFilter={hideProjectFilter}/>
                <DottedSeparator className="my-4"/>
                {isLoadingTasks ? (
                    <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
                        <Loader className="size-5 animate-spin text-muted-foreground"/>
                    </div>
                ) : (
                    <>
                    <TabsContent value="table" className="mt-0">
                        <DataTable columns={columns} data={tasks?.documents ?? []}/>
                    </TabsContent>
                    <TabsContent value="kanban" className="mt-0">
                        <DataKanban data={tasks?.documents ?? []} onChange={onKanbanChange} />
                    </TabsContent>
                    <TabsContent value="calendar" className="mt-0 h-full pb-4">
                        <DataCalendar data={tasks?.documents ?? []}/>
                    </TabsContent>
                </>
                )}

            </div>
        </Tabs>
    )
}
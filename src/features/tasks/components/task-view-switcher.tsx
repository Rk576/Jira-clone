"use client"

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "@radix-ui/react-icons";
import {DottedSeparator} from "@/components/dotted-separator";
import {useCreateTaskModal} from "@/features/tasks/hooks/use-create-task-modal";
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspaceId";
import {useGetTask} from "@/features/tasks/api/use-get-task";
import {useQueryState} from "nuqs";
import {Loader} from "lucide-react";
import {DataFilters} from "@/features/tasks/components/data-filters";
import {useTaskFilters} from "@/features/tasks/hooks/use-task-filters";

export const TaskViewSwitcher = ()=>{
    const [{
        status,assigneeId,projectId,dueDate
    },setFilters] = useTaskFilters();
    const [view,setView] = useQueryState("task-view",{
        defaultValue:"table",
    })
    const workspaceId = useWorkspaceId();
    const {data:tasks , isLoading:isLoadingTasks} = useGetTask({workspaceId,projectId,assigneeId,status,dueDate});

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
                    <DataFilters/>
                <DottedSeparator className="my-4"/>
                {isLoadingTasks ? (
                    <div className="w-full border rounded-lg h-[200px] flex flex-col items-center justify-center">
                        <Loader className="size-5 animate-spin text-muted-foreground"/>
                    </div>
                ) : (
                    <>
                    <TabsContent value="table" className="mt-0">
                        {JSON.stringify(tasks)}
                    </TabsContent>
                    <TabsContent value="kanban" className="mt-0">
                        {JSON.stringify(tasks)}
                    </TabsContent>
                    <TabsContent value="calendar" className="mt-0">
                        {JSON.stringify(tasks)}
                    </TabsContent>
                </>
                )}

            </div>
        </Tabs>
    )
}
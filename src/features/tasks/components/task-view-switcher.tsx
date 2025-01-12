"use client"

import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {Button} from "@/components/ui/button";
import {PlusIcon} from "@radix-ui/react-icons";
import {DottedSeparator} from "@/components/dotted-separator";
import {useCreateTaskModal} from "@/features/tasks/hooks/use-create-task-modal";
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspaceId";
import {useGetTask} from "@/features/tasks/api/use-get-task";

export const TaskViewSwitcher = ()=>{
    const workspaceId = useWorkspaceId();
    const {data:tasks , isLoading:isLoadingTasks} = useGetTask({workspaceId});

    const {open} = useCreateTaskModal();

    return (
        <Tabs className="flex-1 w-full border rounded-lg">
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
                Data Filters
                <DottedSeparator className="my-4"/>
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
            </div>
        </Tabs>
    )
}
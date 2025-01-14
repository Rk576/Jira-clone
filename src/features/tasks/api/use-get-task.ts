import {useQuery} from "@tanstack/react-query";
import {client} from "@/lib/rpc";
import {TasksStatus} from "@/features/tasks/types";

interface useGetTasksProps {
    workspaceId:string;
    projectId?:string | null;
    status?:TasksStatus | null;
    assigneeId?:string | null;
    dueDate?:string | null;
    search?:string | null;

}
export const useGetTask = ({workspaceId,projectId,status,assigneeId,dueDate,search}:useGetTasksProps) => {
    return useQuery({
        queryKey: ["tasks",workspaceId,projectId,status,assigneeId,dueDate,search],
        queryFn: async () => {
            const response = await client.api.tasks.$get({
                query:{workspaceId,
                    projectId:projectId ?? undefined,
                    status:status ?? undefined,
                    assigneeId:assigneeId ?? undefined,
                    dueDate:dueDate ?? undefined,
                    search:search ?? undefined,
                },
            });


            if (!response.ok) {
                throw new Error("Failed to fetch tasks");
            }

            const {data} = await response.json();
            return data;
        },
    });
};

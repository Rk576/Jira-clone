import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspaceId";
import {useGetProjects} from "@/features/projects/api/use-get-projects";
import {useGetMembers} from "@/features/members/api/use-get-members";
import {Select, SelectContent, SelectItem, SelectSeparator, SelectTrigger, SelectValue} from "@/components/ui/select";
import {FolderIcon, ListChecksIcon, UserIcon} from "lucide-react";
import {TasksStatus} from "@/features/tasks/types";
import {useTaskFilters} from "@/features/tasks/hooks/use-task-filters";
import {DatePicker} from "@/components/date-picker";

interface DataFiltersProps{

    hideProjectFilter?:boolean;
}

export const DataFilters = (hideProjectFilter: DataFiltersProps) => {
    const workspaceId = useWorkspaceId();
    const {data:projects, isLoading: isLoadingProjects} = useGetProjects({workspaceId});
    const {data:members,isLoading:isLoadingMembers} = useGetMembers({workspaceId});

    const isLoading = isLoadingProjects || isLoadingMembers;

    const projectOptions = projects?.documents.map((project)=>({
        value:project.$id,
        label:project.name,
    }))
    const memberOptions = members?.documents.map((member)=>({
        value:member.$id,
        label:member.name,
    }))

    const [{
        status,assigneeId,projectId,dueDate
    },setFilters] = useTaskFilters();

    const onStatusChange = (value:string)=>{
        if(value==="all"){
            setFilters({status: null});
        }
        else{
            setFilters({status: value as TasksStatus})
        }
    }
    const onAssigneeChange = (value:string)=>{
        if(value==="all"){
            setFilters({assigneeId: null});
        }
        else{
            setFilters({assigneeId: value as string})
        }
    }
    const onProjectChange = (value:string)=>{
        if(value==="all"){
            setFilters({projectId: null});
        }
        else{
            setFilters({projectId: value as string})
        }
    }

    if(isLoading){
        return null;
    }

    return(
        <div className="flex flex-col lg:flex-row gap-2">
            <Select defaultValue={status ?? undefined} onValueChange={(value)=>onStatusChange(value)}>
                <SelectTrigger className="w-full lg:w-auto h-8">
                    <div className="flex items-center pr-2">
                        <ListChecksIcon className="size-4 mr-2"/>
                        <SelectValue placeholder="All statuses"/>
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All statuses</SelectItem>
                    <SelectSeparator/>
                    <SelectItem value={TasksStatus.BACKLOG}>Backlog</SelectItem>
                    <SelectItem value={TasksStatus.IN_PROGRESS}>In Progress</SelectItem>
                    <SelectItem value={TasksStatus.IN_REVIEW}>In Review</SelectItem>
                    <SelectItem value={TasksStatus.TODO}>To Do</SelectItem>
                    <SelectItem value={TasksStatus.DONE}>Done</SelectItem>
                </SelectContent>
            </Select>
            <Select defaultValue={assigneeId ?? undefined} onValueChange={(value)=>onAssigneeChange(value)}>
                <SelectTrigger className="w-full lg:w-auto h-8">
                    <div className="flex items-center pr-2">
                        <UserIcon className="size-4 mr-2"/>
                        <SelectValue placeholder="All assignees"/>
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All assignees</SelectItem>
                    <SelectSeparator/>
                    {memberOptions?.map((member)=>(
                        <SelectItem value={member.value} key={member.value}>
                            {member.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <Select defaultValue={projectId ?? undefined} onValueChange={(value)=>onProjectChange(value)}>
                <SelectTrigger className="w-full lg:w-auto h-8">
                    <div className="flex items-center pr-2">
                        <FolderIcon className="size-4 mr-2"/>
                        <SelectValue placeholder="All projects"/>
                    </div>
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">All projects</SelectItem>
                    <SelectSeparator/>
                    {projectOptions?.map((project)=>(
                        <SelectItem value={project.value} key={project.value}>
                            {project.label}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>
            <DatePicker value={dueDate ? new Date(dueDate) : undefined}
                        onChange={(date)=>{
                setFilters({dueDate: date ? date.toISOString() : null})
            }}
                        placeholder="Due Date"
                        className="w-full lg:w-auto h-8"
            />
        </div>
    )
}
import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";
import {EditWorkSpaceForm} from "@/features/workspaces/components/edit-workspace-form";
import {getWorkspace} from "@/features/workspaces/queries";


interface WorkspaceSettingsPageProps{
    params:{
        workspaceId:string;
    }
}
const WorkspaceIdSettingsPage = async({params} :WorkspaceSettingsPageProps ) =>{
    const user = await getCurrent();

    if(!user){
        redirect("/sign-in");
    }

    const initialValues =await getWorkspace({workspaceId:params.workspaceId});


    return(
        <div className="w-full lg:max-w-xl">
            <EditWorkSpaceForm initialValues={initialValues}/>
        </div>
    )
}

export default WorkspaceIdSettingsPage;
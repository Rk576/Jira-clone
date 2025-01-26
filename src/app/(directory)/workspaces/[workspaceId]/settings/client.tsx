"use client";

import {EditWorkSpaceForm} from "@/features/workspaces/components/edit-workspace-form";
import {PageLoader} from "@/components/page-loader";
import {PageError} from "@/components/page-error";
import {useWorkspaceId} from "@/features/workspaces/hooks/use-workspaceId";
import {useGetWorkspace} from "@/features/workspaces/api/use-get-workspace";

export const WorkspaceIdSettingsClient = () =>{
  const workspaceId = useWorkspaceId();
  const {data:initialValues,isLoading} = useGetWorkspace({workspaceId});

  if(isLoading){
    return <PageLoader/>;
  }
  if(!initialValues){
    return <PageError message="Project not found"/>
  }
  return (
      <div className="w-full lg:max-w-xl">
        <EditWorkSpaceForm initialValues={initialValues}/>
      </div>
  )
}
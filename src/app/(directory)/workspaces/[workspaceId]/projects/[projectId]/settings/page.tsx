import {getCurrent} from "@/features/auth/queries";
import {redirect} from "next/navigation";

const ProjectIdSettingsPage = async()=>{
    const user = await getCurrent();
    if(!user){
        redirect("/sign-in")
    }
    return(
        <div>
            nigga
        </div>
    )
}

export default ProjectIdSettingsPage;
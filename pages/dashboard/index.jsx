import { useAtom, useSetAtom } from "jotai";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { makePlural } from "../../components/functions/MakePlural";
import { getIcon } from "../../components/Icons/GetIcon";
import Layout from "../../components/Layout/Layout";
import Alert from "../../components/modal/Alert";
import WeatherSidebar from "../../components/Sidebar/WeatherSidebar";
import Heading from "../../components/Typography/Heading";
import Text from "../../components/Typography/Text";
import { useCurrentUser } from "../../services/api/user";
import { alertAtom } from "../../stores/alert";

export default function Home() {
	const { data } = useSession();
	const jwt = data?.jwt;
	const { user, isUserLoading } = useCurrentUser(jwt);
	const [alert, setAlert] = useAtom(alertAtom)

	if (isUserLoading) return <p>loading ...</p>;

	return (
		<Layout title='Home'>
			<div className='flex justify-between'>
				<div className="p-8 w-full"> 
					<Heading> Welcome Back {user.username}. </Heading>
					<div className="mt-8 "> 
						<div className="flex gap-6 mt-3 flex-wrap items-stretch">
								{user.project?.map((project) => {
									return <ProjectCard key={project.id} project={project} />
								})}
								{user.collaborations?.map((project) => {
									return <ProjectCard key={project.id} project={project.project} />
								})}
						</div>
					</div>
				</div>
				<WeatherSidebar />
			</div>
			{alert.active && <Alert setAlert={setAlert} alert={alert}/>} 
		</Layout>
	);
}


function ProjectCard({project}){
	const router = useRouter();
	const setAlert = useSetAtom(alertAtom);

	function setAlertFunc() {
		setAlert({
			content: "Your project is Loading ...",
			active: true,
			success: true,
		});
		router.push(`/project/${project?.id}/widget/${project?.project_widgets[0]?.id}`)
	}

	return (
		<div onClick={()=> setAlertFunc()} className="py-4 px-4 rounded-md border border-stroke-grey bg-blue-600 w-[193px] cursor-pointer hover:scale-[102%] transition-all"> 
			<Text> {project?.name} </Text>
			<div className="flex gap-3 mt-4 ml-2 ">
				<div className="w-[1px]  bg-stroke-blue"></div>
				<div className="flex flex-col w-fit gap-3 ">
					{project?.project_widgets?.slice(0, 4).map((widget)=> {
						return <div className="flex gap-2" key={widget.id}> 
								<span className="text-13">{getIcon(widget.widget.id)} </span>
								<Text color={"inactive"} size={"14"} regular> {widget.name} </Text>
							</div>
					})}
					{project?.project_widgets?.length > 4 && <Text color={"inactive"} size={"14"} regula> +{project.project_widgets.length - 4} {makePlural("widget", project.project_widgets.length - 4)} </Text>}
				</div>
			</div>
		</div>
	)
}

Home.auth = true;

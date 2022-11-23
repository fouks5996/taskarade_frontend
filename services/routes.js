import { getRoot } from "./config";

export const path = (name, argument, argument2) => {
	const root = getRoot().API_URL;
	switch (name) {
		case "register":
			return `${root}/api/auth/local/register`;
		case "forgot-password":
			return `${root}/api/auth/forgot-password`;
		case "current_widget1":
			return `${root}/api/project-widgets/${argument}?fields=name&populate[widget][fields]=id`;
		case "current_widget":
			return `${root}/api/project-widgets/${argument}?populate=notes, widget`;
		case "current_project_widget":
			return `${root}/api/project-widgets/${argument}?populate=notes, tasks, widget, tickets`;
		case "current_project":
			return `${root}/api/projects/${argument}?populate=project_widgets.widget, project_widgets.notes, project_widgets.tasks, project_widgets.tickets, project_widgets.tickets.ticket_status,project_widgets.tickets.ticket_priority, project_widgets.tickets.assigned, collaborations.collaborator, collaborations.collaborator.avatar.url, creator.avatar.url`;
		case "current_user":
			return `${root}/api/users/me?populate[project][populate]=project_widgets.widget&populate[collaborations][populate]=project.project_widgets.widget&populate[avatar][fields][1]=url`;
		case "HP_single_type":
			return `${root}/api/page?populate=hero_content, meta_title`;
		case "BLOG_single_type":
			return `${root}/api/page?populate=hero_content, meta_title`;
		case "GET_widgets":
			return `${root}/api/widgets`;
		case "UPDATE_widget":
			return `${root}/api/project-widgets/${argument}`;
		case "CREATE_widget":
			return `${root}/api/project-widgets`;
		case "DELETE_widget":
			return `${root}/api/project-widgets/${argument}`;
		case "DELETE_posts":
			return `${root}/api/posts/${argument}`;
		case "UPDATE_note":
			return `${root}/api/notes/${argument}`;
		case "CREATE_note":
			return `${root}/api/notes`;
		case "DELETE_note":
			return `${root}/api/notes/${argument}`;
		case "ticket_status":
			return `${root}/api/ticket-statuses`;
		case "ticket_priority":
			return `${root}/api/ticket-priorities`;
		case "CREATE_ticket":
			return `${root}/api/tickets`;
	}
};

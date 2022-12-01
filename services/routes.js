import { getRoot } from "./config";

export const path = (name, argument, argument2) => {
	const root = getRoot().API_URL;
	switch (name) {
		case "register":
			return `${root}/api/auth/local/register`;
		case "forgot-password":
			return `${root}/api/auth/forgot-password`;
		case "getUsers":
			return `${root}/api/users?filters[$or][0][username][$contains]=${argument}&filters[$or][1][email][$contains]=${argument}&populate=avatar`;
		case "CREATE_collaboration":
			return `${root}/api/collaborations`;
		case "current_widget":
			return `${root}/api/project-widgets/${argument}?populate=notes, widget`;
		case "current_project_widget":
			return `${root}/api/project-widgets/${argument}?populate=notes, tasks, widget, tickets`;
		case "CREATE_project":
			return `${root}/api/projects`;
		case "current_project":
			return `${root}/api/projects/${argument}?populate=project_widgets.widget, project_widgets.notes, project_widgets.tasks,project_widgets.tasks.task_status, project_widgets.tickets, project_widgets.tickets.ticket_status,project_widgets.tickets.ticket_priority, project_widgets.tickets.assigned, project_widgets.tickets.ticket_owner, collaborations.collaborator, collaborations.collaborator.avatar.url, creator.avatar.url`;
		case "current_project_collab":
			return `${root}/api/projects/${argument}?populate=collaborations.collaborator`;
		case "current_user":
			return `${root}/api/users/me?populate[project][populate]=project_widgets.widget&populate[collaborations][populate]=project.project_widgets.widget&populate[avatar][fields][1]=url&populate[notifications][populate]=project, sender.avatar.url`;
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
		case "DELETE_ticket":
			return `${root}/api/tickets/${argument}`;
		case "UPDATE_ticket":
			return `${root}/api/tickets/${argument}`;
		case "ticket_comments":
			return `${root}/api/ticket-comments?filters[ticket][id][$eq]=${argument}&populate=author.avatar.url`;
		case "CREATE_comment":
			return `${root}/api/ticket-comments`;
		case "notification":
			return `${root}/api/notifications?filters[recipient][id][$eq]=${argument}`;
		case "CREATE_notif":
			return `${root}/api/notifications`;
		case "UPDATE_notification":
			return `${root}/api/notifications/${argument}`;
		case "task_status":
			return `${root}/api/task-statuses?populate=tasks, tasks.task_status, tasks.project_widget, tasks.task_owner`;
		case "current_tasks":
			return `${root}/api/current-tasks/${argument}`;
		case "CREATE_task":
			return `${root}/api/tasks`;
		case "UPDATE_task":
			return `${root}/api/tasks/${argument}`;
		case "DELETE_task":
			return `${root}/api/tasks/${argument}`;
		case "CREATE_task-tag":
			return `${root}/api/task-tags`;
		case "DELETE_task-tag":
			return `${root}/api/task-tags/${argument}`;
		case "UPDATE_task-tag":
			return `${root}/api/task-tags/${argument}`;
		case "tag_bg":
			return `${root}/api/tag-bgs`;
		case "UPDATE_tag_bg":
			return `${root}/api/tag-bgs/${argument}`;
	}
};

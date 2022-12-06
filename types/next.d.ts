import type { NextComponentType, NextPageContext } from "next"
import type { Session } from "next-auth"

declare module "next/app" {
  type AppProps<P = Record<string, unknown>> = {
    Component: NextComponentType<NextPageContext, any, P> & {
      auth: boolean
    },
    pageProps: P & {
      session: Session
    }
  }

  interface AuthProps {
	children?: ReactNode;
 }

 interface RouterQProps{
   pid: string,
   id: string
 }

 // ROUTER 

 type queryTypes={
	id: string;
	pid: string;
 }

 // USER 

 type UserTypes={
	data: {
		id: number,
		attributes:{
			username: string,
			email: string,
			createdAt: string,
			updatedAt: string
		}
	}	
}

 // CRUD

 type CrudResponse = {
	jwt?: string,
	error?: {},
	user?: {
		id: number,
		username: string,
		email: string,
		provider: string,
		confirmed: boolean,
		blocked: boolean,
		createdAt: string,
		updatedAt: string
	 }
 }

 // EVENT 

 interface EventTarget {
	addEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
	dispatchEvent(evt: Event): boolean;
	removeEventListener(type: string, listener: EventListenerOrEventListenerObject, useCapture?: boolean): void;
}

interface SyntheticEvent {
	bubbles: boolean;
	cancelable: boolean;
	currentTarget: EventTarget;
	defaultPrevented: boolean;
	eventPhase: number;
	isTrusted: boolean;
	nativeEvent: Event;
	preventDefault(): void;
	stopPropagation(): void;
	target: EventTarget;
	timeStamp: Date;
	type: string;
}

 // Alert

 type AlertTypes = {
		active: boolean, 
		content: string
	}

 

 // NOTES

 type Notes ={
	data: {
		find(arg0: (activeNote: any) => boolean): unknown
		sort(arg0: (a: any, b: any) => number): unknown
		length: number;
		reduce(arg0: (a: any, b: any) => any): { id: number; };
		attributes: object,
		id: number
	}
}

// TICKETS

type TicketStatus = {
	data: {
		map(arg0: (status: {id: number, attributes: {}}) => JSX.Element): import("react").ReactNode
		attributes: {};
		id: number
	};
};

type TicketPriority = {
	data: {
		attributes: {};
	};
};

type TicketComments = {
	data: {}
}

type Ticket = {
		attributes: {
			identifier: boolean;
			subject: string;
			estimated_time: string;
			realized_time: string;
			ticket_priority: TicketPriority;
			ticket_status: TicketStatus;
			assigned: UserTypes
		}
	id: boolean
};

// TASK

type TaskStatus = {

}

type CurrentTask = {

}

type TagBg = {
	data: any

}

// PROJECT

type CurrentProject = {

	error: {
		status: number
	},
	data: {
		attributes:{
			project_widgets: Widget
			name:string
			creator: UserTypes
			collaborations: {
				data:{
					[x: string]: any
					[x: {}]: Function
					collaborator: {
						attributes: UserTypes
					}
				}
			}
		}
	}

}
type CurrentProjectCollab = {

}

// WIDGET

 type WidgetItem ={
	data: { 
		id: number
	}
}

 type Widget = {
	error?: {
		status: number
	},
	data: {
		[x: string]: any
		attributes: {
			name: string,
			notes: Notes
			widget: WidgetItem
			tickets: {data: {
				filter(arg0: (ticket: Ticket) => boolean | Ticket): unknownTicket
}}
		}
		id: number
	},
 }

 type Widgets = {
   data: []
 }
}
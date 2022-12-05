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

 type Notes ={
	data: {
		length: number;
		reduce(arg0: (a: any, b: any) => any): { id: number; };
		attributes: object,
		id: number
	}
} 

 type WidgetItem ={
	data: { 
		id: number
	}
}

 type Widget = {
	error: {
		status: number
	},
	data: {
		attributes: {
			name: string,
			notes: Notes
			widget: WidgetItem
		}
	} ,
 }

 type Widgets = {
   data: []
 }
}
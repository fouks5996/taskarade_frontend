import { Session } from "next-auth"
import { JWT } from "next-auth/jwt"

declare module "next-auth" {
/*   interface SessionProps{
    session: Session
  } */

  type ServerErrorState = {
    state: boolean,
    message: string
  }

  type submitData = {
    email: string, 
    password: string,
    username: string
  }
} 
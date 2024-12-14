import nextAuth from 'next-auth';
import { AuthOptions } from "@/services/nextAuthConfig"

const handler = nextAuth(AuthOptions)

export { handler as GET, handler as POST }


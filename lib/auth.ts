import "server-only";

/** Only ESCP student addresses may hold an ESCP AI account. */
export const ALLOWED_EMAIL_DOMAIN = "edu.escp.eu";

export const isEscpEmail = (email: string | null | undefined) =>
  !!email && email.toLowerCase().endsWith(`@${ALLOWED_EMAIL_DOMAIN}`);

/** Authentication is switched on only when the Clerk keys are configured (they come from the Vercel integration). */
export const authEnabled = () => !!process.env.CLERK_SECRET_KEY && !!process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;

/**
 * Members are confirmed by the team in the Clerk dashboard:
 * Users → the person → Metadata → Public → { "member": true }
 */
export const isConfirmedMember = (publicMetadata: Record<string, unknown> | undefined) => publicMetadata?.member === true;

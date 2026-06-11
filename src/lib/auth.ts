import { cookies } from "next/headers";
import crypto from "crypto";

export async function checkAuth(): Promise<boolean> {
  const cookieStore = await cookies();
  const session = cookieStore.get("admin_session")?.value;
  if (!session || !process.env.ADMIN_PASSWORD) {
    return false;
  }
  const expected = crypto
    .createHash("sha256")
    .update(process.env.ADMIN_PASSWORD + "_session_salt_2026")
    .digest("hex");
  return session === expected;
}

import { users } from '@/lib/db';
import { hashPassword } from '@/lib/auth';
import { generateToken } from '@/lib/auth';
import { cookies } from 'next/headers';


export async function POST(req) {
  const { email, password } = await req.json();
  const existing = users.find(u => u.email === email);
  if (existing) return Response.json({ error: 'User exists' }, { status: 400 });

  const hashed = await hashPassword(password);
  users.push({ email, password: hashed });
  
  const token = generateToken({ email });
  const cookieStore = await cookies();
  cookieStore.set('token', token, { httpOnly: true });

  return Response.json({ success: true });
}

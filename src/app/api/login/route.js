import { users } from '@/lib/db';
import { comparePasswords, generateToken } from '@/lib/auth';
import { cookies } from 'next/headers';

export async function POST(req) {
  const { email, password } = await req.json();
  const user = users.find(u => u.email === email);
  if (!user || !(await comparePasswords(password, user.password))) {
    return Response.json({ error: 'Invalid credentials' }, { status: 401 });
  }

  const token = generateToken(user);
  const cookieStore = await cookies();
  cookieStore.set('token', token, { httpOnly: true });


  return Response.json({ success: true });
}

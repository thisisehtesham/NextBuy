import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/register/route';

const mockSet = vi.fn();

vi.mock('@/lib/db', () => ({
  users: []
}));

vi.mock('@/lib/auth', () => ({
  hashPassword: vi.fn((pass) => `hashed-${pass}`),
  generateToken: vi.fn(() => 'mocked_token')
}));

vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    set: mockSet
  }))
}));

describe('POST /api/register', () => {
  let users;
  let hashPassword;
  let generateToken;

  beforeEach(async () => {
    vi.clearAllMocks();
    const db = await import('@/lib/db');
    users = db.users;
    users.length = 0;

    const auth = await import('@/lib/auth');
    hashPassword = auth.hashPassword;
    generateToken = auth.generateToken;
  });

  it('should return 400 if user already exists', async () => {
    users.push({ email: 'test@example.com', password: 'hashed-pass' });

    const req = {
      json: async () => ({ email: 'test@example.com', password: '123456' })
    };

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(400);
    expect(data).toEqual({ error: 'User exists' });
  });

  it('should register a new user and return success', async () => {
    const req = {
      json: async () => ({ email: 'new@example.com', password: '123456' })
    };

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual({ success: true });

    // ---- Confirm user was added
    expect(users).toContainEqual({
      email: 'new@example.com',
      password: 'hashed-123456'
    });

    // ---- Confirm cookie was set
    expect(mockSet).toHaveBeenCalledWith('token', 'mocked_token', { httpOnly: true });
  });
});

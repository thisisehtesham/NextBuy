import { describe, it, expect, vi, beforeEach } from 'vitest';
import { POST } from '@/app/api/login/route';

const mockSet = vi.fn();

vi.mock('@/lib/db', () => ({
  users: [
    { email: 'test@example.com', password: 'hashedPass' }
  ]
}));

vi.mock('@/lib/auth', () => ({
  comparePasswords: vi.fn(),
  generateToken: vi.fn(() => 'mocked_token')
}));

vi.mock('next/headers', () => ({
  cookies: vi.fn(() => ({
    set: mockSet
  }))
}));

describe('POST /api/login', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should return 401 for invalid credentials', async () => {
    const req = {
      json: async () => ({
        email: 'wrong@example.com',
        password: '123456'
      })
    };

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(401);
    expect(data).toEqual({ error: 'Invalid credentials' });
  });

  it('should return 401 if password does not match', async () => {
    const { comparePasswords } = await import('@/lib/auth');
    comparePasswords.mockResolvedValue(false);

    const req = {
      json: async () => ({
        email: 'test@example.com',
        password: 'wrongpass'
      })
    };

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(401);
    expect(data).toEqual({ error: 'Invalid credentials' });
  });

  it('should return success and set cookie on valid credentials', async () => {
    const { comparePasswords } = await import('@/lib/auth');
    comparePasswords.mockResolvedValue(true);

    const req = {
      json: async () => ({
        email: 'test@example.com',
        password: 'correctpass'
      })
    };

    const res = await POST(req);
    const data = await res.json();

    expect(res.status).toBe(200);
    expect(data).toEqual({ success: true });
    expect(mockSet).toHaveBeenCalledWith('token', 'mocked_token', { httpOnly: true });
  });
});

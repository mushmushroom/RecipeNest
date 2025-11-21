'use client';
import { BACKEND_URL } from '@/lib/constants';
import { useRef } from 'react';

export default function SignUpPage() {
  const data = useRef({
    username: '',
    email: '',
    password: '',
  });

  const register = async () => {
    console.log(`${BACKEND_URL}/register`);
    const res = await fetch(`${BACKEND_URL}/auth/register`, {
      method: 'POST',
      body: JSON.stringify({
        username: data.current.username,
        email: data.current.email,
        password: data.current.password,
      }),
      headers: {
        'Content-type': 'application/json',
      },
    });

    if (!res.ok) {
      console.log(res.statusText);
      return;
    }

    const response = await res.json();
    alert('User registered');
  };

  return (
    <div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          placeholder="username"
          onChange={(e) => (data.current.username = e.currentTarget.value)}
        />
      </div>
      <div>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          placeholder="email"
          onChange={(e) => (data.current.email = e.currentTarget.value)}
        />
      </div>
      <div>
        <label htmlFor="password">password</label>
        <input
          id="password"
          placeholder="password"
          onChange={(e) => (data.current.password = e.currentTarget.value)}
        />
      </div>
      <button onClick={register}>Register</button>
    </div>
  );
}

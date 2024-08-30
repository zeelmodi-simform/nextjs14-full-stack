'use client'

import { authenticate } from '@/lib/actions';
import { useState } from 'react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

type Props = {}

const LoginForm = (props: Props) => {

    const [err, setErr] = useState('')

    const handleLogin = async (formData: FormData) => {
        const data = await authenticate(formData);

        if (data?.error) {
            setErr(data?.error)
        }
    };

    return (
        <form action={ handleLogin }>
            <div className="grid gap-4">
                <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        name="email"
                        id="email"
                        type="email"
                        placeholder="m@example.com"
                        required
                    />
                </div>
                <div className="grid gap-2">
                    <div className="flex items-center">
                        <Label htmlFor="password">Password</Label>
                    </div>
                    <Input id="password" name="password" type="password" required />
                </div>
                <Button type="submit" className="w-full">
                    Login
                </Button>
                <Button variant="outline" className="w-full">
                    Login with Google
                </Button>
            </div>
            {/* <div className="mt-4 text-center text-sm">
                Don&apos;t have an account?{ " " }
                <Link href="#" className="underline">
                    Sign up
                </Link>
            </div> */}
        </form>
    )
};

export default LoginForm
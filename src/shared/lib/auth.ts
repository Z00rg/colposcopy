import { cookies } from 'next/headers';

export async function getUserRole(): Promise<'admin' | 'worker' | null> {
    const cookieStore = await cookies();
    const userRole = cookieStore.get('user_role');

    if (userRole?.value === 'admin' || userRole?.value === 'worker') {
        return userRole.value;
    }

    return null;
}

export async function isAdmin(): Promise<boolean> {
    const role = await getUserRole();
    return role === 'admin';
}
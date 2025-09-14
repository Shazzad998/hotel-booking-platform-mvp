import { dashboard, home, login, register } from '@/routes';
import { Flash, SharedData } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { useEffect } from 'react';
import { toast } from 'sonner';

const WebHeader = () => {
    const { auth } = usePage<SharedData>().props;

    const flash = usePage().props.flash as Flash;
    useEffect(() => {
        if (flash.success) {
            toast.success(flash.success);
        }
        if (flash.info) {
            toast.info(flash.info);
        }
        if (flash.warning) {
            toast.warning(flash.warning);
        }
        if (flash.error) {
            toast.error(flash.error);
        }
    }, [flash]);
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-background text-sm opacity-100 transition-opacity duration-750 starting:opacity-0">
            <nav className="container mx-auto flex items-center justify-between gap-4 px-2 py-2 xl:max-w-5xl">
                <Link href={home()}><img src="/images/logo.svg" alt="" className="h-12 w-20 object-contain" /></Link>
                
                <div className="flex items-center justify-end gap-4">
                    {auth.user ? (
                        <Link
                            href={dashboard()}
                            className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                        >
                            Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                href={login()}
                                className="inline-block rounded-sm border border-transparent px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#19140035] dark:text-[#EDEDEC] dark:hover:border-[#3E3E3A]"
                            >
                                Log in
                            </Link>
                            <Link
                                href={register()}
                                className="inline-block rounded-sm border border-[#19140035] px-5 py-1.5 text-sm leading-normal text-[#1b1b18] hover:border-[#1915014a] dark:border-[#3E3E3A] dark:text-[#EDEDEC] dark:hover:border-[#62605b]"
                            >
                                Register
                            </Link>
                        </>
                    )}
                </div>
            </nav>
        </header>
    );
};

export default WebHeader;

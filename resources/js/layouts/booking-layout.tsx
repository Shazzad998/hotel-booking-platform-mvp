
import { type ReactNode } from 'react';
import WebHeader from './web/header';
import { Toaster } from '@/components/ui/sonner';

interface BookingLayoutProps {
    children: ReactNode;
}

export default ({ children, ...props }: BookingLayoutProps) => {
    return (
        <div className="flex min-h-screen flex-col items-center bg-background text-foreground">
            <WebHeader />
            <main className="flex flex-col container xl:max-w-5xl mx-auto px-2 py-8">
                {children}
                <Toaster richColors position="top-right" />
            </main>
        </div>
    );
};

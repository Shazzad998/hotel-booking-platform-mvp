import HeaderSearch from '@/components/web/HeaderSearch';
import { type ReactNode } from 'react';
import WebHeader from './web/header';
import Footer from './web/footer';

interface WebLayoutProps {
    children: ReactNode;
}

export default ({ children, ...props }: WebLayoutProps) => {
    return (
        <div className="flex min-h-screen flex-col items-center bg-background text-foreground">
            <WebHeader />
            <main className="flex flex-col container xl:max-w-5xl mx-auto px-2">
                {children}


                <Footer/>
            </main>
        </div>
    );
};

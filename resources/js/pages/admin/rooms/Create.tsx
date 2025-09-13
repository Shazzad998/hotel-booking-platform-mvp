import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import Form from './Form';
import rooms from '@/routes/admin/rooms';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Rooms',
        href: rooms.index().url,
    },
    {
        title: 'Create',
        href: rooms.create().url,
    },
];

const Create = () => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const handleSubmit = (data: any, reset?: () => void) => {
        router.post(rooms.store(), data, {
            onSuccess: () => {
                reset?.();
            },
            onError: (error) => {
                setErrors(error);
            },
        });
    };
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Create Room" />

            <div className="grid gap-4 py-8">
                <Card className="border-none pt-0 shadow-none">
                    <CardHeader>
                        <CardTitle>Create Room</CardTitle>
                        <CardDescription>
                            Fields marked with <span className="text-red-500">*</span> are required.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form onSubmit={handleSubmit} errors={errors} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default Create;

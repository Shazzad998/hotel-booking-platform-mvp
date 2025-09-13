import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { useState } from 'react';
import Form from './Form';
import roomTypes from '@/routes/admin/room-types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Room Types',
        href: roomTypes.index().url,
    },
    {
        title: 'Create',
        href: roomTypes.create().url,
    },
];

const Create = () => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const handleSubmit = (data: any, reset?: () => void) => {
        router.post(roomTypes.store(), data, {
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
            <Head title="Create Room Type" />

            <div className="grid gap-4 py-8">
                <Card className="border-none pt-0 shadow-none">
                    <CardHeader>
                        <CardTitle>Create Room Type</CardTitle>
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

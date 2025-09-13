import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import hotels from '@/routes/admin/hotels';
import { BreadcrumbItem } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Form from './Form';
import roomTypes from '@/routes/admin/room-types';

const Edit = () => {
    const roomType = usePage().props.roomType as any;

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: dashboard().url,
        },
        {
            title: 'Room Type',
            href: roomTypes.index().url,
        },
    ];

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleSubmit = (data: any) => {
        router.post(roomTypes.update(roomType.id), data, {
            onError: (error) => {
                setErrors(error);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Update Room Type" />

            <div className="grid gap-4 p-4 py-8">
                <Card className="border-none pt-0 shadow-none">
                    <CardHeader>
                        <CardTitle>Update Room Type</CardTitle>
                        <CardDescription>Fields marked with <span className="text-red-500">*</span> are required.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form roomType={roomType} onSubmit={handleSubmit} errors={errors} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default Edit;

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { BreadcrumbItem, Room } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Form from './Form';
import rooms from '@/routes/admin/rooms';

const Edit = () => {
    const room = usePage().props.room as Room;
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
            title: room.room_number,
            href: '',
        },
    ];

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleSubmit = (data: any) => {
        router.post(rooms.update(room.id), data, {
            onError: (error) => {
                setErrors(error);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Update Room" />

            <div className="grid gap-4 p-4 py-8">
                <Card className="border-none pt-0 shadow-none">
                    <CardHeader>
                        <CardTitle>Update Room</CardTitle>
                        <CardDescription>Fields marked with <span className="text-red-500">*</span> are required.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form room={room} onSubmit={handleSubmit} errors={errors} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default Edit;

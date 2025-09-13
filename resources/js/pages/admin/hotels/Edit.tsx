import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import hotels from '@/routes/admin/hotels';
import { BreadcrumbItem, Hotel } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { useState } from 'react';
import Form from './Form';

const Edit = () => {
    const hotel = usePage().props.hotel as Hotel;

    console.log(hotel)

    const breadcrumbs: BreadcrumbItem[] = [
        {
            title: 'Dashboard',
            href: dashboard().url,
        },
        {
            title: 'Hotels',
            href: hotels.index().url,
        },
        {
            title: hotel.name,
            href: "",
        },
    ];

    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleSubmit = (data: any) => {
        router.post(hotels.update(hotel.id), data, {
            onError: (error) => {
                console.log(error)
                setErrors(error);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Update Hotel" />

            <div className="grid gap-4 p-4 py-8">
                <Card className="border-none pt-0 shadow-none">
                    <CardHeader>
                        <CardTitle>Update Hotel</CardTitle>
                        <CardDescription>Fields marked with <span className="text-red-500">*</span> are required.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Form hotel={hotel} onSubmit={handleSubmit} errors={errors} />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default Edit;

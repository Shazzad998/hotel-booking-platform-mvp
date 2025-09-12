import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import hotels from '@/routes/admin/hotels';
import { BreadcrumbItem, Hotel } from '@/types';
import { Head, Link, usePage } from '@inertiajs/react';
import { MapPin } from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Hotels',
        href: hotels.index().url,
    },
];

const Show = () => {
    const hotel = usePage().props.hotel as Hotel;
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Update Hotel" />

            <div className="px-4 py-8">
                <div className="mb-4 flex justify-end gap-3">
                    <Button variant="secondary" asChild>
                        <Link href={hotels.index()}>Back to List</Link>
                    </Button>
                    <Button variant="default" asChild>
                        <Link href={hotels.edit(hotel.id).url}>Edit</Link>
                    </Button>
                </div>
                <Card className="rounded-2xl shadow-md">
                    <CardHeader>
                        <CardTitle className="text-2xl font-bold">{hotel.name}</CardTitle>
                        <p className="flex items-center gap-2 text-sm text-muted-foreground">
                            <MapPin size={20} /> {hotel.address}, {hotel.city}, {hotel.country}
                        </p>
                    </CardHeader>

                    <CardContent className="space-y-6">
                        <div>
                            <p className="font-medium">Star Rating:</p>
                            <div className="flex items-center gap-1">
                                {[...Array(hotel.star_rating)].map((_, i) => (
                                    <span key={i} className="text-yellow-500">
                                        ★
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div>
                            <p className="font-medium">Status:</p>
                            <Badge variant={hotel.status === 'active' ? 'default' : 'destructive'}>{hotel.status}</Badge>
                        </div>

                        {hotel.description && (
                            <div>
                                <p className="font-medium">Description:</p>
                                <p className="text-muted-foreground">{hotel.description}</p>
                            </div>
                        )}

                        {hotel?.images && hotel?.images?.length > 0 && (
                            <div className="mt-6 flex flex-wrap gap-4">
                                {(hotel?.images ? JSON.parse(hotel?.images) : []).map((img: string) => (
                                    <Card key={img}>
                                        <CardContent>
                                            <img src={`/storage/${img}`} alt={hotel.name} className="h-32 w-32 rounded-xl object-cover" />
                                        </CardContent>
                                    </Card>
                                ))}
                            </div>
                        )}
                    </CardContent>
                </Card>
            </div>

        </AppLayout>
    );
};

export default Show;

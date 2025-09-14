import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import HeaderSearch from '@/components/web/HeaderSearch';
import WebLayout from '@/layouts/web-layout';
import { home } from '@/routes';
import hotels from '@/routes/hotels';
import { Hotel } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { MapPin } from 'lucide-react';

const Search = () => {
    const hotels_resource = usePage().props.hotels as Hotel[];
    return (
        <WebLayout>
            <HeaderSearch/>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {hotels_resource.map((hotel) => (
                    <Card key={hotel.id} className="overflow-hidden rounded-2xl shadow transition hover:shadow-lg py-0">
                        <Link href={hotels.show(hotel.slug)}>
                        {hotel.images?.[0] && (<img src={hotel.images?.[0]} alt={hotel.name} className="h-40 w-full object-cover" />)}
                            
                            <CardHeader>
                                <CardTitle className="text-lg font-semibold mt-4
                                ">{hotel.name}</CardTitle>
                                <div className="flex items-start text-sm text-gray-500">
                                    <MapPin className="mr-1 h-4 w-4" />
                                    {hotel.address}, {hotel.city}
                                </div>
                            </CardHeader>
                            <CardContent className='my-6'>
                                {hotel.price_start_from && (
                                    <p className="text-sm font-medium">
                                        $ {hotel.price_start_from} <span className="text-gray-500">/ night</span>
                                    </p>
                                )}
                            </CardContent>
                        </Link>
                    </Card>
                ))}
            </div>
        </WebLayout>
    );
};

export default Search;

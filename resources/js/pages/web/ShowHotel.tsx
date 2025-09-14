import { Carousel, CarouselMainContainer, CarouselThumbsContainer, SliderMainItem, SliderThumbItem } from '@/components/Carousel';
import { DatePickerWithRange } from '@/components/DatePickerWithRange';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import HeaderSearch from '@/components/web/HeaderSearch';
import WebLayout from '@/layouts/web-layout';
import booking from '@/routes/booking';
import hotels from '@/routes/hotels';
import { Hotel, QueryFilters, Room } from '@/types';
import { router, useForm, usePage } from '@inertiajs/react';
import { Check, MapPin, Search, Star } from 'lucide-react';
import { useState } from 'react';
import { DateRange } from 'react-day-picker';

const ShowHotel = () => {
    const hotel = usePage().props.hotel as Hotel;
    const rooms = usePage().props.rooms as Room[];
    const { filters } = usePage<{ filters: QueryFilters }>().props;
    const hotelImages = hotel.images;

    const today = new Date();
    const twoDaysLater = new Date();
    twoDaysLater.setDate(today.getDate() + 2);
    // Convert filters.from / filters.to (strings) into Date objects, or fallback
    const fromDate = filters.from ? new Date(filters.from) : today;
    const toDate = filters.to ? new Date(filters.to) : twoDaysLater;

    // DateRange state for your date picker
    const [date, setDate] = useState<DateRange | undefined>({
        from: fromDate,
        to: toDate,
    });

    // Form state
    const { data, setData } = useForm({
        hotel_id: hotel?.id || '',
        room_id: '',
        number_of_rooms: filters.number_of_rooms || '1',
        number_of_guests: filters.number_of_guests || '1',
        from: fromDate.toISOString(),
        to: toDate.toISOString(),
    });

    const handleBookNow = (roomId: string) => {
        setData((prev) => {
            const updated = { ...prev, room_id: roomId };
            router.get(booking.create(), updated);
            return updated;
        });

        console.log(data);
    };

    const handleSearch = () => {
        router.get(hotels.show(hotel.slug), data);
    };

    return (
        <WebLayout>
            <HeaderSearch/>
            <div className="mx-auto max-w-5xl">
                <Carousel orientation="vertical" className="flex items-center justify-center sm:gap-2">
                    <div className="relative basis-3/4">
                        <CarouselMainContainer className="aspect-video h-40 sm:h-60 md:h-72">
                            {hotelImages?.map((image, index) => (
                                <SliderMainItem key={index} className="rounded-md border border-muted">
                                    <img src={image} alt={hotel.name} className="aspect-video rounded-md" />
                                </SliderMainItem>
                            ))}
                        </CarouselMainContainer>
                    </div>
                    <CarouselThumbsContainer className="h-40 basis-1/4 sm:h-60 md:h-72">
                        {hotelImages?.map((image, index) => (
                            <SliderThumbItem key={index} index={index} className="rounded-md bg-transparent">
                                <span className="flex h-full w-full cursor-pointer items-center justify-center rounded-md border border-muted bg-background">
                                    <img src={image} alt="" className="h-full w-full rounded-md object-cover" />
                                </span>
                            </SliderThumbItem>
                        ))}
                    </CarouselThumbsContainer>
                </Carousel>
            </div>
            <div className="px-4">
                <div className="mt-8 flex flex-col items-start justify-between gap-2 md:flex-row">
                    <div className="space-y-2 text-lg">
                        <h2 className="text-3xl font-medium">{hotel.name}</h2>
                        <div className="flex items-start gap-2">
                            <MapPin /> <span>{`${hotel.address} , ${hotel.city} , ${hotel.country}`}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Star /> <span>{`${hotel.star_rating} Star Rated Property`}</span>
                        </div>
                    </div>

                    <div className="flex flex-col gap-2 md:text-end">
                        <span className="text-xl">Starts From</span>
                        <span className="text-2xl font-semibold">USD {hotel.price_start_from} / Night</span>
                    </div>
                </div>

                <div className="mt-8">
                    <div className="flex items-center gap-6 border-y py-4 font-medium uppercase">
                        <a href="#overview">Overview</a>
                        <a href="#rooms">Rooms</a>
                    </div>

                    <div id="overview" className="mt-8">
                        <h3 className="text-2xl">Hotel Overview</h3>
                        <p>{hotel.description}</p>
                    </div>

                    <hr className="my-8" />

                    <div className="mb-8 flex flex-wrap justify-center gap-4 md:justify-start">
                        {/* Date Picker */}
                        <DatePickerWithRange
                            date={date}
                            setDate={setDate}
                            onApply={() => {
                                setData('from', date?.from?.toISOString() || '');
                                setData('to', date?.to?.toISOString() || '');
                            }}
                            placeHolder="Check In - Check Out"
                            className="w-80"
                        />

                        {/* Rooms Picker */}
                        <Select value={data.number_of_rooms} onValueChange={(value) => setData('number_of_rooms', value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select number of rooms" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {[...Array(10)].map((_, i) => (
                                        <SelectItem key={i + 1} value={String(i + 1)}>
                                            {i + 1} Room{i + 1 > 1 ? 's' : ''}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>

                        {/* Guest Picker */}
                        <Select value={data.number_of_guests} onValueChange={(value) => setData('number_of_guests', value)}>
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Select number of rooms" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {[...Array(10)].map((_, i) => (
                                        <SelectItem key={i + 1} value={String(i + 1)}>
                                            {i + 1} Guest{i + 1 > 1 ? 's' : ''}
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                        <Button size={'icon'} onClick={handleSearch}>
                            <Search />
                        </Button>
                    </div>

                    <div id="rooms">
                        <h3 className="mb-4 text-2xl">Available Rooms</h3>
                        <div className="flex flex-col">
                            {rooms.map((room) => (
                                <div key={room.id} className="flex flex-col rounded-md border p-4 sm:flex-row">
                                    <div className="flex grow items-center gap-2">
                                        <Carousel orientation="horizontal" className="w-40">
                                            <div className="relative basis-3/4">
                                                <CarouselMainContainer className="aspect-square h-40 w-40">
                                                    {room.images?.map((image, index) => (
                                                        <SliderMainItem key={index} className="rounded-md border border-muted">
                                                            <img src={image} alt={hotel.name} className="aspect-square rounded-md" />
                                                        </SliderMainItem>
                                                    ))}
                                                </CarouselMainContainer>
                                            </div>
                                        </Carousel>
                                        <div className="flex flex-col gap-2">
                                            <span className="font-medium">{room.room_type?.name}</span>
                                            <span className="text-xl font-bold">USD {room.price_per_night} per night</span>
                                            <div className="flex flex-wrap gap-2">
                                                {room.room_type?.facilities?.map((facility) => (
                                                    <Badge key={facility} variant={'outline'}>
                                                        <Check size={14} /> {facility}
                                                    </Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-4 flex items-center justify-center gap-4 text-center sm:mt-0 sm:flex-col sm:gap-2">
                                        <div className="flex items-center gap-4 sm:flex-col">
                                            <span className="text-lg font-medium">USD {room.price_per_night}</span>
                                            <span>Per Night</span>
                                        </div>

                                        <Button onClick={() => handleBookNow(room.id.toString())}>Book Now</Button>
                                    </div>
                                </div>
                            ))}

                            {rooms.length < 1 && (
                                <Card>
                                    <CardContent>No Rooms Found</CardContent>
                                </Card>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </WebLayout>
    );
};

export default ShowHotel;

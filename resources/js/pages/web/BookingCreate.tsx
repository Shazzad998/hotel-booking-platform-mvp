'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Separator } from '@/components/ui/separator';
import BookingLayout from '@/layouts/booking-layout';
import { login, register } from '@/routes';
import booking from '@/routes/booking';
import { Hotel, Room, SharedData } from '@/types';
import { Link, router, useForm, usePage } from '@inertiajs/react';
import { Star } from 'lucide-react';

type BookingPageProps = {
    hotel: Hotel;
    room: Room;
    check_in: string;
    check_out: string;
    guests: number;
    rooms: number;
    nights: number;
};

export default function BookingPage() {
    const { hotel, room, check_in, check_out, guests, rooms, nights } = usePage<BookingPageProps>().props;
    const { auth } = usePage<SharedData>().props;
    const { data, setData, errors } = useForm({
        name: auth.user?.name || '',
        email: auth.user?.email || '',
        phone: auth.user?.phone || '',
        hotel_id: hotel.id || '',
        room_id: room.id || '',
        start_date: check_in || '',
        end_date: check_out || '',
        guests: guests || 1,
        rooms: rooms || 1,
    });

    const handleSubmit = () => {
        router.post(booking.store(), data, {});
    };

    return (
        <BookingLayout>
            <div className="grid w-full max-w-6xl grid-cols-1 gap-6 lg:grid-cols-3">
                {/* Left Side - Form */}
                <div className="rounded-xl bg-white p-6 shadow lg:col-span-2">
                    <h1 className="mb-2 text-2xl font-bold">Confirm Your Stay</h1>

                    {!auth.user && (
                        <p className="mb-6 text-sm text-gray-600">
                            <Link href={login()}>Login</Link>
                             or  <Link href={register()}><span className="cursor-pointer text-blue-600">create an account</span></Link> to receive up to 10% discount on your
                            booking.
                        </p>
                    )}

                    <form
                        className="space-y-6"
                        onSubmit={(e) => {
                            e.preventDefault();
                            handleSubmit();
                        }}
                    >
                        <div>
                            <Label>Guest Name *</Label>
                            <Input placeholder="GUest Name" required value={data.name} onChange={(e) => setData('name', e.target.value)} />
                        </div>

                        <div>
                            <Label>Email address *</Label>
                            <Input
                                type="email"
                                placeholder="you@example.com"
                                required
                                value={data.email}
                                onChange={(e) => setData('email', e.target.value)}
                            />
                            <p className="text-xs text-gray-500">Confirmation email goes to this address.</p>
                        </div>

                        <div>
                            <Label>Phone Number *</Label>
                            <Input
                                type="tel"
                                placeholder="+880 1234-567890"
                                required
                                value={data.phone}
                                onChange={(e) => setData('phone', e.target.value)}
                            />
                            <p className="text-xs text-gray-500">Please write the phone number with country code.</p>
                        </div>

                        <Button type="submit" className="w-full">
                            Confirm Booking
                        </Button>
                    </form>
                </div>

                {/* Right Side - Booking Details */}
                <div className="space-y-6">
                    {/* Hotel Info */}
                    <Card>
                        <CardContent className="p-4">
                            <div className="flex gap-4">
                                <img src="/images/fake-hotel-1.jpg" alt="Hotel" className="h-24 w-24 rounded object-cover" />
                                <div className="space-y-1">
                                    <h2 className="text-lg font-bold">{hotel.name}</h2>
                                    <p className="text-sm text-gray-600">
                                        <span>{`${hotel.address} , ${hotel.city} , ${hotel.country}`}</span>
                                    </p>
                                    <p className="flex gap-1 text-sm text-yellow-500">
                                        {[...Array(hotel.star_rating)].map((_, i) => (
                                            <Star size={14} />
                                        ))}
                                    </p>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    {/* Booking Details */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Your booking details</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <p>Check-in</p>
                                <p>{check_in}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Check-out</p>
                                <p>{check_out}</p>
                            </div>
                            <Separator />
                            <p>
                                Total length of stay: <b>{nights} nights</b>
                            </p>
                            <p>
                                You selected:{' '}
                                <b>
                                    {rooms} room for {guests} guest
                                </b>
                            </p>
                        </CardContent>
                    </Card>

                    {/* Booking Summary */}
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-base">Booking Summary</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2 text-sm">
                            <div className="flex justify-between">
                                <p>Total Guests</p>
                                <p>{guests}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Total Rooms</p>
                                <p>{rooms}</p>
                            </div>
                            <div className="flex justify-between">
                                <p>Total Nights</p>
                                <p>2</p>
                            </div>
                            <Separator />
                            <div className="flex justify-between">
                                <p>Price per Night</p>
                                <p>BDT {room.price_per_night}</p>
                            </div>
                            <Separator />
                            <div className="flex justify-between text-lg font-bold">
                                <p>Total</p>
                                <p>BDT {nights * Number(room.price_per_night)}</p>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </BookingLayout>
    );
}

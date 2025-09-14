import BookingCancelConfirm from '@/components/BookingCancelConfirm';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import BookingLayout from '@/layouts/booking-layout';
import bookings from '@/routes/bookings';
import { router } from '@inertiajs/react';
import { useState } from 'react';

interface BookingProps {
    booking: any;
    canCancel: boolean;
}

export default function BookingShow({ booking, canCancel }: BookingProps) {

    const [cacelDialogOpen, setCancelDialogOpen] = useState(false);
    const handleCancel = () => {
        // if (confirm("Are you sure you want to cancel this booking?")) {
        //
        // }
        router.post(bookings.cancel(booking.id));
    };

    return (
        <BookingLayout>
            <BookingCancelConfirm open={cacelDialogOpen} opOpenChange={setCancelDialogOpen} onConfirm={handleCancel} />
            <Card>
                <CardHeader>
                    <CardTitle>Booking Details</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <p>
                        <strong>Reference:</strong> {booking.reference}
                    </p>
                    <p>
                        <strong>Hotel:</strong> {booking.hotel?.name}
                    </p>
                    <p>
                        <strong>Room:</strong> {booking.room?.room_number}{' '}
                        {booking.room?.room_type?.name ? `(${booking.room?.room_type?.name})` : null}
                    </p>
                    <p>
                        <strong>Guest:</strong> {booking.name}
                    </p>
                    <p>
                        <strong>Email:</strong> {booking.email}
                    </p>
                    <p>
                        <strong>Phone:</strong> {booking.phone}
                    </p>
                    <p>
                        <strong>Start Date:</strong> {booking.start_date}
                    </p>
                    <p>
                        <strong>End Date:</strong> {booking.end_date}
                    </p>
                    <p>
                        <strong>Status:</strong> <StatusBadge status={booking.status} />
                    </p>
                    <p>
                        <strong>Total:</strong> ${booking.total}
                    </p>

                    <div className="space-y-2">
                        <Button
                            variant="destructive"
                            disabled={!canCancel}
                            onClick={() => setCancelDialogOpen(true)}
                        >
                            Cancel Booking
                        </Button>

                        {!canCancel && booking.status !== 'cancelled' && (
                            <p className="text-sm text-muted-foreground">
                                You can only cancel a booking at least <strong>36 hours</strong> before the start time.
                            </p>
                        )}
                    </div>
                </CardContent>
            </Card>
        </BookingLayout>
    );
}

function StatusBadge({ status }: { status: string }) {
    const getVariant = (status: string) => {
        switch (status) {
            case 'pending':
                return 'secondary'; // gray
            case 'confirmed':
                return 'default'; // primary
            case 'cancelled':
                return 'destructive'; // red
            case 'checked_in':
                return 'outline'; // maybe blue border
            case 'checked_out':
                return 'outline'; // maybe gray border
            default:
                return 'secondary';
        }
    };

    return <Badge variant={getVariant(status)}>{status.replace('_', ' ')}</Badge>;
}

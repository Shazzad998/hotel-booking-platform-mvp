import { Badge } from '@/components/ui/badge';
import { DataTableColumn, Room } from '@/types';

export const columns: DataTableColumn[] = [
    {
        title: 'ID',
        field: 'id',
    },

    {
        title: 'Room No',
        field: 'room_number',
    },
    {
        title: 'Price/Night',
        field: 'price_per_night',
        render: (item: Room) => {
            return <span> $ {item.price_per_night}</span>;
            
        },
    },

    {
        title: 'Room Type',
        field: 'room_type_id',
        render: (item: Room) => {
            if (item.room_type) {
                return <span>{item.room_type.name}</span>;
            } else {
                return <span> &mdash;</span>;
            }
        },
    },
    {
        title: 'Hotel',
        field: 'hotel_id',
        render: (item: Room) => {
            if (item.hotel) {
                return <span>{item.hotel.name}</span>;
            } else {
                return <span> &mdash;</span>;
            }
        },
    },

    {
        title: 'Status',
        field: 'status',
        render: (item: Room) => {
            return (
                <Badge variant={item.status == 'available' ? 'default' : (item.status == 'booked'? "destructive" : "secondary")}>
                    {item.status == 'available' ? 'Available' : item.status == 'booked' ? 'Booked' : 'Under Maintance'}
                </Badge>
            );
        },
    },
    {
        title: 'Created at',
        field: 'created_at',
    },
];

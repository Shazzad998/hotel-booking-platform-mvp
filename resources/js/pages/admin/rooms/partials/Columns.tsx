import { Badge } from '@/components/ui/badge';
import { DataTableColumn, Hotel } from '@/types';

export const columns: DataTableColumn[] = [
    {
        title: 'ID',
        field: 'id',
    },

    {
        title: 'Name',
        field: 'name',
    },

    {
        title: 'Address',
        field: 'address',
        sortable: false,
    },

    {
        title: 'City',
        field: 'city',
    },
    {
        title: 'Country',
        field: 'country',
    },

    {
        title: 'Status',
        field: 'status',
        render: (item: Hotel) => {
            return <Badge variant={item.status == 'active' ? 'default' : 'secondary'}>{item.status == 'active' ? 'Active' : 'Inactive'}</Badge>;
        },
    },
    {
        title: 'Created at',
        field: 'created_at',
    },
];

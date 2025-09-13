
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
        title: 'Bedrooms',
        field: 'no_of_bedrooms',
    },
    {
        title: 'Max Guests',
        field: 'max_guests',
    },

    {
        title: 'Created at',
        field: 'created_at',
    },
];

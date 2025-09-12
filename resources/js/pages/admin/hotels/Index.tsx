import DataTable from '@/components/DataTable';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import hotels from '@/routes/admin/hotels';
import { BreadcrumbItem, DataTableAction, DataTableBulkAction, DataTableColumn, Hotel, ResourceData } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Eye, Pencil, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { columns } from './partials/Columns';
import DeleteConfirm from '@/components/DeleteConfirm';

type Props = {};

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

const Index = (props: Props) => {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectedAllItems, setSelectedAllItems] = useState<boolean>(false);
    const [deleteIds, setDeleteIds] = useState<number[]>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const companies = usePage().props.data as ResourceData;


    const handleEdit = (id:number) => {
        router.get(hotels.edit(id))
    };

    const handleShow = (id:number) => {
        router.get(hotels.show(id))
    };

    const confirmBulkDelete = (ids: number[]) => {
        setDeleteIds(ids);
        setDeleteDialogOpen(true);
    };
    const confirmDelete = (id: number) => {
        setDeleteIds([id]);
        setDeleteDialogOpen(true);
    };

    const deleteItem = () => {
        if (deleteIds.length > 0) {
            router.post(
                hotels.bulkDelete(),
                {
                    ids: deleteIds,
                },
                {
                    onSuccess: () => {
                        setDeleteDialogOpen(false);
                        setDeleteIds([]);
                        setSelectedItems([]);
                        setSelectedAllItems(false);
                    },
                },
            );
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Hotels" />

            <DeleteConfirm open={deleteDialogOpen} opOpenChange={setDeleteDialogOpen} onConfirm={deleteItem} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
            <DataTable
                    resource={companies}
                    columns={columns}
                    list_route={hotels.index().url}
                    selected={selectedItems}
                    setSelected={setSelectedItems}
                    selectedAll={selectedAllItems}
                    setSelectedAll={setSelectedAllItems}
                    handleShow = {handleShow}
                    handleEdit={handleEdit}
                    confirmDelete={confirmDelete}
                    confirmBulkDelete={confirmBulkDelete}
                />

            </div>
        </AppLayout>
    );
};

export default Index;

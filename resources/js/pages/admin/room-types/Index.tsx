import DataTable from '@/components/DataTable';
import DeleteConfirm from '@/components/DeleteConfirm';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import hotels from '@/routes/admin/hotels';
import { BreadcrumbItem, ResourceData } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { HousePlus } from 'lucide-react';
import { useState } from 'react';
import { columns } from './partials/Columns';
import NoDataFound from '@/components/NoDataFound';
import { dashboard } from '@/routes';
import roomTypes from '@/routes/admin/room-types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Room Types',
        href: roomTypes.index().url
    },
];

const Index = () => {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectedAllItems, setSelectedAllItems] = useState<boolean>(false);
    const [deleteIds, setDeleteIds] = useState<number[]>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    //Paginated hotels list
    const room_type_resource = usePage().props.data as ResourceData;

    //Redirect to create page
    const handleCreate = () => {
        router.get(roomTypes.create());
    };
    //Redirect to edit page
    const handleEdit = (id: number) => {
        router.get(roomTypes.edit(id));
    };

    //Redirect to show page
    const handleShow = (id: number) => {
        router.get(roomTypes.show(id));
    };

    //Show confirmation message
    const confirmBulkDelete = (ids: number[]) => {
        setDeleteIds(ids);
        setDeleteDialogOpen(true);
    };

    //Show confirmation message
    const confirmDelete = (id: number) => {
        setDeleteIds([id]);
        setDeleteDialogOpen(true);
    };

    //Delete the selected items
    const deleteItem = () => {
        if (deleteIds.length > 0) {
            router.post(
                roomTypes.bulkDelete(),
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
            <Head title="Room Types" />

            <DeleteConfirm open={deleteDialogOpen} opOpenChange={setDeleteDialogOpen} onConfirm={deleteItem} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-wrap items-center justify-between">
                    <h1 className="text-2xl font-bold">Room Types</h1>
                    <Button onClick={() => handleCreate()}>
                        <HousePlus /> Add Room Type
                    </Button>
                </div>
                {room_type_resource.data.length > 0? (<DataTable
                    resource={room_type_resource}
                    columns={columns}
                    list_route={roomTypes.index().url}
                    selected={selectedItems}
                    setSelected={setSelectedItems}
                    selectedAll={selectedAllItems}
                    setSelectedAll={setSelectedAllItems}
                    handleShow={handleShow}
                    handleEdit={handleEdit}
                    confirmDelete={confirmDelete}
                    confirmBulkDelete={confirmBulkDelete}
                />) : (<NoDataFound createData={<Button onClick={() => handleCreate()}>
                        <HousePlus /> Add Room Types
                    </Button>}/>)}
                
            </div>
        </AppLayout>
    );
};

export default Index;

import DataTable from '@/components/DataTable';
import DeleteConfirm from '@/components/DeleteConfirm';
import NoDataFound from '@/components/NoDataFound';
import { Button } from '@/components/ui/button';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import rooms from '@/routes/admin/rooms';
import { BreadcrumbItem, DataTableAction, DataTableBulkAction, ResourceData } from '@/types';
import { Head, router, usePage } from '@inertiajs/react';
import { Eye, HousePlus, Pencil, TrashIcon } from 'lucide-react';
import { useState } from 'react';
import { columns } from './partials/Columns';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Rooms',
        href: rooms.index().url,
    },
];

const Index = () => {
    const [selectedItems, setSelectedItems] = useState<number[]>([]);
    const [selectedAllItems, setSelectedAllItems] = useState<boolean>(false);
    const [deleteIds, setDeleteIds] = useState<number[]>([]);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);

    //Paginated rooms list
    const rooms_resource = usePage().props.data as ResourceData;

    //Redirect to create page
    const handleCreate = () => {
        router.get(rooms.create());
    };
    //Redirect to edit page
    const handleEdit = (id: number) => {
        router.get(rooms.edit(id));
    };

    //Redirect to show page
    const handleShow = (id: number) => {
        router.get(rooms.show(id));
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
                rooms.bulkDelete(),
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

    const bulkActions: DataTableBulkAction[] = [
        {
            label: 'Delete',
            icon: <TrashIcon />,
            onClick: confirmBulkDelete,
        },
    ];
    const actions: DataTableAction[] = [
        {
            label: 'Show',
            icon: <Eye/>,
            onClick: handleShow,
        },
        {
            label: 'Edit',
            icon: <Pencil />,
            onClick: handleEdit,
        },
        {
            label: 'Delete',
            icon: <TrashIcon />,
            onClick: confirmDelete,
        },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Rooms" />

            <DeleteConfirm open={deleteDialogOpen} opOpenChange={setDeleteDialogOpen} onConfirm={deleteItem} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <div className="flex flex-wrap items-center justify-between">
                    <h1 className="text-2xl font-bold">Rooms</h1>
                    <Button onClick={() => handleCreate()}>
                        <HousePlus /> Add Room
                    </Button>
                </div>
                {rooms_resource.data.length > 0 ? (
                    <DataTable
                        resource={rooms_resource}
                        columns={columns}
                        list_route={rooms.index().url}
                        selected={selectedItems}
                        setSelected={setSelectedItems}
                        selectedAll={selectedAllItems}
                        setSelectedAll={setSelectedAllItems}
                        bulkActions={bulkActions}
                        actions={actions}
                    />
                ) : (
                    <NoDataFound
                        createData={
                            <Button onClick={() => handleCreate()}>
                                <HousePlus /> Add Room
                            </Button>
                        }
                    />
                )}
            </div>
        </AppLayout>
    );
};

export default Index;

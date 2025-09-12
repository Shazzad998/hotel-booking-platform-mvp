import DataPagination from '@/components/DataPagination';
import TableColumnHeader from '@/components/TableColumnHeader';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { DataTableAction, DataTableBulkAction, DataTableProps, Filters } from '@/types';
import { router, usePage } from '@inertiajs/react';
import { EllipsisVertical, Eye, Pencil, TrashIcon } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

const DataTable = ({
    resource,
    selected,
    setSelected,
    selectedAll,
    setSelectedAll,
    columns,
    list_route,
    handleShow,
    handleEdit,
    confirmDelete,
    confirmBulkDelete,
}: DataTableProps) => {
    const filters = usePage().props.filters as Filters;
    const ids = usePage().props.ids as number[];
    const [search, setSearch] = useState(filters.search || '');
    const [sort_by, setSortBy] = useState(filters.sort_by || 'id');
    const [sort_direction, setSortDirection] = useState(filters.sort_direction || 'desc');
    const [per_page, setPerPage] = useState(filters.per_page || 10);
    const [page, setPage] = useState(filters.page || 1);
    const isInitialMount = useRef(true);

    useEffect(() => {
        if (isInitialMount.current) {
            isInitialMount.current = false;
            return;
        }

        router.get(
            list_route,
            {
                search,
                sort_by,
                sort_direction,
                per_page,
                page,
            },
            {
                preserveState: true,
                preserveScroll: true,
                replace: true,
                only: ['data', 'ids'],
            },
        );
    }, [search, sort_by, sort_direction, per_page, page]);

    const handleSelectAll = (checked: boolean) => {
        if (checked) {
            setSelected(resource.data.map((item) => item.id));
        } else {
            setSelectedAll(false);
            setSelected([]);
        }
    };

    const handleSelect = (id: number) => {
        if (selected.includes(id)) {
            setSelected(selected.filter((item) => item !== id));
        } else {
            setSelected([...selected, id]);
        }
    };

    const handleSelectAllItems = () => {
        setSelectedAll(!selectedAll);
        if (!selectedAll) {
            setSelected(ids);
        } else {
            setSelected([]);
        }
    };

    const bulkActions:DataTableBulkAction[] = [
        {
            label: 'Delete',
            icon: <TrashIcon />,
            onClick: confirmBulkDelete,
        },
    ];
    const actions: DataTableAction[] = [
        {
            label: 'Show',
            icon: <Eye />,
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
    ]

    return (
        <>
            <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex flex-grow items-center gap-2">
                    <div className="flex items-center gap-2">
                        <Input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} />
                    </div>

                    {selected.length > 0 && (
                        <div className="flex items-center gap-3 text-gray-500">
                            {bulkActions.length > 0 && (
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button variant="outline">With Selected</Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {bulkActions.map((action, index) => (
                                            <DropdownMenuItem
                                                key={index}
                                                className={action.className}
                                                onSelect={() => {
                                                    requestAnimationFrame(() => {
                                                        action.onClick(selected);
                                                    });
                                                }}
                                            >
                                                {action.icon}
                                                <span>{action.label}</span>
                                            </DropdownMenuItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            )}
                            <div className="flex items-center gap-2">
                                <span className="text-sm font-medium">{`${selected.length} Selected`}</span>
                                <a className="text-foreground cursor-pointer text-sm font-medium underline" onClick={handleSelectAllItems}>
                                    {selectedAll ? 'Select none' : `Select all ${ids.length} items`}
                                </a>
                            </div>
                        </div>
                    )}
                </div>

                <div className="flex items-center gap-2">
                    <span className="text-sm text-nowrap">Per Page</span>
                    <Select value={per_page.toString()} onValueChange={(value) => setPerPage(Number(value))}>
                        <SelectTrigger>
                            <SelectValue placeholder={per_page} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="10">10</SelectItem>
                            <SelectItem value="20">20</SelectItem>
                            <SelectItem value="50">50</SelectItem>
                            <SelectItem value="100">100</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>
            <div className="flex flex-col gap-4">
                <div className="rounded-md border">
                    <div className="relative w-full">
                        <div className="overflow-x-auto">
                            <div className="inline-block min-w-full align-middle">
                                <div className="overflow-hidden">
                                    <Table>
                                        <TableHeader>
                                            <TableRow>
                                                <TableHead className="w-8 text-center">
                                                    <Checkbox checked={selected.length >= resource.data.length} onCheckedChange={handleSelectAll} />
                                                </TableHead>

                                                {actions.length && <TableHead className="w-20 text-center">Action</TableHead>}
                                                {columns.map((column, index) => (
                                                    <TableHead key={index} className="whitespace-nowrap">
                                                        {column.sortable !== false ? (
                                                            <TableColumnHeader
                                                                title={column.title}
                                                                field={column.field}
                                                                sort_by={sort_by}
                                                                sort_direction={sort_direction}
                                                                setSortBy={setSortBy}
                                                                setSortDirection={setSortDirection}
                                                            />
                                                        ) : (
                                                            column.title
                                                        )}
                                                    </TableHead>
                                                ))}
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {resource.data.map((item) => (
                                                <TableRow key={item.id}>
                                                    <TableCell className="w-8 text-center">
                                                        <Checkbox
                                                            checked={selected.includes(item.id)}
                                                            onCheckedChange={() => handleSelect(item.id)}
                                                        />
                                                    </TableCell>

                                                    {actions.length && (
                                                        <TableCell className="w-20 text-center">
                                                            <DropdownMenu>
                                                                <DropdownMenuTrigger asChild>
                                                                    <Button variant="outline" size="icon" className="size-8">
                                                                        <EllipsisVertical className="size-4" />
                                                                    </Button>
                                                                </DropdownMenuTrigger>
                                                                <DropdownMenuContent side="bottom" align="start">
                                                                    {actions.map((action, index) => (
                                                                        <DropdownMenuItem
                                                                            key={index}
                                                                            className={action.className}
                                                                            onSelect={() => {
                                                                                requestAnimationFrame(() => {
                                                                                    action.onClick(item.id);
                                                                                });
                                                                            }}
                                                                        >
                                                                            {action.icon}
                                                                            <span>{action.label}</span>
                                                                        </DropdownMenuItem>
                                                                    ))}
                                                                </DropdownMenuContent>
                                                            </DropdownMenu>
                                                        </TableCell>
                                                    )}

                                                    {columns.map((column, index) => (
                                                        <TableCell key={index} className="whitespace-nowrap">
                                                            {column.render ? column.render(item) : item[column.field]}
                                                        </TableCell>
                                                    ))}
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <DataPagination
                    page={page}
                    setPage={setPage}
                    last_page={resource.meta.last_page}
                    from={resource.meta.from}
                    to={resource.meta.to}
                    total={resource.meta.total}
                />
            </div>
        </>
    );
};

export default DataTable;

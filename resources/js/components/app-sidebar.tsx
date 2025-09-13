import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { dashboard } from '@/routes';
import { type NavItem } from '@/types';
import { Link } from '@inertiajs/react';
import { Building2, House, LayoutDashboard, LayoutGrid } from 'lucide-react';
import AppLogo from './app-logo';
import hotels from '@/routes/admin/hotels';
import roomTypes from '@/routes/admin/room-types';
import rooms from '@/routes/admin/rooms';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        href: dashboard(),
        icon: LayoutGrid,
    },
    {
        title: 'Hotels',
        href: hotels.index().url,
        icon: Building2,
    },
    {
        title: 'Room Types',
        href: roomTypes.index().url,
        icon: LayoutDashboard,
    },
    {
        title: 'Rooms',
        href: rooms.index().url,
        icon: House,
    },
];


export function AppSidebar() {
    return (
        <Sidebar collapsible="icon" variant="inset">
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href={dashboard()} prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent>
                <NavMain items={mainNavItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}

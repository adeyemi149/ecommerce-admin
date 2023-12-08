"use client"

import { Menu } from "lucide-react"
import { useParams, usePathname } from "next/navigation";
import Link from "next/link";

import { Button } from './ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from './ui/dropdown-menu'
import { cn } from "@/lib/utils";


const MenuToggle = () => {
	const pathname = usePathname();
	const params = useParams();

	const routes = [
		{
			href: `/${params.storeId}`,
			label: 'Overview',
			active: pathname === `/${params.storeId}`,
		},
		{
			href: `/${params.storeId}/billboards`,
			label: 'Billboards',
			active: pathname === `/${params.storeId}/billboards`,
		},
		{
			href: `/${params.storeId}/categories`,
			label: 'Categories',
			active: pathname === `/${params.storeId}/categories`,
		},
		{
			href: `/${params.storeId}/sizes`,
			label: 'Sizes',
			active: pathname === `/${params.storeId}/sizes`,
		},
		{
			href: `/${params.storeId}/colors`,
			label: 'Colors',
			active: pathname === `/${params.storeId}/colors`,
		},
		{
			href: `/${params.storeId}/products`,
			label: 'Products',
			active: pathname === `/${params.storeId}/products`,
		},
		{
			href: `/${params.storeId}/orders`,
			label: 'Orders',
			active: pathname === `/${params.storeId}/orders`,
		},
		{
			href: `/${params.storeId}/settings`,
			label: 'Settings',
			active: pathname === `/${params.storeId}/settings`,
		}
	]
	return (
		<div className="md:hidden">
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button variant="outline" size="icon">
						<Menu />
					</Button>
				</DropdownMenuTrigger>
				<DropdownMenuContent align="end" className="md:hidden">
					<DropdownMenuItem className="flex-col items-start outline-none text-sm">
						{routes.map((route) => (
							<Link
								key={route.href}
								href={route.href}
								className={cn("text-sm py-2 px-2 font-medium transition-colors hover:text-primary",
									route.active ? "text-black dark:text-white" : "text-muted-foreground"
								)}
							>
								{route.label}
							</Link>
						))}
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	)
}

export default MenuToggle
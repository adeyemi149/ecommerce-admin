import prismadb from '@/lib/prismadb'
import { format } from "date-fns"

import BillboardClient from './components/billboard-client'
import { formatter } from '@/lib/utils';
import { OrdersColumn } from './components/columns';
import OrdersClient from './components/billboard-client';

const OrdersPage = async ({ params }: {
	params: { storeId: string }
}) => {
	const orders = await prismadb.order.findMany({
		where: {
			storeId: params.storeId
		},
		include: {
			orderItems: {
				include: {
					product: true
				}
			}
		},
		orderBy: {
			createdAt: "desc"
		}
	});

	const formattedOrders: OrdersColumn[] = orders.map((item) => ({
		id: item.id,
		phone: item.phone,
		address: item.address,
		products: item.orderItems.map((orderItem) => orderItem.product.name).join(","),
		totalPrice: formatter.format(item.orderItems.reduce((total, item) => {
			return total + Number(item.product.price)
		}, 0)),
		isPaid: item.isPaid,
		createdAt: format(item.createdAt, "MMMM do, yyyy")
	}))


	return (
		<div className='flex-col m-4'>
			<OrdersClient data={formattedOrders} />
		</div>
	)
}

export default OrdersPage
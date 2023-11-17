"use client"

import Heading from "@/components/ui/Heading"
import { Separator } from "@/components/ui/separator"
import { DataTable } from "@/components/ui/data-table"

import { OrdersColumn, columns } from "./columns"

interface OrdersClientProps {
	data: OrdersColumn[]
}
const OrdersClient: React.FC<OrdersClientProps> = ({ data }) => {
	return (
		<>
			<Heading
				title={`Orders (${data?.length})`}
				description="Manage Orders for your store"
			/>
			<Separator className="mt-4 mb-4" />
			<DataTable searchKey="products" columns={columns} data={data} />
		</>
	)
}

export default OrdersClient
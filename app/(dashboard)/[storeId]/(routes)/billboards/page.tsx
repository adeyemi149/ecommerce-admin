import prismadb from '@/lib/prismadb'
import { format } from "date-fns"

import BillboardClient from './components/billboard-client'
import { BillboardColumn } from './[billboardId]/components/columns';

const BillboardsPage = async ({ params }: {
	params: { storeId: string }
}) => {
	const billboards = await prismadb.billboard.findMany({
		where: {
			storeId: params.storeId
		},
		orderBy: {
			createdAt: "desc"
		}
	});

	const formattedBillboards: BillboardColumn[] = billboards.map((item) => ({
		id: item.id,
		label: item.label,
		createAt: format(item.createdAt, "MMMM do, yyyy")
	}))


	return (
		<div className='flex-col m-4'>
			<BillboardClient data={formattedBillboards} />
		</div>
	)
}

export default BillboardsPage
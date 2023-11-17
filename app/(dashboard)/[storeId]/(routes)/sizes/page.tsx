import prismadb from '@/lib/prismadb'
import { format } from "date-fns"

import { SizesColumn } from './components/columns';
import SizesClient from './components/size-client';

const SizesPage = async ({ params }: {
	params: { storeId: string }
}) => {
	const sizes = await prismadb.size.findMany({
		where: {
			storeId: params.storeId
		},
		orderBy: {
			createdAt: "desc"
		}
	});

	const formattedSizes: SizesColumn[] = sizes.map((item) => ({
		id: item.id,
		name: item.name,
		value: item.value,
		createdAt: format(item.createdAt, "MMMM do, yyyy")
	}))


	return (
		<div className='flex-col m-4'>
			<SizesClient data={formattedSizes} />
		</div>
	)
}

export default SizesPage
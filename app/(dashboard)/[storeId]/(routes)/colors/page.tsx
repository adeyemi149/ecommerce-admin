import prismadb from '@/lib/prismadb'
import { format } from "date-fns"

import { ColorsColumn } from './components/columns';
import ColorsClient from './components/color-client';

const ColorsPage = async ({ params }: {
	params: { storeId: string }
}) => {
	const colors = await prismadb.color.findMany({
		where: {
			storeId: params.storeId
		},
		orderBy: {
			createdAt: "desc"
		}
	});

	const formattedColors: ColorsColumn[] = colors.map((item) => ({
		id: item.id,
		name: item.name,
		value: item.value,
		createdAt: format(item.createdAt, "MMMM do, yyyy")
	}))


	return (
		<div className='flex-col m-4'>
			<ColorsClient data={formattedColors} />
		</div>
	)
}

export default ColorsPage
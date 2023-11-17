import prismadb from '@/lib/prismadb'
import { format } from "date-fns"

import BillboardClient from './components/category-client'
import { CategoryColumn } from './[categoryId]/components/columns'

const CategoriesPage = async ({ params }: {
	params: { storeId: string }
}) => {
	const categories = await prismadb.category.findMany({
		where: {
			storeId: params.storeId
		},
		include: {
			billboard: true
		},
		orderBy: {
			createdAt: "desc"
		}
	});

	const formattedCategories: CategoryColumn[] = categories.map((item) => ({
		id: item.id,
		name: item.name,
		billboardLabel: item.billboard.label,
		createAt: format(item.createdAt, "MMMM do, yyyy")
	}))


	return (
		<div className='flex-col m-4'>
			<BillboardClient data={formattedCategories} />
		</div>
	)
}

export default CategoriesPage
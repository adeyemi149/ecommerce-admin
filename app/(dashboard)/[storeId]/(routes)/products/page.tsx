import prismadb from '@/lib/prismadb'
import { format } from "date-fns"

import BillboardClient from './components/product-client'
import { formatter } from '@/lib/utils'
import { ProductsColumn } from './components/columns'
import ProductClient from './components/product-client'

const ProductsPage = async ({ params }: {
	params: { storeId: string }
}) => {
	const products = await prismadb.product.findMany({
		where: {
			storeId: params.storeId
		},
		include: {
			category: true,
			color: true,
			size: true
		},
		orderBy: {
			createdAt: "desc"
		}
	});

	const formattedProducts: ProductsColumn[] = products.map((item) => ({
		id: item.id,
		name: item.name,
		isFeatured: item.isFeatured,
		isArchived: item.isArchived,
		price: formatter.format(item.price.toNumber()),
		category: item.category.name,
		size: item.size.name,
		color: item.color.value,
		createdAt: format(item.createdAt, "MMMM do, yyyy")
	}))


	return (
		<div className='flex-col m-4'>
			<ProductClient data={formattedProducts} />
		</div>
	)
}

export default ProductsPage
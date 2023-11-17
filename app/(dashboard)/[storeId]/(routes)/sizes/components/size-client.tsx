"use client"

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import Heading from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { SizesColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import ApiList from "@/components/ui/api-list"

interface SizesClientProps {
	data: SizesColumn[]
}
const SizesClient: React.FC<SizesClientProps> = ({ data }) => {

	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Sizes (${data?.length})`}
					description="Manage Sizes for your store"
				/>
				<Button onClick={() => router.push(`/${params.storeId}/sizes/new`)}>
					<Plus className="mr-2 h-4 w-4" />
					Add New
				</Button>
			</div>
			<Separator className="mt-4 mb-4" />
			<DataTable searchKey="name" columns={columns} data={data} />
			<Heading title="API" description="API calls for Sizes" />
			<Separator className="mt-4 mb-4" />
			<ApiList entityIdName="sizesId" entityName="sizes" />
		</>
	)
}

export default SizesClient
"use client"

import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"

import Heading from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { ColorsColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import ApiList from "@/components/ui/api-list"

interface ColorsClientProps {
	data: ColorsColumn[]
}
const ColorsClient: React.FC<ColorsClientProps> = ({ data }) => {

	const router = useRouter();
	const params = useParams();

	return (
		<>
			<div className="flex items-center justify-between">
				<Heading
					title={`Colors (${data?.length})`}
					description="Manage color for your store"
				/>
				<Button onClick={() => router.push(`/${params.storeId}/colors/new`)}>
					<Plus className="mr-2 h-4 w-4" />
					Add New
				</Button>
			</div>
			<Separator className="mt-4 mb-4" />
			<DataTable searchKey="name" columns={columns} data={data} />
			<Heading title="API" description="API calls for Colors" />
			<Separator className="mt-4 mb-4" />
			<ApiList entityIdName="colorId" entityName="colors" />
		</>
	)
}

export default ColorsClient
import { CreditCard, DollarSign, Package } from "lucide-react";

import Heading from "@/components/ui/Heading";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatter } from "@/lib/utils";
import { getTotalRevenue } from "@/actions/get-total-revenue";
import { getSalesCount } from "@/actions/get-sales-count";
import { getStockCount } from "@/actions/get-stock-count";
import Overview from "@/components/overview";
import { getGraphCount } from "@/actions/get-graph-revenue";

interface params {
	params: { storeId: string }
}
const DashboardPage: React.FC<params> = async ({ params }) => {
	const totalRevenue = await getTotalRevenue(params.storeId);
	const salesCount = await getSalesCount(params.storeId);
	const stockCount = await getStockCount(params.storeId);
	const graphRevenue = await getGraphCount(params.storeId);
	return (
		<div className="flex-col">
			<div className="flex-1 space-y-4 p-8 pt-6">
				<Heading title="Dashboard" description="Overview of your store" />
				<Separator />
				<div className="grid gap-4 grid-cols-3">
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-4">
							<CardTitle className="text-sm font-medium">
								Total Revenue
							</CardTitle>
							<div className="border rounded-full p-1">
								<DollarSign className="h-4 w-4 text-muted-foreground" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{formatter.format(totalRevenue)}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-4">
							<CardTitle className="text-sm font-medium">
								Sales
							</CardTitle>
							<div className="border rounded-full p-1">
								<CreditCard className="h-4 w-4 text-muted-foreground" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								+{salesCount}
							</div>
						</CardContent>
					</Card>
					<Card>
						<CardHeader className="flex flex-row items-center justify-between space-y-4">
							<CardTitle className="text-sm font-medium">
								Products in Stock
							</CardTitle>
							<div className="border rounded-full p-1">
								<Package className="h-4 w-4 text-muted-foreground" />
							</div>
						</CardHeader>
						<CardContent>
							<div className="text-2xl font-bold">
								{stockCount}
							</div>
						</CardContent>
					</Card>
				</div>
				<Card className="col-span-4">
					<CardHeader>
						<CardTitle>Overview</CardTitle>
					</CardHeader>
					<CardContent className="pl-2">
						<Overview data={graphRevenue} />
					</CardContent>
				</Card>
			</div>
		</div>
	)
}

export default DashboardPage;
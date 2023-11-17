"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Billboard, Category } from "@prisma/client"
import axios from "axios"
import { Trash } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import toast from "react-hot-toast"
import { z } from "zod"

import { AlertModal } from "@/components/modals/alert-modal"
import Heading from "@/components/ui/Heading"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useOrigin } from "@/hooks/use-origin"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface CategoryFormProps {
	initialData: Category | null,
	billboards: Billboard[]
}

const formSchema = z.object({
	name: z.string().min(1),
	billboardId: z.string().min(1)
})

type CategoryFormValues = z.infer<typeof formSchema>;

const CategoryForm: React.FC<CategoryFormProps> = ({ initialData, billboards }) => {
	const params = useParams();
	const router = useRouter();
	const origin = useOrigin();

	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)

	const title = initialData ? "Edit category" : "Create category";
	const description = initialData ? "Edit a category" : "Add a new category";
	const toastMessage = initialData ? "Category updated" : "Category created";
	const action = initialData ? "Save changes" : "Create";

	const form = useForm<CategoryFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			billboardId: "",
			name: ""
		}
	});

	const onSubmit = async (value: CategoryFormValues) => {
		try {
			setLoading(true);
			if (initialData) {
				await axios.patch(`/api/${params.storeId}/categories/${params.categoryId}`, value)
			} else {
				await axios.post(`/api/${params.storeId}/categories`, value)
			}
			router.refresh();
			router.push(`/${params.storeId}/categories`);
			toast.success(toastMessage);
		} catch (error) {
			toast.error("Something went wrong")
		} finally {
			setLoading(false);
		}
	}

	const onDelete = async () => {
		try {
			setLoading(true);
			await axios.delete(`/api/${params.storeId}/categories/${params.categoryId}`);
			router.refresh();
			router.push(`/${params.storeId}/categories`);
			toast.success("Category deleted.");
		} catch (error) {
			toast.error("Make sure you removed all products using this categories first.")
		} finally {
			setLoading(false);
			setOpen(false);
		}
	}
	return (
		<>
			<AlertModal
				isOpen={open}
				loading={loading}
				onClose={() => setOpen(false)}
				onConfirm={onDelete}
			/>
			<div className="flex items-center justify-between">
				<Heading
					title={title}
					description={description}
				/>
				{initialData &&
					<Button
						disabled={loading}
						variant="destructive"
						size="icon"
						onClick={() => {
							setOpen(true)
						}}
					>
						<Trash className="h-4 w-4" />
					</Button>}
			</div>
			<Separator className="mt-4 mb-4" />
			<Form {...form}>
				<form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
					<div className="grid grid-cols-3 gap-8">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input disabled={loading} placeholder="Category Name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="billboardId"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Billboard</FormLabel>
									<Select
										disabled={loading}
										onValueChange={field.onChange}
										value={field.value}
										defaultValue={field.value}
									>
										<FormControl>
											<SelectTrigger>
												<SelectValue
													defaultValue={field.value}
													placeholder="Select a billboard"
												/>
											</SelectTrigger>
										</FormControl>
										<SelectContent>
											{billboards.map((billboard) => (
												<SelectItem
													key={billboard.id}
													value={billboard.id}
												>
													{billboard.label}
												</SelectItem>
											))}
										</SelectContent>
									</Select>
									<FormMessage />
								</FormItem>
							)}
						/>
					</div>
					<Button disabled={loading} className="ml-auto" type="submit">{action}</Button>
				</form>
			</Form>
		</>
	)
}

export default CategoryForm
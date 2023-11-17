"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Billboard } from "@prisma/client"
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
import ImageUpload from "@/components/ui/image-upload"
import { Input } from "@/components/ui/input"
import { Separator } from "@/components/ui/separator"
import { useOrigin } from "@/hooks/use-origin"

interface BillboardFormProps {
	initialData: Billboard | null
}

const formSchema = z.object({
	label: z.string().min(1),
	imageUrl: z.string().min(1)
})

type BillboardFormValues = z.infer<typeof formSchema>;

const BillboardForm: React.FC<BillboardFormProps> = ({ initialData }) => {
	const params = useParams();
	const router = useRouter();
	const origin = useOrigin();

	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)

	const title = initialData ? "Edit billboard" : "Create billboard";
	const description = initialData ? "Edit a billboard" : "Add a new billboard";
	const toastMessage = initialData ? "Billboard updated" : "Billboard created";
	const action = initialData ? "Save changes" : "Create";

	const form = useForm<BillboardFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			label: '',
			imageUrl: ''
		}
	});

	const onSubmit = async (value: BillboardFormValues) => {
		try {
			setLoading(true);
			if (initialData) {
				await axios.patch(`/api/${params.storeId}/billboards/${params.billboardId}`, value)
			} else {
				await axios.post(`/api/${params.storeId}/billboards`, value)
			}
			router.refresh();
			router.push(`/${params.storeId}/billboards`);
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
			await axios.delete(`/api/${params.storeId}/billboards/${params.billboardId}`);
			router.refresh();
			router.push(`/${params.storeId}/billboards`);
			toast.success("Store deleted.");
		} catch (error) {
			toast.error("Make sure you removed all products and categories.")
		} finally {
			setLoading(false);
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
					<FormField
						control={form.control}
						name="imageUrl"
						render={({ field }) => (
							<FormItem>
								<FormLabel>Background Image</FormLabel>
								<FormControl>
									<ImageUpload
										value={field.value ? [field.value] : []}
										disabled={loading}
										onChange={(url) => field.onChange(url)}
										onRemove={() => field.onChange("")}
									/>
								</FormControl>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className="grid grid-cols-3 gap-8">
						<FormField
							control={form.control}
							name="label"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Label</FormLabel>
									<FormControl>
										<Input disabled={loading} placeholder="Billboard Label" {...field} />
									</FormControl>
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

export default BillboardForm
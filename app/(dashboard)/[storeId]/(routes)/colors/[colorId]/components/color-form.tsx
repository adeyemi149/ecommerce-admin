"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { Billboard, Size } from "@prisma/client"
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

interface ColorFormProps {
	initialData: Size | null
}

const formSchema = z.object({
	name: z.string().min(1),
	value: z.string().min(4).regex(/^#/, {
		message: 'String must be a valid hex code',
	}),
})

type ColorFormValues = z.infer<typeof formSchema>;

const ColorForm: React.FC<ColorFormProps> = ({ initialData }) => {
	const params = useParams();
	const router = useRouter();
	const origin = useOrigin();

	const [loading, setLoading] = useState(false)
	const [open, setOpen] = useState(false)

	const title = initialData ? "Edit color" : "Create color";
	const description = initialData ? "Edit a color" : "Add a new color";
	const toastMessage = initialData ? "Color updated" : "Color created";
	const action = initialData ? "Save changes" : "Create";

	const form = useForm<ColorFormValues>({
		resolver: zodResolver(formSchema),
		defaultValues: initialData || {
			name: '',
			value: ''
		}
	});

	const onSubmit = async (value: ColorFormValues) => {
		try {
			setLoading(true);
			if (initialData) {
				await axios.patch(`/api/${params.storeId}/colors/${params.colorId}`, value)
			} else {
				await axios.post(`/api/${params.storeId}/colors`, value)
			}
			router.refresh();
			router.push(`/${params.storeId}/colors`);
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
			await axios.delete(`/api/${params.storeId}/colors/${params.colorId}`);
			router.refresh();
			router.push(`/${params.storeId}/colors`);
			toast.success("Colors deleted.");
		} catch (error) {
			toast.error("Make sure you removed all product using this colors first.")
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
					<div className="grid grid-cols-3 gap-8">
						<FormField
							control={form.control}
							name="name"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Name</FormLabel>
									<FormControl>
										<Input disabled={loading} placeholder="Color name" {...field} />
									</FormControl>
									<FormMessage />
								</FormItem>
							)}
						/>
						<FormField
							control={form.control}
							name="value"
							render={({ field }) => (
								<FormItem>
									<FormLabel>Value</FormLabel>
									<FormControl>
										<div className="flex items-center gap-x-4">
											<Input disabled={loading} placeholder="Color value" {...field} />
											<div
												className="border p-4 rounded-full"
												style={{ background: field.value }} />
										</div>
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

export default ColorForm
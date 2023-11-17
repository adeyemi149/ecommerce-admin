import prismadb from '@/lib/prismadb'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import React from 'react'
import SettingsForm from './components/settings-form'
import { Separator } from '@/components/ui/separator'

interface SettingsPageProps {
	params: { storeId: string }
}
const SettingsPage: React.FC<SettingsPageProps> = async ({ params }) => {
	const { userId } = auth()

	if (!userId) {
		redirect("/sign-in")
	}

	const store = await prismadb.store.findFirst({
		where: {
			id: params.storeId,
			userId
		}
	})

	if (!store) {
		redirect("/")
	}

	return (
		<div className='m-4'>
			<SettingsForm initialData={store} />
		</div>
	)
}

export default SettingsPage
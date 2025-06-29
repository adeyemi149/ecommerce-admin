import Image from 'next/image';
import { useState, useEffect } from 'react'
import { ImagePlus, Trash } from 'lucide-react';
import { CldUploadWidget } from "next-cloudinary"

import { Button } from './button';

interface ImageUploadProps {
	disabled: boolean;
	onChange: (value: string) => void;
	onRemove: (value: string) => void;
	value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({ onChange, onRemove, value, disabled }) => {
	const [isMounted, setIsMounted] = useState(false);

	useEffect(() => {
		setIsMounted(true);
	}, []);

	const onUpload = (result: any) => {
		onChange(result.info.secure_url);
	}

	if (!isMounted) {
		return null;
	}
	return (
		<div className='mb-4 flex flex-col items-start gap-4'>
			<div className='flex gap-4'>
				{value?.map((url) => (
					<div key={url} className='relative w-[200px] h-[200px] rounded-md overflow-hidden'>
						<div className='z-10 absolute top-2 right-2'>
							<Button type='button' variant='destructive' size="icon" onClick={() => onRemove(url)}>
								<Trash className='h-4 w-4' />
							</Button>
						</div>
						<Image
							fill
							className='object-cover'
							alt='Image'
							src={url}
						/>
					</div>
				))}
			</div>
			<CldUploadWidget onUpload={onUpload} uploadPreset='x6lcxgc1'>
				{({ open }) => {
					const onClick = () => {
						if (!open) {
							console.error("Upload widget is not ready.");
							return;
						}
						try {
							open();
						} catch (err) {
							console.error("Error opening upload widget:", err);
						}
					}

					return (
						<Button
							type='button'
							disabled={disabled}
							variant="secondary"
							onClick={onClick}
						>
							<ImagePlus className='w-4 h-4 mr-4 ' />
							Upload an Image
						</Button>
					)
				}}
			</CldUploadWidget>
		</div>
	)
}

export default ImageUpload
import { useState, useCallback } from 'react'
import { Upload } from 'lucide-react'
import { useDropzone } from 'react-dropzone'
import Cropper from 'react-easy-crop'
import { supabase } from '@/lib/supabase/supabase.ts'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Slider } from '@/components/ui/slider'
import { toast } from 'sonner'

export default function ProfilePicUpload({
  user,
  value,
  onChange,
}: {
  user?: any
  value?: string
  onChange?: (url: string) => void
}) {
  const [dialogOpen, setDialogOpen] = useState(false)
  const [cropDialogOpen, setCropDialogOpen] = useState(false)
  // const [formData, setFormData] = useState({ cover_photo_url: "" });
  // const [mode, setMode] = useState<"picture" | "gif">("picture");
  // const [files, setFiles] = useState<File[]>([]);
  const [imageSrc, setImageSrc] = useState<string | null>(null)
  const [uploading, setUploading] = useState(false)

  // Cropper state
  const [crop, setCrop] = useState({ x: 0, y: 0 })
  const [zoom, setZoom] = useState(1)
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null)

  const onCropComplete = useCallback((_: any, areaPixels: any) => {
    setCroppedAreaPixels(areaPixels)
  }, [])

  // --- DROPZONE HANDLER ---
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0]
    if (!file) return

    // if (mode === "gif") {
    //   setUploading(true); // 👈 immediate state update before async starts
    //   uploadToSupabase(file).finally(() => setUploading(false));
    //   return;
    // }
    const reader = new FileReader()
    reader.onload = (e) => {
      setImageSrc(e.target?.result as string)
      setCropDialogOpen(true)
    }
    // reader.onload = (e) => {
    //   const image = new Image();
    //   image.onload = () => {
    //     const aspect = image.width / image.height;
    //     if (Math.abs(aspect - 0.8) < 0.05) {
    //       // already roughly 4:5, no crop needed
    //       uploadToSupabase(file);
    //     } else {
    //       setImageSrc(e.target?.result as string);
    //       setCropDialogOpen(true);
    //     }
    //   };
    //   image.src = e.target?.result as string;
    // };
    reader.readAsDataURL(file)
    // setFiles(acceptedFiles);
    // },
    //   [mode]
    // );
  }, [])

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { 'image/*': [] },
    // mode === 'picture'
    // ? { 'image/*': [] }
    // : { 'image/gif': [], 'image/*': [] },
    multiple: false,
  })

  // --- CROPPING FUNCTION ---
  async function getCroppedImage(imageSrc: string, crop: any) {
    const image = new Image()
    image.src = imageSrc
    await new Promise((res) => (image.onload = res))

    const canvas = document.createElement('canvas')
    const ctx = canvas.getContext('2d')!
    canvas.width = crop.width
    canvas.height = crop.height

    ctx.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height
    )

    return new Promise<Blob>((resolve) => {
      canvas.toBlob((blob) => resolve(blob!), 'image/jpeg')
    })
  }

  // --- UPLOAD TO SUPABASE ---
  // async function uploadToSupabase(file: File | Blob) {
  //   try {
  //     setUploading(true)
  //     const fileName = `${crypto.randomUUID()}-${Date.now()}${
  //       file instanceof File ? `-${file.name}` : '.jpg'
  //     }`

  //     const { data, error } = await supabase.storage
  //       .from('avatars') // ⚠️ Change this to your actual bucket name
  //       .upload(fileName, file)

  //     if (error) throw error

  //     const { data: publicUrlData } = supabase.storage
  //       .from('avatars')
  //       .getPublicUrl(fileName)

  //     onChange?.(publicUrlData.publicUrl)
  //     setDialogOpen(false)
  //     setCropDialogOpen(false)
  //   } catch (err) {
  //     console.error('Upload failed:', err)
  //     alert('Upload failed. Check console for details.')
  //   } finally {
  //     setUploading(false)
  //   }
  // }
  async function uploadToSupabase(file: Blob | File) {
    if (!user?.accountNo) return

    try {
      setUploading(true)

      const fileId = crypto.randomUUID()
      const filePath = `${user?.accountNo}/${fileId}.jpg`

      const { error } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          contentType: 'image/jpeg',
        })

      if (error) throw error

      const { data } = supabase.storage.from('avatars').getPublicUrl(filePath)

      const publicUrl = data.publicUrl

      // send back to parent
      onChange?.(publicUrl)

      setDialogOpen(false)
      setCropDialogOpen(false)
    } catch (err) {
      toast.error('Failed to update profile pic')
      console.error('Upload failed:', err)
    } finally {
      setUploading(false)
    }
  }

  const handleCropConfirm = async () => {
    if (!imageSrc || !croppedAreaPixels) return
    const croppedBlob = await getCroppedImage(imageSrc, croppedAreaPixels)
    await uploadToSupabase(croppedBlob)
  }

  return (
    <>
      {/* AVATAR */}
      <div
        className='relative mx-auto w-fit h-fit cursor-pointer'
        onClick={() => setDialogOpen(true)}
      >
        <Avatar className='h-24 w-24'>
          <AvatarImage src={value} />
          <AvatarFallback>
            {user?.name
              ?.split(' ')
              .map((word: any) => word[0])
              .join('')
              .toUpperCase()}
          </AvatarFallback>
        </Avatar>

        <div className='absolute inset-0 flex items-center justify-center rounded-full bg-black/40 opacity-0 transition hover:opacity-100'>
          <Upload className='h-5 w-5 text-white' />
        </div>
      </div>

      {/* UPLOAD DIALOG */}
      <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
        <DialogContent className='max-w-md'>
          <DialogHeader>
            <DialogTitle>Upload profile photo</DialogTitle>
          </DialogHeader>

          <div
            {...getRootProps()}
            className={cn(
              'cursor-pointer rounded-lg border-2 border-dashed p-10 text-center transition',
              isDragActive
                ? 'border-primary bg-primary/10'
                : 'border-muted-foreground/30 hover:border-primary/50'
            )}
          >
            <input {...getInputProps()} />

            {uploading ? (
              <p className='font-medium text-primary'>Uploading...</p>
            ) : (
              <p className='text-muted-foreground'>
                Drag & drop an image here, or{' '}
                <span className='font-medium text-primary'>
                  click to select
                </span>
              </p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* CROP DIALOG */}
      <Dialog open={cropDialogOpen} onOpenChange={setCropDialogOpen}>
        <DialogContent className='max-w-lg'>
          <DialogHeader>
            <DialogTitle>Crop profile picture</DialogTitle>
          </DialogHeader>

          <div className='relative h-[350px] w-full overflow-hidden rounded-md bg-black'>
            {imageSrc && (
              <Cropper
                image={imageSrc}
                crop={crop}
                zoom={zoom}
                aspect={1}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropComplete={onCropComplete}
              />
            )}
          </div>

          <div className='mt-4 space-y-2'>
            <p className='text-center text-sm text-muted-foreground'>
              Zoom to adjust crop
            </p>

            <Slider
              value={[zoom]}
              onValueChange={(v: any) => setZoom(v[0])}
              min={1}
              max={3}
              step={0.1}
            />
          </div>

          <div className='mt-4 flex justify-end gap-2'>
            <Button variant='outline' onClick={() => setCropDialogOpen(false)}>
              Cancel
            </Button>

            <Button onClick={handleCropConfirm} disabled={uploading}>
              {uploading ? 'Uploading...' : 'Save Photo'}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
    // <>
    //   {/* --- MAIN SELECTOR CARD --- */}
    //   <div
    //     className='group relative mx-auto flex aspect-[4/5] w-full max-w-sm cursor-pointer items-center justify-center overflow-hidden rounded-md bg-primary'
    //     onClick={() => !uploading && setDialogOpen(true)}
    //   >
    //     {!value ? (
    //       <span className='text-secondary-foreground/80 transition group-hover:opacity-70'>
    //         {uploading ? 'Uploading...' : 'Click to upload your flyer'}
    //       </span>
    //     ) : (
    //       <>
    //         <img
    //           src={value}
    //           alt='Event flyer'
    //           className='h-full w-full rounded-md object-cover'
    //         />
    //         <div className='absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition group-hover:opacity-100'>
    //           <span className='text-sm font-medium text-white'>
    //             Change flyer
    //           </span>
    //         </div>
    //       </>
    //     )}
    //   </div>

    //   {/* --- MAIN UPLOAD DIALOG --- */}
    //   <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
    //     <DialogContent className='max-w-lg'>
    //       <DialogHeader>
    //         <DialogTitle>
    //           Upload {mode === 'picture' ? 'Picture' : 'GIF'}
    //         </DialogTitle>
    //       </DialogHeader>

    //       {/* MODE TOGGLE */}
    //       <div className='mb-4 flex justify-center space-x-2'>
    //         <Button
    //           variant={mode === 'picture' ? 'default' : 'outline'}
    //           onClick={() => setMode('picture')}
    //         >
    //           Pictures
    //         </Button>
    //         <Button
    //           variant={mode === 'gif' ? 'default' : 'outline'}
    //           onClick={() => setMode('gif')}
    //         >
    //           GIFs
    //         </Button>
    //       </div>

    //       {/* DROPZONE */}
    //       <div
    //         {...getRootProps()}
    //         className={cn(
    //           'cursor-pointer rounded-md border-2 border-dashed p-10 text-center transition',
    //           isDragActive
    //             ? 'border-primary bg-primary/10'
    //             : 'border-muted-foreground/30 hover:border-primary/50'
    //         )}
    //       >
    //         <input {...getInputProps()} />
    //         {uploading ? (
    //           <p className='font-medium text-primary'>Uploading...</p>
    //         ) : isDragActive ? (
    //           <p className='font-medium text-primary'>Drop files here...</p>
    //         ) : (
    //           <p className='text-muted-foreground'>
    //             Drag & drop {mode === 'gif' ? 'GIFs' : 'images'} here, or{' '}
    //             <span className='cursor-pointer font-medium text-primary'>
    //               click to select
    //             </span>
    //           </p>
    //         )}
    //       </div>
    //     </DialogContent>
    //   </Dialog>

    //   {/* --- CROP DIALOG --- */}
    //   <Dialog open={cropDialogOpen} onOpenChange={setCropDialogOpen}>
    //     <DialogContent className='flex h-[500px] max-w-lg flex-col justify-between'>
    //       <DialogHeader>
    //         <DialogTitle>Crop to 4:5 Flyer</DialogTitle>
    //       </DialogHeader>

    //       <div className='relative h-[350px] w-full overflow-hidden rounded-md bg-black'>
    //         {imageSrc && (
    //           <Cropper
    //             image={imageSrc}
    //             crop={crop}
    //             zoom={zoom}
    //             aspect={4 / 5}
    //             onCropChange={setCrop}
    //             onZoomChange={setZoom}
    //             onCropComplete={onCropComplete}
    //           />
    //         )}
    //       </div>

    //       <div className='mt-4 space-y-2'>
    //         <p className='text-center text-sm text-muted-foreground'>
    //           Zoom to adjust crop
    //         </p>
    //         <Slider
    //           value={[zoom]}
    //           onValueChange={(v) => setZoom(v[0])}
    //           min={1}
    //           max={3}
    //           step={0.1}
    //         />
    //       </div>

    //       <div className='mt-4 flex justify-end space-x-2'>
    //         <Button variant='outline' onClick={() => setCropDialogOpen(false)}>
    //           Cancel
    //         </Button>
    //         <Button onClick={handleCropConfirm} disabled={uploading}>
    //           {uploading ? 'Uploading...' : 'Confirm Crop'}
    //         </Button>
    //       </div>
    //     </DialogContent>
    //   </Dialog>
    // </>
  )
}

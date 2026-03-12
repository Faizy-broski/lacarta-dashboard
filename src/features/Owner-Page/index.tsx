import { Button } from '@/components/ui/button'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'
import {Clock4,Eye,Send,Save} from 'lucide-react'


import { BasicInformation } from "./components/BasicInformation";
import { DescriptionTabs } from "./components/DescriptionTabs";
import { ImageGallery } from "./components/ImageGallery";
import { Amenities } from "./components/Amenities";
import { LocationDetails } from "./components/LocationDetails";
import { PricingAvailability } from "./components/PricingAvailability";
import { OwnerInformation } from "./components/OwnerInformation";


export function OwnerListingEditorPage() {
  return (
    <>
     <Header />

      <Main>
        <div className='mb-10 flex items-center justify-between space-y-2'>
          <div className="items-center">
            <h1 className='text-3xl font-bold tracking-tight'>Owner Listing Editor</h1>
            <div className='flex items-center gap-3'>
              <div><Button  className='rounded bg-yellow-50 text-yellow-500'>Drafts</Button></div>
              <div className='flex gap-2 items-center'><Clock4 size={12}/><p>Updated 2 min ago</p></div>
              </div>
          </div>
          <div className="flex gap-2 ">
            <Button className='bg-gray-50 shadow text-black font-semibold'><Save />Safe Drafts</Button>
            <Button className='bg-gray-50 shadow text-black font-semibold'><Eye />Preview</Button>
            <Button className='bg-yellow-600 text-white font-semibold'><Send />Publish</Button>
          </div>
        </div>

      
      <BasicInformation />
      <DescriptionTabs />
      <ImageGallery />
      <Amenities />
      <LocationDetails />
      <PricingAvailability />
      <OwnerInformation />


   </Main>
   </>
  );
}


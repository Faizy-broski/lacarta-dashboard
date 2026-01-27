import { ReceiptText, 
    // Plus 
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Header } from '@/components/layout/header'
import { Main } from '@/components/layout/main'


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
          <div>
            <h1 className='text-3xl font-bold tracking-tight'>Owner Listing Editor</h1>
          </div>
          <div>
            <Switch>
            </Switch>
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


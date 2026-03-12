import { ContentSection } from '../components/content-section'
import { ProfileForm } from './profile-form'

export function SettingsProfile() {
  return (
    <ContentSection
      title='Profile'
      desc='This is how others will see you on the site.'
      separator={false}
    >
      <ProfileForm />
    </ContentSection>
    // <div className='faded-bottom h-full w-full overflow-y-auto scroll-smooth pe-4 pb-12'>
    //     <div className='-mx-1 px-1.5 lg:max-w-xl'><ProfileForm /></div>
    //   </div>
  )
}

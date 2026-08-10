import AppHeader from '../components/molecules/showOrganisation/AppHeader';
import { WelcomeSection } from '../components/molecules/showOrganisation/WelcomeSection';
import { CreateOrganizationCard } from '../components/molecules/showOrganisation/CreateOrgCard';
import { SampleAppsSection } from '../components/organisms/SampleAppSection';

function ShowOrgPage() {
    return (
        <div className="bg-[#f8f9fa] h-screen">
            <AppHeader />
            <WelcomeSection />
            <CreateOrganizationCard />
            <SampleAppsSection />
        </div>
    );
}

export default ShowOrgPage;
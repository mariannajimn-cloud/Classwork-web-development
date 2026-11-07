"use client";

import { use } from 'react';
import { useRouter } from 'next/navigation';
import { SAMPLE_INITIATIVES } from '../../../data/initiatives';
import  DetailsPage  from '../../../components/detailspage';


const IndividualPage = ({ params }: { params: Promise<{ id: string }> }) => {
    const {id} = use(params);
    const router = useRouter();

  
    const individual = SAMPLE_INITIATIVES.find((item) => item.id === id);

    return(
        <div className="flex flex-col flex-1 items-center justify-center bg-green-50 font-sans dark:bg-black">
            <DetailsPage initiative={individual} onBack={() => router.push('/')}/>
        </div>
    );
}

export default IndividualPage;
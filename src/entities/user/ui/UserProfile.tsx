import './UserProfile.scss';

import React, { useState } from 'react';

import { useParams } from 'react-router';
import { EditProfile } from './EditProfile/EditProfile';
import { InfoProfile } from './InfoProfile/InfoProfile';
import { UserProfileSkeleton } from './UserProfileSceleton';
import { userAPI } from '../model/query/userProfileService';

export const UserProfile = () => {
  const params = useParams();
  const { data, isLoading, isSuccess } = userAPI.useUserProfileQuery(
    params.userId!
  );
  const [isEditOpen, setIsEditOpen] = useState<boolean>(false);

  return (
    <>
      {isLoading && <UserProfileSkeleton />}
      {isSuccess && (
        <section className="user-profile">
          <InfoProfile
            isEditOpen={isEditOpen}
            setIsEditOpen={setIsEditOpen}
            data={data}
          />
          <EditProfile
            isEditOpen={isEditOpen}
            setIsEditOpen={setIsEditOpen}
            data={data}
          />
        </section>
      )}
    </>
  );
};

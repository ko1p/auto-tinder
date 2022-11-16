import './UserProfile.scss';

import React, { useState } from 'react';

import { useAppSelector } from 'shared/lib/hooks/redux';
import { EditProfile } from './EditProfile/EditProfile';
import { InfoProfile } from './InfoProfile/InfoProfile';
import { UserProfileSkeleton } from './UserProfileSceleton';
import { userAPI } from '../model/query/userProfileService';
import { userSelector } from '../model/state/authSelector';

export const UserProfile = () => {
  const userId = useAppSelector(userSelector);
  const { data, isLoading, isSuccess } = userAPI.useUserProfileQuery(userId!);
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
            userId={userId!}
            isEditOpen={isEditOpen}
            setIsEditOpen={setIsEditOpen}
            data={data}
          />
        </section>
      )}
    </>
  );
};

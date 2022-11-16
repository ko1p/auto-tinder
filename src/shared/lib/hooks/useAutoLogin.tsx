import {
  accessTokenSelector,
  isLogoutSelector,
} from 'entities/user/model/state/authSelector';
import { authAPI, logIn } from 'features/auth/model';
import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from './redux';

export const useAutoLogin = () => {
  const dispatch = useAppDispatch();
  const accessToken = useAppSelector(accessTokenSelector);
  const isLogout = useAppSelector(isLogoutSelector);
  const [autoLogin, setAutoLogin] = useState<boolean | null>(false);
  const [refresh] = authAPI.useRefreshMutation();
  useEffect(() => {
    const autoAuth = async () => {
      if (!accessToken && !isLogout)
        try {
          const userDto = await refresh('').unwrap();
          dispatch(logIn(userDto));
          setAutoLogin(true);
        } catch (e) {
          setAutoLogin(true);
        }
      setAutoLogin(true);
    };
    autoAuth().catch(console.error);
  }, []);

  return { accessToken, autoLogin };
};

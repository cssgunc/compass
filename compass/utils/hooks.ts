import { useDispatch, useSelector, useStore } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppStore, AppDispatch } from './store'
import React from 'react';
import { useRouter } from 'next/router';
import { User } from './constants';

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppStore: () => AppStore = useStore

// TODO - debug this auth hook
export const withAuth = (WrappedComponent: React.ComponentType<any>, allowedUserTypes: User[] = []) => {
    return (props: any) => {
      const router = useRouter();
      const { isLoggedIn, userType } = useAppSelector((state: RootState) => state.user);
  
      React.useEffect(() => {
        if (!isLoggedIn) {
          router.push('/auth');
        } else if (userType && !allowedUserTypes.includes(userType)) {
          router.push(userType === User.ADMIN ? '/admin' : '/resource');
        }
      }, [isLoggedIn, userType, router, allowedUserTypes]);
  
      return isLoggedIn ? <WrappedComponent {...props} /> : (null);
    };
  };
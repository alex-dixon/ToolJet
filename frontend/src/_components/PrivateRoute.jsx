import React, { useEffect, useState } from 'react';
import { Navigate, useLocation, useParams } from 'react-router-dom';
import { authenticationService } from '@/_services';
import { appendWorkspaceId, excludeWorkspaceIdFromURL, getPathname } from '@/_helpers/routes';
import { TJLoader } from '@/_ui/TJLoader/TJLoader';
import { getWorkspaceId } from '@/_helpers/utils';
import { handleAppAccess } from '@/_helpers/handleAppAccess';

export const PrivateRoute = ({ children }) => {
  const [session, setSession] = React.useState(authenticationService.currentSessionValue);
  const location = useLocation();

  const params = useParams();
  const [extraProps, setExtraProps] = useState({});

  const pathname = getPathname(null, true);
  const isEditorOrViewerGoingToRender = pathname.startsWith('/apps/') || pathname.startsWith('/applications/');

  useEffect(() => {
    const subject = authenticationService.currentSession.subscribe(async (newSession) => {
      /* Valid session and check if the component is editor or viewer */
      if (isEditorOrViewerGoingToRender && newSession?.group_permissions) {
        const componentType = pathname.startsWith('/apps/') ? 'editor' : 'viewer';
        const { slug } = params;

        /* Validate the app permissions */
        const accessDetails = await handleAppAccess(componentType, slug);
        setExtraProps(accessDetails);
        setSession(newSession);
      } else {
        setSession(newSession);
      }
    });

    () => subject.unsubscribe();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //get either slug or id from the session and replace
  const { current_organization_slug, current_organization_id } = session;
  if (location.pathname.startsWith('/:workspaceId')) {
    const path = appendWorkspaceId(current_organization_slug || current_organization_id, location.pathname, true);
    (current_organization_slug || current_organization_id) && window.history.replaceState(null, null, path);
  }

  // authorised so return component
  if (
    session?.group_permissions ||
    location.pathname.startsWith('/applications/') ||
    (location.pathname === '/switch-workspace' && session?.current_organization_id)
  ) {
    return isEditorOrViewerGoingToRender ? React.cloneElement(children, extraProps) : children;
  } else {
    if (
      (session?.authentication_status === false || session?.authentication_failed) &&
      !location.pathname.startsWith('/applications/')
    ) {
      // not logged in so redirect to login page with the return url'
      return (
        <Navigate
          to={{
            pathname: `/login${getWorkspaceId() ? `/${getWorkspaceId()}` : ''}`,
            search: `?redirectTo=${excludeWorkspaceIdFromURL(location.pathname)}`,
            state: { from: location },
          }}
          replace
        />
      );
    }

    return <TJLoader />;
  }
};

export const AdminRoute = ({ children }) => {
  const [session, setSession] = React.useState(authenticationService.currentSessionValue);
  const location = useLocation();
  useEffect(() => {
    const subject = authenticationService.currentSession.subscribe((newSession) => {
      setSession(newSession);
    });

    () => subject.unsubscribe();
  }, []);

  // authorised so return component
  if (session?.group_permissions) {
    //check: [Marketplace route]
    if (!session?.admin) {
      return (
        <Navigate
          to={{
            pathname: '/',
            search: `?redirectTo=${location.pathname}`,
            state: { from: location },
          }}
          replace
        />
      );
    }

    return children;
  } else {
    if (session?.authentication_status === false && !location.pathname.startsWith('/applications/')) {
      // not logged in so redirect to login page with the return url'
      return (
        <Navigate
          to={{
            pathname: `/login${getWorkspaceId() ? `/${getWorkspaceId()}` : ''}`,
            search: `?redirectTo=${location.pathname}`,
            state: { from: location },
          }}
          replace
        />
      );
    }

    return <TJLoader />;
  }
};

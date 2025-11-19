import * as React from 'react'
import styled from 'styled-components'
import { useAuthenticationStore } from '../../Store/AuthenticationStore'
import { Avatar } from '../../Components/Avatar/Avatar';
import { Stack } from '../../Components/Stack/Stack'
import { LinkComponent } from '../../Components/LinkComponent/LinkComponent';

const ProfileDetails = styled(Stack)`
    position: fixed;
    top: calc(100% + 0.5rem);
    right: 0;
    background-color: var(--background-secondary);
    border: 1px solid var(--border);
    border-radius: 5px;
    padding: 1rem;
    color: var(--foreground);
`;


function useClickOutside(onOutsideClick: () => void) {
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClick(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        onOutsideClick();
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, [onOutsideClick]);

  return ref;
}

export const Profile: React.FC = () => {
    const {authenticatedUser, logout} = useAuthenticationStore();
    const [isProfileOpen, setIsProfileOpen] = React.useState(false)
    const ref = useClickOutside(() => setIsProfileOpen(false));
    
    return (
        <div ref={ref}>
            <Avatar name={authenticatedUser?.name || ''} onClick={() => setIsProfileOpen(!isProfileOpen)} isSmall />
            {isProfileOpen && (
                <ProfileDetails space="small">
                    <p>{authenticatedUser?.name}</p>
                    <p>{authenticatedUser?.email}</p>
                    <LinkComponent onClick={logout}>Logout</LinkComponent>
                </ProfileDetails>
            )}
        </div>
    )
}
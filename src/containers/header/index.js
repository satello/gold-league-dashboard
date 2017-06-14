import React from 'react';
import {
    UncontrolledDropdown, DropdownToggle, DropdownMenu, DropdownItem,
    Button, Progress
} from 'reactstrap';

// icons
import IconNotification from 'react-icons/lib/md/notifications-none';
import IconFace from 'react-icons/lib/md/face';
import IconMail from 'react-icons/lib/md/mail';
import IconSecurity from 'react-icons/lib/md/security';
import IconHelp from 'react-icons/lib/md/help';
import IconLogout from 'react-icons/lib/md/power-settings-new';
import IconDownload from 'react-icons/lib/md/cloud-download';
import IconCake from 'react-icons/lib/md/cake';
import IconMenu from 'react-icons/lib/md/menu';

// style
import './style.scss';


export default (props) => (
    <header className="site-head d-flex align-items-center justify-content-between">
        <div className="wrap mr-4">
            <IconMenu size="24" color="#fff" onClick={props.toggleNav} style={{cursor: 'pointer'}}/>
        </div>
    </header>
);

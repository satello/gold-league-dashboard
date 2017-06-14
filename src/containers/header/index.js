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
        <div className="right-elems ml-auto d-flex">
            <div className="wrap notify hidden-sm-down">

                <UncontrolledDropdown>
                    <DropdownToggle tag="div">
                        <IconNotification size="22" color="#fff"/>
                        <span className="badge badge-danger">4</span>
                    </DropdownToggle>

                    <DropdownMenu right style={{minWidth: '18rem'}}>
                        <DropdownItem header>You have 4 new notifications</DropdownItem>
                        <DropdownItem divider/>
                        <DropdownItem className="mb-2">
                            <p>Server Upgrade Required</p>
                            <Progress value={70} color="danger" style={{height: '3px'}}/>
                        </DropdownItem>
                        <DropdownItem className="d-flex align-items-center">
                            <IconDownload size="28" className="text-success"/>
                            <div className="ml-3">
                                <div>5 App Downloaded</div>
                                <small className="text-muted">5 min ago</small>
                            </div>
                        </DropdownItem>
                        <DropdownItem className="d-flex align-items-center">
                            <IconMail size="28" className="text-warning"/>
                            <div className="ml-3">
                                <div>Roni sent you a message</div>
                                <small className="text-muted">2 hours ago</small>
                            </div>
                        </DropdownItem>
                        <DropdownItem className="d-flex align-items-center">
                            <IconCake size="28" className="text-primary"/>
                            <div className="ml-3">
                                <small className="text-muted">12 hours ago</small>
                            </div>
                        </DropdownItem>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>

            <div className="wrap profile">
                <UncontrolledDropdown>
                    <DropdownToggle tag="div">
                        <img src="http://i.imgur.com/0rVeh4A.jpg" alt="avatar"/>
                    </DropdownToggle>
                    <DropdownMenu right style={{minWidth: '12rem'}}>
                        <DropdownItem header></DropdownItem>
                        <DropdownItem divider/>
                        <DropdownItem><IconFace size="16"/>&emsp;<a href="#">Profile</a></DropdownItem>
                        <DropdownItem><IconSecurity size="16"/>&emsp;<a href="#">Security</a></DropdownItem>
                        <DropdownItem><IconHelp size="16"/>&emsp;<a href="#">Help</a></DropdownItem>
                        <div className="text-right ml-3 mr-3 mt-2"><Button block color="success" size="sm"><IconLogout size="15"/>&emsp;Logout</Button></div>
                    </DropdownMenu>
                </UncontrolledDropdown>
            </div>
        </div>
    </header>
);

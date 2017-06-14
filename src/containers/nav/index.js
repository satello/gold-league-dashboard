import React from 'react';
import {Link, IndexLink} from 'react-router';


// icons
import IconDashboard from 'react-icons/lib/md/dashboard';
import IconCommodities from 'react-icons/lib/md/layers';
import IconTemplates from 'react-icons/lib/md/insert-drive-file';
import IconCalendar from 'react-icons/lib/md/perm-contact-calendar';
import IconAvailabilities from 'react-icons/lib/md/access-time';
import IconBilling from 'react-icons/lib/md/credit-card';
import IconSettings from 'react-icons/lib/md/settings-applications';
import ScrollArea from 'react-scrollbar';

import './style.scss';


const NavHead = (props) => (
    <header className="nav-head">
        <Link to="/">
            <svg width="24px" height="30px" viewBox="11 4 50 52" version="1.1" xmlns="http://www.w3.org/2000/svg">
                {/* <polyline id="Path" stroke="#4CAF50" strokeWidth="11" fill="none" points="21 36.6942904 49.6837349 30.667532 51.5974407 16 31.3353728 16 29.3402961 16 21 36.6942904 29.3402958 55.1487999 53.5974407 52.415905"></polyline> */}
                <path id="Path" strokeWidth="12" fill="none" d="M26.5282909,38.9526768 C26.5282909,38.9526768 49.3408202,31.7856836 49.3408202,28.3647852 C49.3408202,24.9438868 49.5702829,11.7001695 37.0898141,17.411107 C24.6093454,23.1220444 24.821289,23.6064453 24.821289,23.6064453 C24.821289,23.6064453 22.8105177,47.2876359 26.528291,53.5093155 C30.2460643,59.7309951 52.7998045,53.5093155 54.7998045,53.5093155"></path>
            </svg>
            <strong className="h4 text-uppercase">ract</strong>
        </Link>
    </header>
);





class NavList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selected: 0
        }
    }
    handleClick = (index, e) => {
        let c = e.currentTarget.className;
        e.preventDefault();
        e.stopPropagation();
        this.setState({
            selected: (c.indexOf('selected') >= 0) ? '' : index
        })
    }
    handleOpen = (index, e) => {
        e.stopPropagation();
        this.setState({
            selected: index
        })
    }


    render() {
        return <ScrollArea className="nav-list-container" horizontal={false} verticalScrollbarStyle={{width: '4px', marginLeft: '10px'}}>
            <ul className="list-unstyled nav-list clearfix">
                <li><div className="nav-list-title">Business</div></li>
                <li onClick={this.handleClick.bind(this, 0)} className={(this.state.selected === 0) ? 'selected': ''}>
                    <IndexLink to="/" activeClassName="active">
                        <IconDashboard size="18" color="#2962FF" className="icon-dashboard"/>
                        <span className="name">Dashboard</span>
                    </IndexLink>
                </li>
                <li onClick={this.handleClick.bind(this, 1)} className={(this.state.selected === 1) ? 'selected': ''}>
                    <Link to="/commodities" activeClassName="active">
                        <IconCommodities size="18" color="#2962FF" className="icon-commodities"/>
                        <span className="name">Commodities</span>
                    </Link>
                </li>
                <li><div className="nav-list-title">Site</div></li>
                  <li onClick={this.handleClick.bind(this, 2)} className={(this.state.selected === 2) ? 'selected': ''}>
                      <Link to="/templates" activeClassName="active">
                          <IconTemplates size="18" color="#2962FF" className="icon-templates"/>
                          <span className="name">Templates</span>
                      </Link>
                  </li>
                  <li onClick={this.handleClick.bind(this, 3)} className={(this.state.selected === 3) ? 'selected': ''}>
                      <Link to="/calendar" activeClassName="active">
                          <IconCalendar size="18" color="#2962FF" className="icon-calendar"/>
                          <span className="name">Calendar</span>
                      </Link>
                  </li>
                  <li onClick={this.handleClick.bind(this, 4)} className={(this.state.selected === 4) ? 'selected': ''}>
                      <Link to="/availabilities" activeClassName="active">
                          <IconAvailabilities size="18" color="#2962FF" className="icon-availabilities"/>
                          <span className="name">Availabilities</span>
                      </Link>
                  </li>
                <li><div className="nav-list-title">Account</div></li>
                  <li onClick={this.handleClick.bind(this, 5)} className={(this.state.selected === 5) ? 'selected': ''}>
                      <Link to="/billing" activeClassName="active">
                          <IconBilling size="18" color="#2962FF" className="icon-billingr"/>
                          <span className="name">Billing</span>
                      </Link>
                  </li>
                  <li onClick={this.handleClick.bind(this, 6)} className={(this.state.selected === 6) ? 'selected': ''}>
                      <Link to="/settings" activeClassName="active">
                          <IconSettings size="18" color="#2962FF" className="icon-settings"/>
                          <span className="name">Settings</span>
                      </Link>
                  </li>
            </ul>
            {/* end scroll-area */}
        </ScrollArea>
    }
}




export default (props) => (
    <nav className={`site-nav ${props.mini ? 'mini' : ''}`} role="navigation">
        <NavHead {...props}/>
        <NavList/>

    </nav>
);

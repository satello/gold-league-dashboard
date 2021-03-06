import React from 'react';
import {Link, IndexLink} from 'react-router';


// icons
import IconDashboard from 'react-icons/lib/md/dashboard';
import IconCommodities from 'react-icons/lib/md/layers';
import IconTemplates from 'react-icons/lib/md/insert-drive-file';
import IconBilling from 'react-icons/lib/md/credit-card';
import IconSettings from 'react-icons/lib/md/settings-applications';
import ScrollArea from 'react-scrollbar';

import './style.css';


const NavHead = (props) => (
    <header className="nav-head">
        <Link to="/">
            <strong className="h4 text-uppercase">Gold League</strong>
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
                <li><div className="nav-list-title">Rankings</div></li>
                <li onClick={this.handleClick.bind(this, 0)} className={(this.state.selected === 0) ? 'selected': ''}>
                    <IndexLink to="/" activeClassName="active">
                        <IconDashboard size="18" color="#4d4d4d" className="icon-dashboard"/>
                        <span className="name">Overall</span>
                    </IndexLink>
                </li>
                <li onClick={this.handleClick.bind(this, 1)} className={(this.state.selected === 1) ? 'selected': ''}>
                    <Link to="/free-agents" activeClassName="active">
                        <IconCommodities size="18" color="#4d4d4d" className="icon-commodities"/>
                        <span className="name">Free Agents</span>
                    </Link>
                </li>
                <li><div className="nav-list-title">Teams</div></li>
                  <li onClick={this.handleClick.bind(this, 2)} className={(this.state.selected === 2) ? 'selected': ''}>
                      <Link to="/owners" activeClassName="active">
                          <IconTemplates size="18" color="#4d4d4d" className="icon-templates"/>
                          <span className="name">Owners</span>
                      </Link>
                  </li>
                <li><div className="nav-list-title">Settings</div></li>
                  <li onClick={this.handleClick.bind(this, 4)} className={(this.state.selected === 4) ? 'selected': ''}>
                      <Link to="/weights" activeClassName="active">
                          <IconBilling size="18" color="#4d4d4d" className="icon-billingr"/>
                          <span className="name">Weights</span>
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

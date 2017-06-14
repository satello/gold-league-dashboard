import React, {Component} from 'react';

import Nav from './containers/nav';
import SiteHead from './containers/header';

import './styles/app.scss';


class App extends Component {
    constructor(props) {
        super(props);
        console.log("setting up");
        this.state = {navMini: false};
    }

    toggleNav = (e) => {
        e.preventDefault();
        this.setState({navMini: !this.state.navMini});
    }
    hideNav = (e) => {
        e.stopPropagation();
        e.preventDefault();
        this.setState({navMini: false})
    }
    render() {
        let navMini = this.state.navMini;
        return (
            <div className="app-wrapper">
                <Nav mini={navMini} toggleNav={this.toggleNav}/>
                <div className={`content-container ${navMini ? 'full' : ''}`}>
                    {/* dropshadow for mobile nav triggering */}
                    <div className="menu-dropshadow" style={{display: (navMini ? 'block': 'none')}} onClick={this.hideNav}></div>
                    <SiteHead toggleNav={this.toggleNav}/>
                    {this.props.children}
                </div>
            </div>
        )
    }
}


export default App;

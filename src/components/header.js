import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"

import { InlineIcon } from "@iconify/react";
import paw from "@iconify/icons-mdi/paw";
import magnify from "@iconify/icons-mdi/magnify";

import PubSub from 'pubsub-js';

class Header extends React.Component {

  constructor( props ) {
    super(props);

    this.state = {
      search: 'search-element'
    }
    
    this.searchInput = React.createRef();
  }

  handleSearchKeyUp = (event) => {
    PubSub.publish('search', this.searchInput.current.value);    
  }

  onSearchIconClicked = (event) => {   
    if( this.state.search.includes('search-element--open') )  {
      this.setState({ search: 'search-element search-element--close' }); 
    } else {
      this.setState({ search: 'search-element search-element--open' });
      this.searchInput.current.focus();      
    }    
  }

  render() {
    
    return (
      <header>
      
        <h1 style={{ margin: 0 }}>
          
          <div className="icon-holder icon-holder--inline icon-holder--rotate icon-holder--rotate-slow">
            <i><InlineIcon icon={paw} className="medium white" /></i>        
          </div>
    
          <Link to="/" >
            {this.props.siteTitle}
          </Link>           
        </h1>
    
        <div className="icon-search icon-holder icon-holder--center"
             onClick={this.onSearchIconClicked}>
          <i><InlineIcon icon={magnify} className="medium white" /></i>        
        </div>         
        
        <div className={ this.state.search }>
          <input ref={this.searchInput} 
                 onKeyUp={this.handleSearchKeyUp}
                 type="text" 
                 name="search" />
        </div>
    
      </header>
    );

  }
}

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header

import React from "react"

import Layout from "../components/layout"
import SEO from "../components/seo"
import Navigation from '../components/navigation'

import marked from 'marked'

class Receipt extends React.Component {

  render() {
    
    const title = this.props.pageContext.title;    
    const markdown = marked( this.props.pageContext.markdown )

    console.log(  )
    return ( 
      <Layout>
        <SEO title={title} />
        <Navigation></Navigation>
        <div className="receipt" dangerouslySetInnerHTML={{__html:markdown}} />
      </Layout>
    );
  }

}

export default Receipt;
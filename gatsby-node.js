/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const fetch = require('node-fetch');
const crypto = require('crypto');
const path = require('path');

exports.createPages = async ({ graphql, actions }) => {

  const { createPage } = actions;

  const result = await graphql(`
  query AllReceiptsQuery {
    allReceiptObject {
      nodes {
        title
        slug
        name
        id
        markdown
      }
    }
  }  
  `)

  result.data.allReceiptObject.nodes.forEach( node  => {
    createPage({
      path: node.slug,
      component: path.resolve(`./src/templates/receipt.js`),
      context: {
        ...node
      },
    })
  })  
}

exports.sourceNodes = async ({ actions }) => {
  
  const { createNode } = actions

  try {
    const response = await fetch("http://192.168.8.200:8080/api/v2/recipes")
    let receipts = await response.json();
    
    receipts = receipts.map(  receipt => {
      const title = receipt.markdown.split('\n')[0];
      
      return {
        slug: `/reseptit/${receipt.name}`,
        title,
        ...receipt
      };
    });

    receipts.forEach( receipt => {
      
      const jsonReceipt = JSON.stringify( receipt );

      createNode({
        id: receipt.name,
        parent: null,
        children: [],
        internal: {
          type: "ReceiptObject",
          contentDigest: crypto.createHash('md5').update(jsonReceipt).digest('hex'),
          description: receipt.title
        },
        ...receipt
      });
    });

  } catch( error ) {
    console.error( error );
  }
  
  return;
}
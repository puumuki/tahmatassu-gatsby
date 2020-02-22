import React from "react";
import { Link } from "gatsby"
import { InlineIcon } from "@iconify/react";
import chevronRight from "@iconify/icons-mdi/chevron-right";

class ReceiptList extends React.Component {

  render() {

    const markdown = this.props.receipts.map( receipt => {
      const link = `/reseptit/${receipt.name}`;

      return (
        <Link  key={receipt.id} to={link}>
          <div  className="receipt-list__receipt">
            {receipt.title} 
            <InlineIcon icon={chevronRight} />
          </div>
        </Link>
      );
    });

    return ( 
      <div className="receipt-list">
        {markdown}
      </div>
    );
  }

}

export default ReceiptList;
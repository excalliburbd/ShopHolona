import React, { Component } from 'react';
import classNames from 'classnames';

class AttributeEditor extends Comment {
  constructor(props) {
    super(props);

    this.state = {
      show: false,
    }
  }

  render(){
    let show = false;

    const attributeClass = classNames('ProductsSidebar-add-attributes--card', {
      'show': show
    })

    return (
      <Card className={ attributeClass }>
        <div className="ProductsSidebar-add-attributes--card-heading">
          <h4>{ primaryAttributes[id].value }</h4>
          <IconButton icon="arrow_drop_down"
                      onClick={
                        show = !show
                      }/>
        </div>
        <ul className="ProductsSidebar-add-attributes--card-content">
          {
            Object.keys(secondaryAttributes).map(
              id => <li>{ secondaryAttributes[id].value }</li>
            )
          }
        </ul>
      </Card>
    )
  }
}

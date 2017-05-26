import React, { Component } from 'react';
import classNames from 'classnames';

import Input from 'react-toolbox/lib/input';
import IconButton from 'react-toolbox/lib/button/IconButton';

import './Searchbar.css';

class Searchbar  extends Component {
  constructor(props) {
    super(props);

    this.state = {
      suggestions: false,
      fromList: false,
    }
  }

  render() {

    const {
      label,
    } = this.props;

    const searchbarClass = classNames('Searchbar _07g5 ', {
      'Searchbar--hide': !this.props.searchbar,
      '_3qQkg' : this.state.suggestions
    })

    return (
      <div className={ searchbarClass }>
        <Input type='text'
              label={ label }
              onChange={
                input => {
                  this.setState({
                    list: this.props.source.search(input),
                    fromList: false,
                  })

                  this.props.handleSetValue(input);
                }
              }
              value={ this.props.value }
              onBlur={ () => {
                if (this.props.selectionOnly && !this.state.fromList) {
                  this.setState({
                    suggestions: false,
                    error: true,
                    value: ''
                  })
                  this.props.handleSetValue('');
                } else {
                  this.setState({
                    suggestions: false,
                  })
                }
              }}
              onFocus={ () => {
                this.setState({ suggestions: true })
              }} >
          <IconButton
            icon='clear'
            onClick={ () => this.props.hideSearchbar() }
            className="NavigationAppBar-searchbar--close" />
        </Input>
        <ul className="Searchbar _3-Nb6">
          {
            [].map(
              (category, key) =>  <li className="_1erPE" key={ key }
                                      onMouseDown={ () => {
                                        this.setState({
                                          value: category.name,
                                          fromList: true,
                                          error: false,
                                        });
                                        this.props.handleSetValue(category.name);
                                        this.props.onSelected(category.id, category);
                                      }}>
                                      { category.name }
                                  </li>
            )
          }
        </ul>
      </div>
    )
  }
}

export default Searchbar;

import React, { Component } from 'react';
import classNames from 'classnames';

import Input from 'react-toolbox/lib/input/Input';
import IconButton from 'react-toolbox/lib/button/IconButton';

import './Searchbar.css';

class Searchbar  extends Component {
  constructor(props) {
    super(props);

    this.state = {
      suggestions: false,
      fromList: false,
      placeholder: true,
      instance: null,
    }

    this.handleSearchbarFocus = this.handleSearchbarFocus.bind(this);
  }

  handleSearchbarFocus() {
    this.searchInput.focus();
  }

  render() {
    const searchbarClass = classNames('Searchbar _07g5 ', {
      'Searchbar--hide': !this.props.searchbar,
      '_3qQkg' : this.state.suggestions
    })

    return (
      <div className={ searchbarClass }>
        <Input  type='text'
                id="Searchbar-input"
                className="Searchbar-input"
                innerRef={ input => {
                  /*{this.props.setWrappedInstance(input.getWrappedInstance());}*/
                  this.searchInput = input;
                }}
                onChange={
                  input => this.props.setSearchString(input)
                }
                value={ this.props.searchString }
                onBlur={ () => {
                  this.setState({
                    suggestions: false,
                    placeholder: true,
                  })
                }}
                onFocus={ () => {
                  this.setState({
                    suggestions: true,
                    placeholder: false,
                  })
                }} >
          { (this.state.placeholder && !this.props.searchString) && <label className="Searchbar-input--label"
                                             onClick={ this.handleSearchbarFocus }>Search Products</label> }
          <div className="Searchbar-input--button">
            <IconButton icon='search'
                        className="Searchbar--search"
                        onClick={ this.handleSearchbarFocus } />
            <IconButton icon='clear'
                        onClick={ () => this.props.hideSearchbar() }
                        className="Searchbar--close" />
          </div>
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

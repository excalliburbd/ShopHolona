import React, { Component } from 'react';
import classNames from 'classnames';

import Input from 'react-toolbox/lib/input';

import './CustomAutocomplete.css';

class CustomAutocomplete  extends Component {
  constructor(props) {
    super(props);

    this.state = {
      suggestions: false,
      list: this.props.source.list,
      error: false,
      errMsg: 'You must select a catagory from the list',
      fromList: false,
    }
  }

  render() {

    const {
      label,
    } = this.props;

    const autoObj = classNames('CustomAutocomplete _07g5 ', {
      '_3qQkg' : this.state.suggestions
    })

    return (
      <div className={ autoObj }>
        <Input type='text'
              required
              label={ label }
              error={ this.state.error && this.state.errMsg }
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
              }} />
        <ul className="CustomAutocomplete _3-Nb6">
          {
            this.state.list.map(
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

export default CustomAutocomplete;

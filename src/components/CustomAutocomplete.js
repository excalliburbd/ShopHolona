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
      value: this.props.value || '',
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
              onChange={
                input => {
                  this.setState({
                    value: input,
                    list: this.props.source.search(input)
                  })
                }
              }
              value={ this.state.value }
              onBlur={ () => {
                this.setState({
                  suggestions: false,
                })
                this.props.handleSetValue(this.state.value)
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
                                        });
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

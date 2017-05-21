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
      error: false,
      errMsg: 'You must select a catagory from the list',
      fromList: false,
    }
  }

  componentWillRecieveProps(nextProps) {
    this.setState({
      value: nextProps.value,
    })
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
                    value: input,
                    list: this.props.source.search(input),
                    fromList: false,
                  })
                }
              }
              value={ this.state.value }
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
                  this.props.handleSetValue(this.state.value);
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

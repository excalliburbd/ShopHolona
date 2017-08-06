import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import Input from 'react-toolbox/lib/input/Input';

import './CustomAutocomplete.css';

class CustomAutocomplete  extends Component {
  constructor(props) {
    super(props);

    this.state = {
      suggestions: false,
      list: props.source.list,
      error: false,
      errMsg: 'You must select a catagory from the list',
      fromList: false,
    }
  }

  render() {

    const {
      label,
      // type,
      source,
      handleSetValue,
      value,
      selectionOnly,
      onSelected,
    } = this.props;

    let {
      keyname
    } = this.props;

    if (!keyname) {
      keyname = 'name'
    }

    const autoObj = classNames('CustomAutocomplete _07g5 ', {
      '_3qQkg' : this.state.suggestions
    });

    return (
      <div className={ autoObj }>
        <Input type='text'
              required
              label={ label }
              error={ this.state.error && this.state.errMsg }
              onChange={
                input => {
                  this.setState({
                    list: source.search(input),
                    fromList: false,
                  })

                  handleSetValue(input);
                }
              }
              value={ value }
              onBlur={ () => {
                if (selectionOnly && !this.state.fromList) {
                  this.setState({
                    suggestions: false,
                    error: true,
                    value: ''
                  })
                  handleSetValue('');
                } else {
                  this.setState({
                    suggestions: false,
                  })
                }
              }}
              onFocus={ () => {
                this.setState({
                  suggestions: true,
                  list: source.list,
                })
              }} />
        <ul className="CustomAutocomplete _3-Nb6">
          {
            this.state.list.map(
              (item, key) =>  <li className="_1erPE" key={ key }
                                      onMouseDown={ () => {
                                        this.setState({
                                          value: item[keyname],
                                          fromList: true,
                                          error: false,
                                        });
                                        handleSetValue(item[keyname]);
                                        onSelected(item.id, item);
                                      }}>
                                      { item[keyname] }
                                  </li>
            )
          }
        </ul>
      </div>
    )
  }
}

CustomAutocomplete.propTypes = {
  source: PropTypes.shape({
    list: PropTypes.arrayOf(
               PropTypes.shape({
              name: PropTypes.oneOfType([
                      PropTypes.string,
                      PropTypes.number,
                    ]),
              id: PropTypes.number,
            })
          ).isRequired,
  }),
}

export default CustomAutocomplete;

/**
 * PasswordInput Component for tingle
 * @author shumi.lg
 *
 * Copyright 2014-2017, Tingle Team.
 * All rights reserved.
 */

import React from 'react';
import classnames from 'classnames';
import Context from '@ali/tingle-context';
import OpenedEyeIcon from '@ali/tingle-icon/lib/Eye';
import ClosedEyeIcon from '@ali/tingle-icon/lib/EyeClose';
import LockIcon from '@ali/tingle-icon/lib/Lock';

const prefixClass = Context.prefixClass;
const iconSize = '20px';

/**
 * 密码输入框
 *
 * @class PasswordInput
 * @extends {React.Component}
 */
class PasswordInput extends React.Component {

  static propTypes = {
    className: React.PropTypes.string,
    placeholder: React.PropTypes.string,
    value: React.PropTypes.string,
    decrypted: React.PropTypes.bool,
    onChange: React.PropTypes.func,
    onDecryptedChange: React.PropTypes.func,
    onFocus: React.PropTypes.func,
    onBlur: React.PropTypes.func,
  };

  static defaultProps = {
    className: '',
    placeholder: '',
    value: '',
    decrypted: true,
    onChange: Context.noop,
    onDecryptedChange: Context.noop,
    onFocus: Context.noop,
    onBlur: Context.noop,
  };

  static displayName = 'PasswordInput';

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidUpdate(prevProps) {
    if (prevProps.decrypted !== this.props.decrypted) {
      if (this.input) {
        this.input.focus();
      }
    }
  }

  handleChange(e) {
    const value = e.target.value;
    this.props.onChange(value, e);
  }

  handleFocus(e) {
    this.props.onFocus(e);
  }

  handleBlur(e) {
    this.props.onBlur(e);
  }

  handleEyeIconClick(e) {
    const nextDecrypted = !this.props.decrypted;
    this.props.onDecryptedChange(nextDecrypted, e);
  }

  renderPlaceHolder() {
    return (
      <div
        className={classnames(prefixClass('omit password-input-placeholder'), {
          [prefixClass('DN')]: this.props.value !== '',
        })}
      >
        {this.props.placeholder}
      </div>
    );
  }

  renderInput() {
    const inputValue = this.props.value;
    const type = this.props.decrypted ? 'password' : 'text';

    return (
      <input
        ref={(c) => { this.input = c; }}
        type={type}
        value={inputValue}
        className={classnames(prefixClass('password-input-text'), {
          [prefixClass('password-input-text-decrypted')]: this.props.decrypted,
        })}
        onChange={(e) => { this.handleChange(e); }}
        onFocus={(e) => { this.handleFocus(e); }}
        onBlur={(e) => { this.handleBlur(e); }}
      />
    );
  }

  renderEyeIcon() {
    const EyeIcon = this.props.decrypted ? ClosedEyeIcon : OpenedEyeIcon;

    return (
      <EyeIcon
        className={classnames(prefixClass('password-input-right-icon'))}
        witdh={iconSize}
        height={iconSize}
        onClick={(e) => { this.handleEyeIconClick(e); }}
      />
    );
  }

  render() {
    return (
      <div
        className={classnames(prefixClass('password-input FBAC FBH'), {
          [this.props.className]: !!this.props.className,
        })}
      >
        <LockIcon
          className={classnames(prefixClass('password-input-left-icon'))}
          witdh={iconSize}
          height={iconSize}
        />
        <div className={classnames(prefixClass('password-input-core'))}>
          {this.renderPlaceHolder()}
          {this.renderInput()}
        </div>
        {this.renderEyeIcon()}
      </div>
    );
  }
}

export default PasswordInput;
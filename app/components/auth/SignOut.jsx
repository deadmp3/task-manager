import React from 'react';
import cn from 'classnames';
import { withRouter } from 'react-router-dom';
import connect from '../../connect';

const mapStateToProps = ({ logoutingState }) =>
  ({ logoutingState });

@connect(mapStateToProps)
@withRouter
export default class SignOut extends React.Component {
  onClick() {
    const { history, logout } = this.props;
    const afterSuccess = () => history.push('/');
    return (event) => {
      event.preventDefault();
      logout(afterSuccess);
    };
  }

  render() {
    const { className, loginingState } = this.props;
    const disabled = loginingState === 'requested';
    return (
      <button className={cn('btn btn-link', className)} onClick={this.onClick()} disabled={disabled}>Sign Out</button>);
  }
}

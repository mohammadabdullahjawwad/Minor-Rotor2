import React from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { ScreenSpinner } from '..';

class RestrictedRoute extends React.Component {
	render() {
		const { component: Component, path, auth, ...rest } = this.props;
		if(auth.inProgress)
		{
			return <ScreenSpinner/>
		}
    // NOTE: STATE IS LOST WHEN THE PAGE IS REFRESHED, TO AVOID THIS WE HAVE SAVED THE TOKEN INFORMATION IN THE LOCALSTORAGE.
    if (!auth.isLoggedIn) {
			return <Route {...rest} path={path} component={Component} />;
		} else {
			return (
				<Redirect
					to={{
						pathname: '/select-appliances',
						state: { from: rest.location },
					}}
				/>
			);
		}
	}
}
const mapStateToProps = ({ ...state }) => {
	return {
		auth: state.auth,
	};
};
export default connect(mapStateToProps)(RestrictedRoute);

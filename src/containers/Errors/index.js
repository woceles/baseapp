import * as React from 'react';
class ErrorWrapper extends React.Component {
    componentDidCatch(error, info) {
        
        console.error(error);
    }
    render() {
        return this.props.children;
    }
}
export { ErrorWrapper, };
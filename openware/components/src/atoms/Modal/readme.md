Modal example:
```js
class ModalContainer extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            show: false,
        };
        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
    }

    showModal() {
        this.setState({
            show: true,
        });
    }

    hideModal() {
        this.setState({
            show: false,
        })
    }
    
    render() {
        return (
            <div>
                <Button label='Show Modal' onClick={this.showModal} />
                <Modal
                    show={this.state.show}
                    header={<div>Title</div>}
                    content={<div>Some content</div>}
                    footer={<Button label='Ok' onClick={this.hideModal} />}
                    />
            </div>
        );
    }
}

<ModalContainer />
```

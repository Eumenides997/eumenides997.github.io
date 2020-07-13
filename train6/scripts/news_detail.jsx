
var ListGroup = ReactBootstrap.ListGroup
var Spinner = ReactBootstrap.Spinner
var Alert = ReactBootstrap.Alert
var Container = ReactBootstrap.Container
var Nav = ReactBootstrap.Nav
var Card = ReactBootstrap.Card
var Row = ReactBootstrap.Row
var Col = ReactBootstrap.Col
var Button = ReactBootstrap.Button

const Repo = (props) => (
    <div dangerouslySetInnerHTML={props.text} >

    </div>
)

class App extends React.Component {
    constructor(props) {
        super(props)
        const newText = [

        ]
        this.state = { newText }
    }
    getNew = async () => {
        const { newText } = this.state
        var id = this.getQueryVariable()
        var url = `https://mjuruankai.com/api/web/article_by_id/?id=${id}`
        const res = await axios.get(url)
        console.log('id:' + id)
        console.log(res.data.list[0].fields)
        var item = res.data.list[0].fields
        this.setState({ newText: item.content.replace(/\/images/g, "https://mjuruankai.com/images/") })
    }
    getQueryVariable = () => {
        var query = window.location.search.substring(1)
        var vars = query.split('=')
        var id = vars[1]
        return id
    }
    componentDidMount() {
        this.getNew()
    }
    render() {
        const { newText } = this.state
        return(
        <div className="text">
                <div className="index">
                    <div dangerouslySetInnerHTML = {{ __html:'<br>'+this.state.newText+'<br>' }}></div>
                </div>
        </div>
        )
    }
}

ReactDOM.render(
    <App>
    </App>,
    document.getElementById('container')
);
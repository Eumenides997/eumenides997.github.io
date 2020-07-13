var ListGroup = ReactBootstrap.ListGroup
var Spinner = ReactBootstrap.Spinner
var Alert = ReactBootstrap.Alert
var Container = ReactBootstrap.Container
var Nav = ReactBootstrap.Nav
var Card = ReactBootstrap.Card
var Row = ReactBootstrap.Row
var Col = ReactBootstrap.Col
var Button = ReactBootstrap.Button

const RepoCard = (props) => (<Card className="card">
    <Card.Body>
        <Card.Text>{props.title}</Card.Text>
        <Card.Img src="img/1.png" data-src={props.img} className="lazyload" />
        <Card.Text>{props.content}</Card.Text>
        <Card.Text>{props.date}</Card.Text>
        <Button className="button bg-dark"onClick={() => readNew(props.id)}>详情</Button>
    </Card.Body>
</Card>)

function readNew(id) {
    console.log(id)
    window.location.href = `./news_detail.html?id=${id}`
}

class App extends React.Component {
    constructor(props) {
        super(props)
        const cards = [

        ]
        this.state = { cards, page: 0, loading: false }
    }
    getNews = async (page = 1) => {
        const { cards, loading } = this.state
        var url = `https://mjuruankai.com/api/web/article_list/?page=${page}`
        const res = await axios.get(url)
        console.log(page)
        console.log(res.data.list)
        this.setState({ loading: true })
        const newCards = res.data.list.map((item, key) => ({
            title: item.fields.title,
            img: 'https://mjuruankai.com' + item.fields.cover_image,
            content: item.fields.content,
            date: item.fields.date_created,
            id: item.pk
        }))
        this.setState((state, props) => {
            return { cards: [...state.cards, ...newCards], page, loading: false }
        })
    }
    loadMore = () => {
        const { page } = this.state
        this.getNews(page + 1)
    }
    componentDidMount() {
        this.loadMore()
    }
    render() {
        const { cards, loading } = this.state
        return (
            <div className="container">
                <Row>
                    {cards.map((item, key) => <Col sm={12} md={6} lg={4} key={key}>
                        <RepoCard title={item.title}
                            img={item.img}
                            date={item.date}
                            id={item.id}
                        />
                    </Col>)}
                </Row>
                <br />
                <Button className="button bg-dark"onClick={this.loadMore} disabled={loading}>{loading && <Spinner animation="border"
                    as="span"
                    animation="grow"
                    size="sm"
                    role="status"
                    aria-hidden="true" />}
                加载更多</Button>
            </div>)
    }
}

ReactDOM.render(
    <App>
    </App>,
    document.getElementById('container')
);
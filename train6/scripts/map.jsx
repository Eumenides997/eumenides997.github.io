
 
class App extends React.Component {
 
    componentDidMount() {
        const { BMap, BMAP_STATUS_SUCCESS } = window
        var map = new BMap.Map("allmap"); // 创建Map实例
        map.centerAndZoom(new BMap.Point(116.404, 39.915), 11); // 初始化地图,设置中心点坐标和地图级别
        var p1 = new BMap.Point(116.301934, 39.977552);
        var p2 = new BMap.Point(116.508328, 39.919141);
        var driving = new BMap.DrivingRoute(map, { renderOptions: { map: map, autoViewport: true } });
        driving.search(p1, p2);
    }
 
    render() {
        return (
            <div id="allmap" className="map"></div>
        );
    }
}

ReactDOM.render(
    <App>
    </App>,
    document.getElementById('container')
);

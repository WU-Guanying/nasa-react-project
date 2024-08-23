export default function Main(props) {
    const {data} = props
    return (
        <div className="imgContainer">
            {console.log(data)}
            <img src={data.hdurl || './public/pic1.png'} alt={data.title || 'Oops, could not find a picture T-T'} className="bgImage"></img>
        </div>
    )
} 
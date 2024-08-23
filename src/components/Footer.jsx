export default function Footer(props) {
    const {handleToggleModal,data,handleRefresh} = props
    return (
        <footer>
            <div className="bgGradient"></div>
            <div>
                <h1>GUANYING APOD</h1>
                <h2>{data?.title}</h2>
            </div>      
            
            <div className="btnSet">
                <button className="btnExpand">
                    <i onClick={handleToggleModal} className="fa-solid fa-circle-info"></i>
                </button>

                <button className="btnRefresh" onClick={handleRefresh}>
                    <i className="fa-solid fa-arrows-rotate"></i>
                </button>
            </div>
            
        </footer>
    )
}
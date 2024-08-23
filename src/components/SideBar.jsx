export default function SideBar(props){
    const {data,handleToggleModal} = props;
    return(
        <div className="sideBar" onClick={handleToggleModal} >
            <div className="bgOverlay"></div>  
            <div className="sideBarContents">
                <h2>{data?.title}</h2>
                <div className="descriptionContainer">
                    <p className="descriptionTitle">{data?.date}</p>
                    <p>{data?.explanation}</p>
                </div>
                <button className="arrowDiv" onClick={handleToggleModal}>
                    <i className="fa-solid fa-right-long"></i>
                </button>
            </div>
        </div>
    )
}
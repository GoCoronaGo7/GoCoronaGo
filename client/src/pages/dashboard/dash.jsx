const { useEffect } = React

// eslint-disable-next-line react/prop-types
export default function Dash ({ sideBar, children }) {
    return <div id="dash">
        { sideBar }
        { children }
    </div>
}

// eslint-disable-next-line react/prop-types
export function SideBar ({ options, active, setActive }) {
    useEffect(() => {
        const buttons = document.querySelectorAll('#sideBarButton')
        buttons.forEach((button, i) => {
            button.addEventListener('click', (e) => {
                console.log(i)
                setActive(i)
            })
        })
    }, [setActive])
    console.log(options)
    return <div className="sideBar">
        <div className="profileHolder">
            <div id="profilePic"> <object data="/static/images/admin.svg" aria-label="admin" /> </div>
            <h2> { FLASK_SESSION.username }</h2>
            <span> Admin </span>
        </div>
        {options.map(([title, icon], i) => <button id="sideBarButton" className={'sideBarButton' + ((i === active) ? ' active' : '')} key={i} ><object aria-label={title} data={icon} type="image/svg+xml" /> {title}</button>)}
    </div>
}

SideBar.propTypes = {
    options: PropTypes.array
}
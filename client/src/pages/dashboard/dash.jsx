const { useEffect } = React

// eslint-disable-next-line react/prop-types
export default function Dash ({ doctors, admin, sideBar, children }) {
    return (
        <div id="dash">
            {sideBar}
            {children}
        </div>
    )
}

Dash.propTypes = {
    sideBar: PropTypes.component
}

export function SideBar ({ admin, options, active, setActive }) {
    useEffect(() => {
        const buttons = document.querySelectorAll('#sideBarButton')
        buttons.forEach((button, i) => {
            button.addEventListener('click', (e) => {
                setActive(i)
            })
        })
    }, [setActive])

    return (
        <>
            <div className="sideBar">
                <div className="profileHolder">
                    {admin
                        ? (
                            <>
                                <div id="profilePic">
                                    {' '}
                                    <object
                                        data="/static/images/admin.svg"
                                        aria-label="admin"
                                    />{' '}
                                </div>
                                <h2> Dr.{FLASK_SESSION.username}</h2>
                                <span> Doctor </span>
                            </>
                        )
                        : (
                            <>
                                <div id="profilePic">
                                    {' '}
                                    <object
                                        data="/static/images/admin.svg"
                                        aria-label="admin"
                                    />{' '}
                                </div>
                                <h2> {FLASK_SESSION.username}</h2>
                                <span> Patient </span>
                            </>
                        )}
                </div>
                {options.map(([title, icon], i) => (
                    <button
                        id="sideBarButton"
                        className={
                            'sideBarButton' + (i === active ? ' active' : '')
                        }
                        key={i}
                    >
                        <object
                            aria-label={title}
                            data={icon}
                            type="image/svg+xml"
                        />{' '}
                        {title}
                    </button>
                ))}
            </div>
        </>
    )
}

SideBar.propTypes = {
    admin: PropTypes.boolean,
    active: PropTypes.number,
    setActive: PropTypes.func,
    options: PropTypes.array
}

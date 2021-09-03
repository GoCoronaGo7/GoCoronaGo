/* eslint-disable react/prop-types */
import Dropdown from './Dropdown.js'

const { useMemo } = React

export default function NavBar ({ children }) {
    const memoizedChilds = useMemo(() => {
        return children.map(child => {
            return child
        })
    }, [children])
    return (<>
        {memoizedChilds}
    </>)
}

NavBar.propTypes = {
    children: PropTypes.array
}
export function ContentGroup ({ opts, title, rootUrl, ...props }) {
    const [options, links] = useMemo(() => {
        if (!opts) return [[], []]
        return opts.filter(Boolean).reduce((acc, val) => [[...acc[0], val[1]], [...acc[1], val[0]]], [[], []])
    }, [opts])
    if (!opts) return <a href={rootUrl} {...props}>{title} </a>

    return <Dropdown baseClassName="NavDropDown" changeOnClick={false} value={title} onChange={({ value }) => {
        window.location = links[options.indexOf(value)]
    }
    }{...{ options }} />
}

ContentGroup.propTypes = {
    title: PropTypes.string,
    rootUrl: PropTypes.string
}

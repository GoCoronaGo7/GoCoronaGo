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

export function ContentGroup ({ children, title, rootUrl, ...props }) {
    const [options, links] = useMemo(() => {
        if (!children?.props?.children) return [[], []]
        return children.props.children.map(li => {
            console.log('li', li)
            const child = li?.props?.children?.find(x => x.props?.children)?.props
            const mapped = [child?.children, child?.href].filter(Boolean)
            if (mapped.length) return mapped
            return false
        }).filter(Boolean).reduce((acc, val) => [[...acc[0], val[0]], [...acc[1], val[1]]], [[], []])
    }, [children])
    if (!children) return <a href={rootUrl} {...props}>{title} </a>

    return <Dropdown baseClassName="NavDropDown" changeOnClick={false} value={title} onChange={({ value }) => {
        window.location = links[options.indexOf(value)]
    }
    }{...{ options }} />
}

ContentGroup.propTypes = {
    title: PropTypes.string,
    rootUrl: PropTypes.string
}

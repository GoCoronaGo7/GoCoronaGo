const { useEffect } = React;

const buttons = ['Cases', 'Testing', 'Beds'];

export default (props) => {
    const children = [];
    for (const el of buttons) {
        children.push(<button key={`${el}`} className={props.active[0] == el ? 'active' : ''}>{el}</button>)
    }
    useEffect(() => {
        const buttons = document.querySelectorAll('#selector > button');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (button.classList.contains('active')) return;
                else props.active[1](button.innerHTML);
            })
        })
    })
    return <div id="selector">
            { children }
        </div>
}
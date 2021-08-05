const { useEffect } = React;

const buttons = ['Cases', 'Testing', 'Beds'];

export default (props) => {
    const active = props.active.value;
    const children = [];
    for (const el of buttons) {
        children.push(<button key={`${el}`} className={ active == el ? 'active' : ''}>{el}</button>)
    }
    useEffect(() => {
        const buttons = document.querySelectorAll('#selector > button');
        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                if (button.classList.contains('active')) return;
                else props.active.set(button.innerHTML);
            });
        });
    });
    return (<div id="selector">
            { children }
        </div>)
}
import useNavigation from "../hooks/use-navigation";

function Route(props) {
    const { currentPath } = useNavigation();
    if (props.path === currentPath) {
        return props.children();
    }
    if (props.path.includes("flashcard/") && currentPath.includes("flashcard/")) {
        const currentId = currentPath
            .match(/flashcard[/].*/)[0]
            .split("/")
            .at(-1);
        return props.children(currentId);
    }
    return null;
}
export default Route;

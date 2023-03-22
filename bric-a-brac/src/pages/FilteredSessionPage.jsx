import Panel from "../components/Panel";
import BoldP from "../components/BoldP";
import useFlashcards from "../hooks/use-flashcards";
import Button from "../components/Button";
import SessionPage from "./SessionPage";
import { useReducer } from "react";

const NEW_BUTTON_SELECTED = "NEW_BUTTON_SELECTED";
const EASY_BUTTON_SELECTED = "EASY_BUTTON_SELECTED";
const MODERATE_BUTTON_SELECTED = "MODERATE_BUTTON_SELECTED";
const RATHER_HARD_BUTTON_SELECTED = "RATHER_HARD_BUTTON_SELECTED";
const HARD_BUTTON_SELECTED = "HARD_BUTTON_SELECTED";
const BEGIN_BUTTON_SELECTED = "BEGIN_BUTTON_SELECTED";

const reducer = (state, action) => {
    if (action.type === NEW_BUTTON_SELECTED) {
        return {
            ...state,
            newButtonSelected: !state.newButtonSelected,
        };
    }
    if (action.type === EASY_BUTTON_SELECTED) {
        return {
            ...state,
            easy: !state.easy,
        };
    }
    if (action.type === MODERATE_BUTTON_SELECTED) {
        return {
            ...state,
            moderate: !state.moderate,
        };
    }
    if (action.type === RATHER_HARD_BUTTON_SELECTED) {
        return {
            ...state,
            ratherHard: !state.ratherHard,
        };
    }
    if (action.type === HARD_BUTTON_SELECTED) {
        return {
            ...state,
            hard: !state.hard,
        };
    }
    if (action.type === BEGIN_BUTTON_SELECTED) {
        return {
            ...state,
            areOptionsReady: !state.areOptionsReady,
        };
    }
    return state;
};

function FilteredSessionPage() {
    const { STATUSES, getDeckStatus, fetchFlashcards, flashcardsArray } = useFlashcards();
    const [state, dispatch] = useReducer(reducer, {
        areOptionsReady: false,
        easy: false,
        moderate: false,
        ratherHard: false,
        hard: false,
    });

    if (flashcardsArray.length === 0) {
        fetchFlashcards();
        return <BoldP className='text-zinc-200 text-center'>loading...</BoldP>;
    }

    const handleBegin = () => {
        const deckStatus = getDeckStatus();
        console.log(deckStatus);
        console.log(state);
        let nonEmptyCategoryCount = 0;
        for (const [key, value] of Object.entries(deckStatus)) {
            if (state[key]) {
                nonEmptyCategoryCount += value;
            }
        }
        if (
            !(
                state.easy ||
                state.moderate ||
                state.ratherHard ||
                state.hard ||
                state.newButtonSelected
            ) ||
            nonEmptyCategoryCount === 0
        ) {
            alert("please select at least one non-empty status to train");
        } else {
            dispatch({ type: BEGIN_BUTTON_SELECTED });
        }
    };

    return (
        <div>
            {!state.areOptionsReady && (
                <div>
                    <Panel className='flex align-center justify-evenly mt-24 items-center flex-wrap'>
                        <div className='pt-2'>
                            <BoldP>select statuses to train:</BoldP>
                        </div>
                        <div className='flex align-center justify-evenly gap-4 pt-3 items-center flex-wrap'>
                            <Button
                                selected={state.newButtonSelected}
                                onClick={() => dispatch({ type: NEW_BUTTON_SELECTED })}
                            >
                                {STATUSES.new.displayName}
                            </Button>
                            <Button
                                selected={state.easy}
                                onClick={() => dispatch({ type: EASY_BUTTON_SELECTED })}
                                className='bg-violet-300 p-5 rounded-lg'
                            >
                                {STATUSES.easy.displayName}
                            </Button>
                            <Button
                                selected={state.moderate}
                                onClick={() => dispatch({ type: MODERATE_BUTTON_SELECTED })}
                                className='bg-violet-300 p-5 rounded-lg'
                            >
                                {STATUSES.moderate.displayName}
                            </Button>
                            <Button
                                selected={state.ratherHard}
                                onClick={() => dispatch({ type: RATHER_HARD_BUTTON_SELECTED })}
                                className='bg-violet-300 p-5 rounded-lg'
                            >
                                {STATUSES.ratherHard.displayName}
                            </Button>
                            <Button
                                selected={state.hard}
                                onClick={() => dispatch({ type: HARD_BUTTON_SELECTED })}
                                className='bg-violet-300 p-5 rounded-lg'
                            >
                                {STATUSES.hard.displayName}
                            </Button>
                        </div>
                    </Panel>

                    <div
                        onClick={handleBegin}
                        className='text-center text-yellow-600 p-6 cursor-pointer'
                    >
                        <BoldP>begin</BoldP>
                    </div>
                </div>
            )}

            {state.areOptionsReady && <SessionPage selectedStatuses={state} />}
        </div>
    );
}
export default FilteredSessionPage;

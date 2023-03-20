import { useReducer } from "react";
import useFlashcardsContext from "../hooks/use-flashcards-context";

const FIRST_STAGE = "FIRST_STAGE";
const NEXT_STAGE = "NEXT_STAGE";
const PREVIOUS_STAGE = "PREVIOUS_STAGE";
const SUBMIT = "SUBMIT";
const RADIO_INPUT_CHANGE = "RADIO_INPUT_CHANGE";
const CODE_INPUT_CHANGE = "CODE_INPUT_CHANGE";
const DESCRIPTION_INPUT_CHANGE = "DESCRIPTION_INPUT_CHANGE";

const LABEL_CHOOSE_CAT = "choose category";
const LABEL_DESCRIPTION = "add description";
const LABEL_ADD_CODE = "add code";
const LABEL_REVIEW = "review";

const CATEGORIES = ["python", "sql", "js"];

const reducer = (state, action) => {
    if (action.type === FIRST_STAGE) {
        return {
            ...state,
            creationStage: 0,
        };
    }
    if (action.type === NEXT_STAGE) {
        return {
            ...state,
            creationStage: state.creationStage + 1,
        };
    }
    if (action.type === PREVIOUS_STAGE) {
        return {
            ...state,
            creationStage: state.creationStage - 1,
        };
    }
    if (action.type === SUBMIT) {
        return {
            ...state,
            creationStage: undefined,
        };
    }
    if (action.type === RADIO_INPUT_CHANGE) {
        return {
            ...state,
            radioInputField: action.payload,
        };
    }
    if (action.type === CODE_INPUT_CHANGE) {
        return {
            ...state,
            codeInputField: action.payload,
        };
    }
    if (action.type === DESCRIPTION_INPUT_CHANGE) {
        return {
            ...state,
            descriptionInputField: action.payload,
        };
    }
    return state;
};

function CreateCard() {
    const [state, dispatch] = useReducer(reducer, {
        creationStage: undefined,
        radioInputField: undefined,
        descriptionInputField: "",
        codeInputField: "",
    });

    const { addFlashcard } = useFlashcardsContext();

    const stageTemplateMapping = {
        0: {
            label: LABEL_CHOOSE_CAT,
            buttonNext: true,
            buttonPrevious: false,
        },
        1: {
            label: LABEL_DESCRIPTION,
            buttonNext: true,
            buttonPrevious: true,
        },
        2: {
            label: LABEL_ADD_CODE,
            buttonNext: true,
            buttonPrevious: true,
        },
        3: {
            label: LABEL_REVIEW,
            buttonNext: false,
            buttonPrevious: true,
            submit: true,
        },
    };
    const handleNext = (event) => {
        event.preventDefault();
        if (state.creationStage === undefined) {
            dispatch({
                type: FIRST_STAGE,
            });
        } else {
            dispatch({
                type: NEXT_STAGE,
            });
        }
    };
    const handlePrevious = (event) => {
        event.preventDefault();
        dispatch({
            type: PREVIOUS_STAGE,
        });
    };
    const handleRadioInput = (event) => {
        dispatch({
            type: RADIO_INPUT_CHANGE,
            payload: event.target.value,
        });
    };
    const handleCodeInput = (event) => {
        dispatch({
            type: CODE_INPUT_CHANGE,
            payload: event.target.value,
        });
    };
    const handleDescriptionInput = (event) => {
        dispatch({
            type: DESCRIPTION_INPUT_CHANGE,
            payload: event.target.value,
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (
            ![state.radioInputField, state.descriptionInputField, state.codeInputField].every(
                (x) => x
            )
        ) {
            alert("please come back and fill all fields");
        } else {
            const flashcard = {
                category: state.radioInputField,
                description: state.descriptionInputField,
                code: state.codeInputField,
            };
            addFlashcard(flashcard);
            dispatch({
                type: SUBMIT,
            });
        }
    };

    return (
        <div className='w-96 h-24 border'>
            <form className='grid grid-cols-1 w-full h-full' onSubmit={handleSubmit}>
                <label className='flex justify-center'>
                    {stageTemplateMapping[state.creationStage]?.label}
                </label>
                <div className='w-full h-full'>
                    {state.creationStage !== undefined ? null : (
                        <button type='button' className='w-full h-full' onClick={handleNext}>
                            add bric-a-brac
                        </button>
                    )}
                    {stageTemplateMapping[state.creationStage]?.label === LABEL_CHOOSE_CAT && (
                        <div className='flex justify-center'>
                            {...CATEGORIES.map((cat) => (
                                <div>
                                    <input
                                        onChange={handleRadioInput}
                                        type='radio'
                                        name='category'
                                        value={cat}
                                    />
                                    <label htmlFor={cat}>{cat}</label>
                                </div>
                            ))}
                        </div>
                    )}
                    {stageTemplateMapping[state.creationStage]?.label === LABEL_DESCRIPTION && (
                        <input
                            className='border'
                            value={state.descriptionInputField}
                            type='text'
                            onChange={handleDescriptionInput}
                        />
                    )}
                    {stageTemplateMapping[state.creationStage]?.label === LABEL_ADD_CODE && (
                        <input
                            className='border'
                            value={state.codeInputField}
                            type='text'
                            onChange={handleCodeInput}
                        />
                    )}
                    {stageTemplateMapping[state.creationStage]?.label === LABEL_REVIEW && (
                        <div>
                            {console.log(state)}
                            <p>{`category: ${state.radioInputField}`}</p>
                            <p>{state.descriptionInputField}</p>
                            <pre>
                                <code>{state.codeInputField}</code>
                            </pre>
                        </div>
                    )}
                </div>
                <div className='flex justify-evenly'>
                    {stageTemplateMapping[state.creationStage]?.buttonPrevious && (
                        <button type='button' onClick={handlePrevious}>
                            go back
                        </button>
                    )}
                    {stageTemplateMapping[state.creationStage]?.buttonNext && (
                        <button type='button' onClick={handleNext}>
                            next
                        </button>
                    )}
                    {stageTemplateMapping[state.creationStage]?.submit && (
                        <button type='submit'>submit</button>
                    )}
                </div>
            </form>
        </div>
    );
}
export default CreateCard;

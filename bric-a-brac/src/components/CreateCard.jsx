import { useReducer } from "react";

const FIRST_STAGE = "FIRST_STAGE";
const NEXT_STAGE = "NEXT_STAGE";
const PREVIOUS_STAGE = "PREVIOUS_STAGE";
const SUBMIT = "SUBMIT";
const CODE_INPUT_CHANGE = "CODE_INPUT_CHANGE";
const DESCRIPTION_INPUT_CHANGE = "DESCRIPTION_INPUT_CHANGE";

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
        };
    }
    if (action.type === CODE_INPUT_CHANGE) {
        console.log(action.payload);
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
        descriptionInputField: "",
        codeInputField: "",
    });

    const stageTemplateMapping = {
        0: {
            label: "choose category",
            buttonNext: true,
            buttonPrevious: false,
        },
        1: {
            label: "add description",
            buttonNext: true,
            buttonPrevious: true,
        },
        2: {
            label: "add code",
            buttonNext: true,
            buttonPrevious: true,
        },
        3: {
            label: "review",
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
    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch({
            type: SUBMIT,
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

    return (
        <div className='w-96 h-24 border'>
            {console.log(state)}
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
                    {stageTemplateMapping[state.creationStage]?.label === "add description" && (
                        <input
                            className='border'
                            name='description'
                            value={state.descriptionInputField}
                            type='text'
                            onChange={handleDescriptionInput}
                        />
                    )}
                    {stageTemplateMapping[state.creationStage]?.label === "add code" && (
                        <input
                            className='border'
                            name='code'
                            value={state.codeInputField}
                            type='text'
                            onChange={handleCodeInput}
                        />
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

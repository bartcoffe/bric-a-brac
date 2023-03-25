import { v4 as uuidv4 } from "uuid";
import { useReducer } from "react";
import { CgHashtag } from "react-icons/cg";
import { MdOutlineDone, MdAdd } from "react-icons/md";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";

import useFlashcards from "../hooks/use-flashcards";
import CodeSnippet from "./CodeSnippet";
import TextArea from "./TextArea";
import BoldP from "./BoldP";
import Button from "./Button";

const ACTIONS = {
    FIRST_STAGE: "FIRST_STAGE",
    NEXT_STAGE: "NEXT_STAGE",
    PREVIOUS_STAGE: "PREVIOUS_STAGE",
    SUBMIT: "SUBMIT",
    CATEGORY_INPUT_CHANGE: "CATEGORY_INPUT_CHANGE",
    CODE_INPUT_CHANGE: "CODE_INPUT_CHANGE",
    DESCRIPTION_INPUT_CHANGE: "DESCRIPTION_INPUT_CHANGE",
    HASHTAG_INPUT_CHANGE: "HASHTAG_INPUT_CHANGE",
};

const LABELS = {
    CHOOSE_CAT: "choose category",
    ADD_DESCRIPTION: "add short description",
    ADD_CODE: "add code",
    ADD_HASHTAG: "add hashtag to summarize what it is about",
    REVIEW: "review",
};

const reducer = (state, action) => {
    if (action.type === ACTIONS.FIRST_STAGE) {
        return {
            ...state,
            creationStage: 0,
        };
    }
    if (action.type === ACTIONS.NEXT_STAGE) {
        return {
            ...state,
            creationStage: state.creationStage + 1,
        };
    }
    if (action.type === ACTIONS.PREVIOUS_STAGE) {
        return {
            ...state,
            creationStage: state.creationStage === 0 ? undefined : state.creationStage - 1,
        };
    }
    if (action.type === ACTIONS.SUBMIT) {
        return {
            ...state,
            creationStage: undefined,
            categoryInputField: undefined,
            descriptionInputField: "",
            codeInputField: "",
            hashtagInputField: "",
        };
    }
    if (action.type === ACTIONS.CATEGORY_INPUT_CHANGE) {
        return {
            ...state,
            categoryInputField: action.payload,
            creationStage: state.creationStage + 1,
        };
    }
    if (action.type === ACTIONS.CODE_INPUT_CHANGE) {
        return {
            ...state,
            codeInputField: action.payload,
        };
    }
    if (action.type === ACTIONS.DESCRIPTION_INPUT_CHANGE) {
        return {
            ...state,
            descriptionInputField: action.payload,
        };
    }
    if (action.type === ACTIONS.HASHTAG_INPUT_CHANGE) {
        return {
            ...state,
            hashtagInputField: action.payload,
        };
    }
    return state;
};

function CreateCard() {
    const [state, dispatch] = useReducer(reducer, {
        creationStage: undefined,
        categoryInputField: undefined,
        descriptionInputField: "",
        codeInputField: "",
        hashtagInputField: "",
        learningStatus: "new",
    });

    const { addFlashcard, LANGUAGE_CATEGORIES } = useFlashcards();

    const stageTemplateMapping = {
        0: {
            label: LABELS.CHOOSE_CAT,
            buttonNext: true,
            buttonPrevious: true,
        },
        1: {
            label: LABELS.ADD_DESCRIPTION,
            buttonNext: true,
            buttonPrevious: true,
        },
        2: {
            label: LABELS.ADD_CODE,
            buttonNext: true,
            buttonPrevious: true,
        },
        3: {
            label: LABELS.ADD_HASHTAG,
            buttonNext: true,
            buttonPrevious: true,
        },
        4: {
            label: LABELS.REVIEW,
            buttonNext: false,
            buttonPrevious: true,
            submit: true,
        },
    };
    const handleNext = (event) => {
        event.preventDefault();
        if (state.creationStage === undefined) {
            dispatch({
                type: ACTIONS.FIRST_STAGE,
            });
        } else {
            dispatch({
                type: ACTIONS.NEXT_STAGE,
            });
        }
    };
    const handlePrevious = (event) => {
        event.preventDefault();
        dispatch({
            type: ACTIONS.PREVIOUS_STAGE,
        });
    };
    const handleCategoryInput = (category) => {
        dispatch({
            type: ACTIONS.CATEGORY_INPUT_CHANGE,
            payload: category,
        });
    };
    const handleCodeInput = (event) => {
        dispatch({
            type: ACTIONS.CODE_INPUT_CHANGE,
            payload: event.target.value,
        });
    };
    const handleDescriptionInput = (event) => {
        dispatch({
            type: ACTIONS.DESCRIPTION_INPUT_CHANGE,
            payload: event.target.value,
        });
    };
    const handleHashtagInput = (event) => {
        dispatch({
            type: ACTIONS.HASHTAG_INPUT_CHANGE,
            payload: event.target.value,
        });
    };
    const handleSubmit = (event) => {
        event.preventDefault();
        if (
            ![
                state.categoryInputField,
                state.descriptionInputField,
                state.codeInputField,
                state.hashtagInputField,
            ].every((x) => x)
        ) {
            alert("please come back and fill all fields");
        } else {
            const flashcard = {
                user_id: "sample_user",
                id: uuidv4(),
                category: state.categoryInputField,
                description: state.descriptionInputField,
                code: state.codeInputField,
                hashtag: state.hashtagInputField,
                status: state.learningStatus,
            };
            addFlashcard(flashcard);
            dispatch({
                type: ACTIONS.SUBMIT,
            });
        }
    };

    return (
        <form className='grid gap-2' onSubmit={handleSubmit}>
            <label className='text-center'>
                <BoldP>{stageTemplateMapping[state.creationStage]?.label}</BoldP>
            </label>
            <div>
                {state.creationStage !== undefined ? null : (
                    <div
                        className='flex items-center gap-2 text-zinc-800 cursor-pointer'
                        onClick={handleNext}
                    >
                        <MdAdd className='duration-500 hover:scale-110 text-xl text-green-700' />
                        <BoldP>
                            add new <em> bric-à-brac</em>
                        </BoldP>
                    </div>
                )}
                {stageTemplateMapping[state.creationStage]?.label === LABELS.CHOOSE_CAT && (
                    <div className='flex justify-center gap-6 py-5'>
                        {...LANGUAGE_CATEGORIES.map((cat) => (
                            <Button
                                className='cursor-pointer'
                                onClick={() => handleCategoryInput(cat.name)}
                            >
                                {cat.icon}
                            </Button>
                        ))}
                    </div>
                )}
                {stageTemplateMapping[state.creationStage]?.label === LABELS.ADD_CODE && (
                    <TextArea
                        value={state.codeInputField}
                        onChange={handleCodeInput}
                        maxLength='2000'
                        autoFocus
                    />
                )}
                {stageTemplateMapping[state.creationStage]?.label === LABELS.ADD_DESCRIPTION && (
                    <TextArea
                        value={state.descriptionInputField}
                        onChange={handleDescriptionInput}
                        maxLength='2000'
                        autoFocus
                    />
                )}

                {stageTemplateMapping[state.creationStage]?.label === LABELS.ADD_HASHTAG && (
                    <div className='py-4 text-center'>
                        <input
                            className='p-2 rounded-lg bg-neutral-300 text-neutral-800 caret-neutral-800 shadow-lg focus:outline-none'
                            value={state.hashtagInputField}
                            type='text'
                            onChange={handleHashtagInput}
                            maxLength='20'
                            autoFocus
                        />
                    </div>
                )}
                {stageTemplateMapping[state.creationStage]?.label === LABELS.REVIEW && (
                    <div className='m-4'>
                        <div className='flex items-center gap-4 pb-4'>
                            {
                                LANGUAGE_CATEGORIES.find(
                                    (x) => x.name === state.categoryInputField
                                )?.icon
                            }
                            <div className='flex items-center gap-2'>
                                <CgHashtag />
                                <BoldP>{state.hashtagInputField}</BoldP>
                            </div>
                        </div>
                        <TextArea readOnly value={state.descriptionInputField} />
                        <CodeSnippet>{state.codeInputField}</CodeSnippet>
                    </div>
                )}
            </div>
            <div className='flex justify-evenly gap-8'>
                {stageTemplateMapping[state.creationStage]?.buttonPrevious && (
                    <Button type='button' onClick={handlePrevious}>
                        <BsArrowLeft />
                    </Button>
                )}
                {stageTemplateMapping[state.creationStage]?.buttonPrevious && (
                    <div className='flex gap-2'>
                        {Object.keys(LABELS).map((_, index) => {
                            let style =
                                "self-center rounded-lg w-3 h-3 border border-neutral-800 opacity-70 ";
                            if (index === state.creationStage) {
                                style += "bg-neutral-800";
                            }
                            return <div key={index} className={style}></div>;
                        })}
                    </div>
                )}
                {stageTemplateMapping[state.creationStage]?.buttonNext && (
                    <Button type='button' onClick={handleNext}>
                        <BsArrowRight />
                    </Button>
                )}
                {stageTemplateMapping[state.creationStage]?.submit && (
                    <Button type='submit'>
                        <MdOutlineDone />
                    </Button>
                )}
            </div>
        </form>
    );
}
export default CreateCard;

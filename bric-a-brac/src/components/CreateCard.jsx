import { useReducer } from "react";
import { TiArrowLeftOutline, TiArrowRightOutline } from "react-icons/ti";
import { CgHashtag } from "react-icons/cg";
import { MdDoneOutline, MdAdd } from "react-icons/md";

import useFlashcards from "../hooks/use-flashcards";
import CodeSnippet from "./CodeSnippet";
import TextArea from "./TextArea";
import BoldP from "./BoldP";

const FIRST_STAGE = "FIRST_STAGE";
const NEXT_STAGE = "NEXT_STAGE";
const PREVIOUS_STAGE = "PREVIOUS_STAGE";
const SUBMIT = "SUBMIT";
const CATEGORY_INPUT_CHANGE = "CATEGORY_INPUT_CHANGE";
const CODE_INPUT_CHANGE = "CODE_INPUT_CHANGE";
const DESCRIPTION_INPUT_CHANGE = "DESCRIPTION_INPUT_CHANGE";
const HASHTAG_INPUT_CHANGE = "HASHTAG_INPUT_CHANGE";

const LABELS = {
    CHOOSE_CAT: "choose category",
    ADD_DESCRIPTION: "add short description",
    ADD_CODE: "add code",
    ADD_HASHTAG: "add hashtag to summarize what it is about",
    REVIEW: "review",
};

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
            creationStage: state.creationStage === 0 ? undefined : state.creationStage - 1,
        };
    }
    if (action.type === SUBMIT) {
        return {
            ...state,
            creationStage: undefined,
            categoryInputField: undefined,
            descriptionInputField: "",
            codeInputField: "",
            hashtagInputField: "",
        };
    }
    if (action.type === CATEGORY_INPUT_CHANGE) {
        return {
            ...state,
            categoryInputField: action.payload,
            creationStage: state.creationStage + 1,
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
    if (action.type === HASHTAG_INPUT_CHANGE) {
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

    const { addFlashcard, languageCategories } = useFlashcards();

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
    const handleCategoryInput = (category) => {
        dispatch({
            type: CATEGORY_INPUT_CHANGE,
            payload: category,
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
    const handleHashtagInput = (event) => {
        dispatch({
            type: HASHTAG_INPUT_CHANGE,
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
                category: state.categoryInputField,
                description: state.descriptionInputField,
                code: state.codeInputField,
                hashtag: state.hashtagInputField,
                status: state.learningStatus,
            };
            addFlashcard(flashcard);
            dispatch({
                type: SUBMIT,
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
                        <MdAdd size={30} />
                        <BoldP>
                            add new <em> bric-à-brac</em>
                        </BoldP>
                    </div>
                )}
                {stageTemplateMapping[state.creationStage]?.label === LABELS.CHOOSE_CAT && (
                    <div className='flex justify-center gap-6 py-5'>
                        {...languageCategories.map((cat) => (
                            <div
                                className='cursor-pointer'
                                onClick={() => handleCategoryInput(cat.name)}
                            >
                                {cat.icon}
                            </div>
                        ))}
                    </div>
                )}
                {stageTemplateMapping[state.creationStage]?.label === LABELS.ADD_CODE && (
                    <textarea
                        className='w-full rounded-lg p-2 bg-zinc-800 text-zinc-200'
                        value={state.codeInputField}
                        onChange={handleCodeInput}
                        autoFocus
                    />
                )}
                {stageTemplateMapping[state.creationStage]?.label === LABELS.ADD_DESCRIPTION && (
                    <textarea
                        className='w-full rounded-lg p-2 bg-zinc-800 text-zinc-200'
                        value={state.descriptionInputField}
                        onChange={handleDescriptionInput}
                        autoFocus
                    />
                )}

                {stageTemplateMapping[state.creationStage]?.label === LABELS.ADD_HASHTAG && (
                    <div className='py-4 text-center'>
                        <input
                            className='p-2 rounded-lg bg-zinc-800 text-zinc-200 caret-zinc-200'
                            value={state.hashtagInputField}
                            type='text'
                            onChange={handleHashtagInput}
                            autoFocus
                        />
                    </div>
                )}
                {stageTemplateMapping[state.creationStage]?.label === LABELS.REVIEW && (
                    <div className='m-4'>
                        <div className='flex items-center gap-4 pb-4'>
                            {
                                languageCategories.find((x) => x.name === state.categoryInputField)
                                    ?.icon
                            }
                            <div className='flex items-center gap-2'>
                                <CgHashtag size={30} />
                                <BoldP>{state.hashtagInputField}</BoldP>
                            </div>
                        </div>
                        <TextArea>{state.descriptionInputField}</TextArea>
                        <CodeSnippet>{state.codeInputField}</CodeSnippet>
                    </div>
                )}
            </div>
            <div className='flex justify-evenly gap-8'>
                {stageTemplateMapping[state.creationStage]?.buttonPrevious && (
                    <button type='button' onClick={handlePrevious}>
                        <TiArrowLeftOutline size={25} />
                    </button>
                )}
                {stageTemplateMapping[state.creationStage]?.buttonPrevious && (
                    <div className='flex gap-2'>
                        {Object.keys(LABELS).map((_, index) => {
                            let style =
                                "self-center rounded-full w-3 h-3 border-2 border-zinc-800 ";
                            if (index === state.creationStage) {
                                style += "bg-zinc-800";
                            }
                            return <div key={index} className={style}></div>;
                        })}
                    </div>
                )}
                {stageTemplateMapping[state.creationStage]?.buttonNext && (
                    <button type='button' onClick={handleNext}>
                        <TiArrowRightOutline size={25} />
                    </button>
                )}
                {stageTemplateMapping[state.creationStage]?.submit && (
                    <button type='submit'>
                        <MdDoneOutline size={25} />
                    </button>
                )}
            </div>
        </form>
    );
}
export default CreateCard;

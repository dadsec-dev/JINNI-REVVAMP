import React, { useState, useEffect } from "react";
// import { v4 as uuid } from 'uuid';
// import { OpenAI } from 'langchain.llms';
// import { PromptTemplate } from 'langchain.prompts';
// import { LLMChain, SequentialChain } from 'langchain.chains';
import { OpenAI } from "langchain/llms/openai";
import Typewriter from "typewriter-effect";
import {
  ChatPromptTemplate,
  HumanMessagePromptTemplate,
  PromptTemplate,
  SystemMessagePromptTemplate,
} from "langchain/prompts";
import {
  SequentialChain,
  LLMChain,
  SimpleSequentialChain,
} from "langchain/chains";

const StoryBookGPT = () => {
  const [storyConcept, setStoryConcept] = useState("");
  const [exposition, setExposition] = useState("");
  const [currentStoryState, setCurrentStoryState] = useState("");
  const [userChoice, setUserChoice] = useState("");
  const [storyDecisions, setStoryDecisions] = useState([]);
  const [isLoadingStory, setIsLoadingStory] = useState(false);
  const [isLoadingChoice, setIsLoadingChoice] = useState(false);

  const llm = new OpenAI({
    openAIApiKey: "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",
    temperature: 0.6,
  });

  //an LLMChain to write sn exposition given a story based on a concept
  const introTemplate = new PromptTemplate({
    inputVariables: ["story_concept"],
    template: `Write a short and mysterious exposition to a story based on this concept: {story_concept}. Ensure description is in second-person.`,
  });

  const middleTemplate = new PromptTemplate({
    inputVariables: ["prev_state", "user_choice"],
    template: `Based on what happened in {prev_state}, and the user's decision of {user_choice}. write a second-person description of what happens next in the story. Do not attempt to end the story.`,
    validateTemplate: false,
  });

  const formatDecisionTemplate = new PromptTemplate({
    inputVariables: ["current_state"],
    template: `Based on {current_state}, create a list of three choices for what the user can do next`,
  });

  const introChain = new LLMChain({
    llm: llm,
    prompt: introTemplate,
    outputKey: "exposition",
  });

  const middleChain = new LLMChain({
    llm: llm,
    prompt: middleTemplate,
    verbose: true,
    outputKey: "current_state",
  });

  const formatDecisionChain = new LLMChain({
    llm: llm,
    prompt: formatDecisionTemplate,
    verbose: true,
    outputKey: "decisions",
  });

  const overallChain = new SequentialChain({
    chains: [middleChain, formatDecisionChain],
    inputVariables: ["prev_state", "user_choice"],
    outputVariables: ["current_state", "decisions"],
    verbose: true,
  });

  // useEffect(() => {
  //   if (storyConcept) {
  //     const generateExposition = async () => {
  //       const response = await introChain.run({ story_concept: storyConcept });
  //       console.log(response);
  //       setExposition(response.exposition);
  //     };

  //     generateExposition();
  //   }
  // }, [storyConcept]);

  const handleStory = async () => {
    setIsLoadingStory(true);
    const response = await introChain.run({ story_concept: storyConcept });
    console.log(response);
    setExposition(response);
    // setCurrentStoryState(response);
    setIsLoadingStory(false)
  };

  // const handleUserChoice = async () => {
  //   const response = await overallChain.run([
  //     { prev_state: currentStoryState },
  //     { user_choice: userChoice },
  //   ]);

  //   const decisions = response.decisions.split('|');
  //   setStoryDecisions(decisions);
  //   setCurrentStoryState(response.current_state);
  // };

  const handleUserChoice = async () => {
    setIsLoadingChoice(true);
    const response = await overallChain.call({
      prev_state: currentStoryState,
      user_choice: userChoice,
    });

    const decii = response.decisions
      .split("\n")
      .map((decision) => decision.trim());
    console.log("decisions are: " + decii);
    console.log("current state is " + response.current_state);
    setStoryDecisions(decii);
    setCurrentStoryState(response.current_state);
    setIsLoadingChoice(false);

    // const decisions = response.decisions.split('|');
    // console.log(decisions);
    // setStoryDecisions(decisions);
    // setCurrentStoryState(response.current_state);
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="flex flex-col items-center space-y-4">
        <h1 className="text-4xl pb-11">🌈🏰🌟 SlltoryBook GPT</h1>
        <input
          type="text"
          value={storyConcept}
          onChange={(e) => setStoryConcept(e.target.value)}
          placeholder="Plug your story idea in here"
          className="px-4 py-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        />
        <hr />
        <br />

        <button className="px-4 py-2 bg-green-500 text-white rounded hover:bg-cyan-600" onClick={handleStory}>{isLoadingStory ? "Loading Story Exposition" : "Generate Story"}</button>
        <br />

        <div className="flex flex-col items-center justify-center">
        {exposition && (
          <div>
            <div className="bg-[#fff] py-5 px-8 items-center justify-center rounded-md text-[#000000]">
              <h1>{exposition}</h1>
            </div>
            
            <hr />
            <hr />
            <br />

            <input
              text="text"
              value={userChoice}
              onChange={(e) => setUserChoice(e.target.value)}
              placeholder="what will be your next move ?"
              className="text-[#000000] items-center"
            />
            <br />

            <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-green-600" onClick={handleUserChoice}>{isLoadingChoice ? "Continuing Story" : "Submit"}</button>
          </div>
        )}
        </div>



        {storyDecisions.length > 0 && (
          <div>
            <h3>Select your next move:</h3>
            {storyDecisions.map((decision, index) => (
              <button className="flex flex-col px-4 py-2 mx-4 my-5 bg-green-500 text-white rounded hover:bg-green-900"
                key={index}
                onClick={() => {
                  setUserChoice(decision);
                  handleUserChoice();
                }}
              >
                {decision}
              </button>
            ))}
          </div>
        )}

        <h3>Current Story State:</h3>
        <div className="bg-[#fff] py-5 px-8 items-center justify-center rounded-md text-[#000000]">
        {currentStoryState && <div className="w-3/4 mx-auto">
          
          <Typewriter
            options={{
              strings: [`${currentStoryState}`],
              autoStart: true,
              loop: false,
              delay: 30,
              stop: true,
              deleteChars: 0,
            }}
          />
          

          </div>}
        </div>
        
      </div>
    </div>
  );
};

export default StoryBookGPT;

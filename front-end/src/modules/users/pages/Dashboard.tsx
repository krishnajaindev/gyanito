import { QuizCard } from "./QuizzCard";
import { BookOpenCheck, Rocket, BrainCircuit, Dna } from "lucide-react";

export default function Dashboard() {
    return (
        <div>
            <div className="w-[100%] h-[600px] flex justify-center overflow-auto">
                <div className="w-[80%] h-[600px] inline">
                    <div className="h-[200px] w-[100%] mt-[20px] flex bg-purple-900/40 border-purple-600/50 backdrop-blur-sm rounded-[10px]">
                        <div className="h-[100%] w-[100%] flex justify-center items-center rounded-[10px]">
                            <div>
                            <div className=" w-[100%] flex justify-center rounded-[10px] text-purple-300 text-3xl">Welcome</div>
                            <div className=" w-[100%] flex justify-center rounded-[10px] text-purple-300 text-3xl">Test your knowledge, challenge yourself, and improve with every quiz you play.</div>
                            </div>
                        </div>
                    </div>
                    <div className=" w-[100%] mt-[20px] flex bg-purple-900/40 border-purple-600/50 backdrop-blur-sm rounded-[10px]">
                        <div className="h-[100%] w-[100%] flex justify-center  rounded-[10px] text text-purple-300 text-3xl">
                            <div>
                                <div className="w-[100%] flex justify-center py-[20px]">
                                    
                                <div>Quizzes</div>
                                </div>
                                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">

                                    <QuizCard
                                        name="General Knowledge"
                                        timeLimit="15 Mins"
                                        Icon={BookOpenCheck}
                                    />

                                    <QuizCard
                                        name="Science & Tech"
                                        timeLimit="20 Mins"
                                        Icon={Rocket}
                                    />

                                    <QuizCard
                                        name="Logic Puzzles"
                                        timeLimit="25 Mins"
                                        Icon={BrainCircuit}
                                    />

                                    <QuizCard
                                        name="Biology Basics"
                                        timeLimit="15 Mins"
                                        Icon={Dna}
                                    />
                                    <QuizCard
                                        name="Biology Basics"
                                        timeLimit="15 Mins"
                                        Icon={Dna}
                                    />
                                    <QuizCard
                                        name="Biology Basics"
                                        timeLimit="15 Mins"
                                        Icon={Dna}
                                    />
                                    <QuizCard
                                        name="Biology Basics"
                                        timeLimit="15 Mins"
                                        Icon={Dna}
                                    />


                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
}

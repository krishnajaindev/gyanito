function About(){
    return(
        <div>
            <div className="w-[100%] h-[600px] flex justify-center">
                <div className="h-[300px] w-[80%] bg-[blue] mt-[20px] flex">
                    <div className="h-[100%] w-[50%] bg-[pink] flex justify-center ">
                        <div>Badges</div>
                        <div className="mx-[20px] w-40 h-40 rounded-full bg-blue-500 my-[30px] "></div>
                    </div>
                    <div className="h-[100%] w-[50%] bg-[green] flex justify-end items-center">
                        <div className="mx-[20px] text-3xl">
                            Name Surname
                        </div>
                        <div className="mx-[20px] w-50 h-50 rounded-full bg-blue-500 my-[30px]"></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default About;
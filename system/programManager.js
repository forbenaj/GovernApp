class ProgramManager {
    constructor() {
        this.programClasses = {}
        this.programInstances = {}
        this.windowsDisplaying = []
    }

    addProgram(program) {
        this.programs.push(program)
    }

    removeProgram(program) {
        this.programs.splice(this.programs.indexOf(program), 1)
    }

    runProgram(program) {
        program.run()
        this.runningPrograms.push(program)
    }

    stopProgram(program) {
        program.close()
        //this.runningPrograms.splice(this.runningPrograms.indexOf(program), 1)
        this.windowsDisplaying.splice(this.windowsDisplaying.indexOf(program), 1)
        delete this.programInstances[program.processId]
        console.log("Program stopped.")
    }

    getRunningProgramsByName(name) {
        let programs = []
        for (let processId in this.programInstances) {
            let program = this.programInstances[processId]
            if (program.name === name) {
                programs.push(program)
            }
        }
        return programs
    }
}
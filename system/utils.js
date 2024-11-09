function getRunningProgramsByName(name) {
    let programs = []
    for (let processId in programManager.programInstances) {
        let program = programManager.programInstances[processId]
        if (program.name === name) {
            programs.push(program)
        }
    }
    return programs
}
var model = {
    studentList:[],
    numOfAttendanceDays: 7,
    selectedStudent: null
};

var octopus = {
    createStudent: function(name, numAttenDays){
        let student = new Object({
            name: name,
            attendance:[],
            numAttended: 0
        });
        for (let i = 0; i < numAttenDays; i++) {
            student.attendance.push(false);
        }
        return student;
    },
    addStudent: function(name){
        const numAttenDays = octopus.getNumOfAttendDays();
        const student = octopus.createStudent(name, numAttenDays);
        model.studentList.push(student);
    },
    getNumOfAttendDays: function(){
        return model.numOfAttendanceDays;
    },
    setNumOfAttendDays: function(noOfDays) {
        model.numOfAttendanceDays = noOfDays;
    },
    getSelectedStudent: function(){
        return model.selectedStudent;
    },
    setSelectedStudent: function(theStudent) {
        model.selectedStudent = theStudent;
    },
    getStudentList: function(){
        return model.studentList;
    },
    updateSelectedStudentAttendance: function(thisStudentAttendance) {
        model.selectedStudent.attendance = thisStudentAttendance;
    },
    updateSelectedName: function(thisStudentName) {
        model.selectedStudent.name = thisStudentName;
    }
}
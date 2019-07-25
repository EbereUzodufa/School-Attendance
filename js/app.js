var model = {
    studentList:[],
    numOfAttendanceDays: 7,
    selectedStudent: null,
    uniqueName: new Set()
};

var octopus = {
    createStudent: function(name, numAttenDays){
        let student = new Object({
            name: name,
            attendance:[]
            //numAttended: 0 - I can get this data from countin the number of false/true
        });
        //Since the attendance is an array of bool, we make it zero by populating the field with zero
        for (let i = 0; i < numAttenDays; i++) {
            student.attendance.push(false);
        }
        return student;
    },
    addStudent: function(name){
        const numAttenDays = octopus.getNumOfAttendDays(); //Get the number of attendance from the model
        const student = octopus.createStudent(name, numAttenDays);// ^ and use it as a varible for this function with name
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
        //Since the selected object is set to a student in the studentList array, I can update it here and it will also take effects on the studentList array.
        model.selectedStudent.attendance = thisStudentAttendance;
    },
    updateSelectedName: function(thisStudentName) {
        //Since the selected object is set to a student in the studentList array, I can update it here and it will also take effects on the studentList array.
        model.selectedStudent.name = thisStudentName;
    },
    deleteSelectedStudent: function(thisStudentIndex){
        model.studentList.splice(thisStudentIndex, 1);
    }
}
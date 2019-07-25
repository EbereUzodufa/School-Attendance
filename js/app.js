var model = {
    studentList:[],
    numOfAttendanceDays: 7,
    selectedStudent: null,
    uniqueName: new Set()
};

var octopus = {
    init: function(){
        view.init();
    },
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
    },
    deleteSelectedStudents: function(thisStudents){
        //The plan is to make sure we use the for loop just once - This improve optimzation
        
        //#region my Test
        //Not testing with forEach coz I jsut want to work with ES5 here

        // const testPerformance1 = function(thisStudents){
        //     const t0 = performance.now();
        //     let j = 0;
        //     hhu = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

        //     console.log('Parent array inital', hhu);
        //     console.log('take away from array', thisStudents);

        //     for (let i = 0; i < hhu.length; i++) {
        //         const element = hhu[i];
        //         let deleteElem = thisStudents[j];

        //         if (deleteElem == element) {
        //             hhu.splice(i, 1);
        //             j++;
        //             i--;
        //         }            
        //     }

        //     const t1 = performance.now();
        //     console.log('Total time on testPerformance1 - ' + (t1 - t0));
        //     console.log('Parent array final', hhu);

        //     // answer with Google Chrome => Total time on testPerformance2 - 3.484999993816018ms
        // }

        // const testPerformance2 = function(thisStudents){
        //     const t0 = performance.now();
        //     hhu = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];

        //     console.log('Parent array inital', hhu);
        //     console.log('take away from array', thisStudents);

        //     for (let j = 0; j < thisStudents.length; j++){
        //         const deleteElem = thisStudents[j];

        //         for (let i = 0; i < hhu.length; i++) {
        //             const element = hhu[i];

        //             if (deleteElem == element) {
        //                 hhu.splice(i, 1);
        //             }    
        //         }        
        //     }

        //     const t1 = performance.now();
        //     console.log('Total time on testPerformance2 - ' + (t1 - t0));
        //     console.log('Parent array final', hhu);

        //     // answer with Google Chrome => Total time on testPerformance2 - 2.759999828413129ms
        // }
        //#endregion

        for (let j = 0; j < thisStudents.length; j++){
            const deleteElem = thisStudents[j].name;

            for (let i = 0; i < model.studentList.length; i++) {
                const element = model.studentList[i].name;

                if (deleteElem == element) {
                    model.studentList.splice(i, 1);
                }    
            }        
        }
    }
}

//One view can handle what is my head currently - I hope
var view = {
    init: function(){
        const numOfAttendDays = octopus.getNumOfAttendDays(); //Get Number of Attendance Days
        console.log('No of Attendee', numOfAttendDays);
        //check Number of Attendance Days. If zero don't do anything for now
        if (numOfAttendDays != 0) {
            $('table thead').append('<tr></tr>');
            const tableH = $('table thead tr'); //Get table head area
            // console.log(tableH);
            tableH.append('<th>S/N</th>');
            tableH.append('<th>Student Name</th>');
            for (let i = 0; i < numOfAttendDays; i++) {
                const day = "Day " + (i + 1).toString();
                tableH.append('<th class="day-col">' + day + '</th>');                
            }
            tableH.append('<th class="missed-col">Days Missed-col</th>');
        }
    }
}

octopus.init();
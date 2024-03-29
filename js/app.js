var model = {
    studentList:[
        {
            name: "Eze",
            attendance:[false,false,false,false,false,false,false,false,false]
        },
        {
            name: "KC",
            attendance:[true,false,true,true,false,false,false,false,false]
        },
        {
            name: "Uzo",
            attendance:[false,true,false,true,false,false,false,false,false]
        },
        {
            name: "Ugo",
            attendance:[false,false,true,false,true,false,false,false,false]
        },
        {
            name: "Jude",
            attendance:[false,true,false,false,true,false,false,false,false]
        }
    ],
    numOfAttendanceDays: 9,
    selectedStudent: null,
    uniqueName: new Set()
};

var octopus = {
    init: function(){
        view.render();
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
    },
    totalMissedAttendance: function(){
        let totalAttendance = 0; //Total class attendance
        var list = model.studentList;
        for(let i = 0; i < list.length; i++){
            const stud = list[i].attendance;
            for(let j = 0; j < stud.length; j++){
                if(stud[j] == false){
                    totalAttendance++
                }
            }
        }
        return totalAttendance;
    }
}

//One view can handle what is my head currently - I hope
var view = {
    render: function(){
        const numOfAttendDays = octopus.getNumOfAttendDays(); //Get Number of Attendance Days
        const studentList = octopus.getStudentList();//Let's get our students
        // console.log('No of Attendee', numOfAttendDays);

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

            // console.log('studentList', studentList.length);

            //Then we check our list and update accordingly
            if (studentList.length != 0) {
                const tableB = $('table tbody'); //Get table body area

                //Loop thru each student data
                for (let i = 0; i < studentList.length; i++) {
                    const student = studentList[i];
                    //Create row for table
                    const tr = document.createElement('tr');
                    tr.classList.add('student');

                    //create td for s/n checkbox
                    const tdsn = document.createElement('td');
                    tdsn.classList.add('sn-col');

                    //create s/n checkbox
                    const snChb = document.createElement('input');
                    snChb.type = "checkbox";

                    //Function  enables us set checkbox change for each serial number checkbox
                    $(snChb).change(function(){
                        //Get the parent of this snChb
                        const tr = ((this.parentElement).parentElement);
                        if(this.checked){
                            //I can't trust toggle - need to make sure
                            $(tr).addClass('hightlight');
                            //I don't want to set the border on the DOM. Class add/remove gives a better UI
                            // $(tr).css({
                            //     "border": "2px solid yellow"
                            // });
                            // console.log (tr);
                            // console.log ("I'm checked");
                        } else {
                            $(tr).removeClass('hightlight');
                            // $(tr).css({
                            //     "border": "2px solid transparent"
                            // });
                            // console.log (tr);
                            // console.log ("I'm not checked");
                        }
                    });

                    //Append s/n checkbox to td row
                    tdsn.append(snChb);
                    //Append td checkbox to tr row
                    tr.append(tdsn); 

                    //For Student names
                    const studentName = student.name;
                    $(tr).append('<td class="name-col">'+ studentName + '</td>');

                    let studentAttendanceCount = 0;//Total number of this student's attendance

                    const studentAttendance = student.attendance;
                    for (let j = 0; j < studentAttendance.length; j++) {
                        const elementVal = studentAttendance[j]; //This is a bool value

                        const chb = document.createElement('input');
                        chb.type = "checkbox";

                        chb.addEventListener('change', (function(thisStudent){
                            return function(){
                                //set selected student
                                octopus.setSelectedStudent(thisStudent);
                                let attendanceArray = []; //Get the checked  values
                                //First get all elements that has class attend-col in this row
                                const par = chb.parentElement.parentElement.querySelectorAll(".attend-col");
                                // console.log(thisStudent);

                                //For each of them get there checked value
                                for(var i=0; i < par.length; i++){
                                    const checkStatus = par[i].children[0].checked;
                                    attendanceArray.push(checkStatus); //Add status to array and then render;
                                    // console.log(checkStatus);
                                }
                                // console.log("attendanceArray", attendanceArray);
                                octopus.updateSelectedStudentAttendance(attendanceArray);
                                $('table thead').html('');
                                $('table tbody').html('');
                                // console.log("totalMissedAttendance",octopus.totalMissedAttendance());
                                view.render();
                            }
                        })(student));

                        // //Add event Listener to checkbox
                        // $(chb).change((function(thisStudent){
                        //     // octopus.setSelectedStudent(thisStudent);
                        //     // console.log('I changed');
                        //     console.log(thisStudent);
                        //     // view.render();
                        // })(student));
                                                
                        // console.log("elementVal",elementVal);
                        $(chb).prop( "checked", elementVal);
                        // console.log('chb', chb);

                        const tdChb = document.createElement('td');
                        tdChb.classList.add('attend-col');
                        tdChb.append(chb);
                        tr.append(tdChb);
                        // $(tr).append('<td class="attend-col">'+ chb + '</td>');
                        if(elementVal == true){
                            studentAttendanceCount++;
                            // console.log(j, studentAttendanceCount);
                        }
                    }
                    const missedAttendance = numOfAttendDays - studentAttendanceCount;
                    // console.log('missed', missedAttendance);
                    $(tr).append('<td class="missed-col">'+ missedAttendance + '</td>');

                    tableB.append(tr);

                    const totalMissedAttendance = octopus.totalMissedAttendance();
                    $('span#totalMissedAttendance').html(totalMissedAttendance);
                }
            }
        }
    }
}

octopus.init();
var studentData=[],selectedRow=null;

function searchTable(){
    var input;
    input = document.getElementById("search");
    var  filter = input.value.toUpperCase();
    var rows = document.getElementsByTagName("tr");
    for ( var i = 1; i < rows.length; i++ ) {
        var studentRecord1 = rows[i].getElementsByTagName("td")[0];
        var studentRecord2 = rows[i].getElementsByTagName("td")[1];
        var studentRecord3 = rows[i].getElementsByTagName("td")[2];
        var studentRecord4 = rows[i].getElementsByTagName("td")[3];
        if((studentRecord1.textContent.toUpperCase().indexOf(filter) > -1)||
        (studentRecord2.textContent.toUpperCase().indexOf(filter) > -1) ||
        (studentRecord3.textContent.toUpperCase().indexOf(filter) > -1)||
        (studentRecord4.textContent.toUpperCase().indexOf(filter) > -1)){
            rows[i].style.display = "";
        }
        else
        {
            rows[i].style.display = "none";
        }
      }
    
}

function onFormSubmit(){
 
    if(validate()){
        var formData=getFormData();
        
    
    if(selectedRow==null){
    studentData.push(formData);
}
    else
    {
     updateRecord(formData);
    }
     resetForm();
    }

}

function getFormData(){
var formData={};
formData["studentId"]=document.getElementById("studentId").value ;

formData["studentName"]=document.getElementById("studentName").value ;
formData["studentStream"]=document.getElementById("studentStream").value ;
formData["studentMarks"]=document.getElementById("studentMarks").value ;

return formData;


}

function resetForm() {
    document.getElementById("studentId").value = "";
    document.getElementById("studentName").value = "";
    document.getElementById("studentStream").value = "";
    document.getElementById("studentMarks").value = "";
    selectedRow = null;
}


function onEdit(td) {
    
    selectedRow = td.parentElement.parentElement;
    document.getElementById("studentId").value = selectedRow.cells[0].innerHTML;
    document.getElementById("studentName").value = selectedRow.cells[1].innerHTML;
    document.getElementById("studentStream").value = selectedRow.cells[2].innerHTML;
    document.getElementById("studentMarks").value = selectedRow.cells[3].innerHTML;
}

function updateRecord(formData) {
    studentData[selectedRow.rowIndex -1].studentId= formData["studentId"];
    studentData[selectedRow.rowIndex - 1].studentName= formData["studentName"];
    studentData[selectedRow.rowIndex - 1].studentStream = formData["studentStream"];
    studentData[selectedRow.rowIndex - 1].studentMarks=formData["studentMarks"];
}

function onDelete(td) {
    if (confirm('Are you sure to delete this record ?')) {
        row = td.parentElement.parentElement;
    
        document.getElementById("studentTable").deleteRow(row.rowIndex);
        resetForm();
    }
}


function validate() {
    isValid = true;
    if (document.getElementById("studentName").value == "" || document.getElementById("studentId").value==""||document.getElementById("studentStream").value==""||document.getElementById("studentMarks").value==null) {
        isValid = false;
   
    } else {
        isValid = true;
       
    }
    return isValid;
}

function buildTable(){
var html = "";
for (var i = 0; i < studentData.length; i++) {
    html+="<tr>";
    html+="<td>"+studentData[i].studentId+"</td>";
    html+="<td>"+studentData[i].studentName+"</td>";
    html+="<td>"+studentData[i].studentStream+"</td>";
    html+="<td>"+studentData[i].studentMarks+"</td>";
    html+="<td>"+"<a  class=\"align-icons\" onClick=\"onEdit(this)\"><i class=\"bi bi-pencil-fill\" ></i></a>"+"<a onClick=\"onDelete(this)\" class=\"align-icons\"><i class=\"bi bi-trash-fill\" style=\"color:red;font-size:20px;margin-right:50px;\"></i></i></a>"+"</td>";
    html+="</tr>";

}
document.getElementById("tableBody").innerHTML=html;
}


var count=0;
function removePager(){
    if(count>=3)
document.getElementById("myPagination").remove();
}
function pagingFun(){
    count++;
    $("#studentTable").paginate({
        rows: 2,         
        jqueryui: true,    
        showIfLess:false  
    });
}







   